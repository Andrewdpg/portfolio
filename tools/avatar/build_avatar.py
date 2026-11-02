"""Build Andrés's stylized desk avatar headlessly and export it as GLB.

    blender -b -P tools/avatar/build_avatar.py -- --out public/models/avatar.glb --renders tools/avatar/out

Blender is Z-up with the figure facing -Y; the glTF exporter turns that into Y-up facing +Z,
which is what DeskScene expects. Origin = where the avatar <group> sits in the scene (desk top level).
"""
import argparse
import math
import random
import sys

import bpy
from mathutils import Vector

# ---------------------------------------------------------------- config
# palette sampled by eye from src/assets/img/me.jpeg
SKIN = "#e2b59a"
HAIR = "#3d2718"  # dark chestnut
BROW = "#2f1e13"
BEARD = "#4a3020"
FADE = "#7a5a46"  # short faded sides: hair over skin
LIP = "#c98b80"
HOODIE = "#1d1a22"
CORD = "#9B76D3"
FRAME = "#1e1b21"  # thin dark metal
EYE = "#1a110b"

SEED = 7  # curl layout; change to reshuffle the hair
META_RES = 0.035  # metaball polygonization; lower = denser mesh


def args():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    p = argparse.ArgumentParser()
    p.add_argument("--out", required=True)
    p.add_argument("--renders", default=None)
    return p.parse_args(argv)


def srgb_to_linear(h):
    h = h.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i : i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return (*out, 1.0)


def material(name, hex_color, roughness, metallic=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = srgb_to_linear(hex_color)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return m


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


# ---------------------------------------------------------------- metaball helpers
def metaball(name, elements, mat, resolution=META_RES, threshold=0.6):
    """elements: list of (type, co, radius, size_xyz or None, rotation_euler or None)."""
    mb = bpy.data.metaballs.new(name)
    mb.resolution = resolution
    mb.render_resolution = resolution
    mb.threshold = threshold
    obj = bpy.data.objects.new(name, mb)
    bpy.context.collection.objects.link(obj)
    for el in elements:
        kind, co, radius, size, rot = el[:5]
        e = mb.elements.new(type=kind)
        e.use_negative = len(el) > 5 and el[5]
        e.co = co
        e.radius = radius
        if size:
            e.size_x, e.size_y, e.size_z = size
        if rot:
            from mathutils import Euler

            e.rotation = Euler(rot).to_quaternion()
    obj.data.materials.append(mat)
    return to_mesh(obj)


def to_mesh(obj):
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    mesh_obj = bpy.context.view_layer.objects.active
    bpy.ops.object.shade_smooth()
    return mesh_obj


def capsule(a, b, r):
    """Metaball capsule between two points (blender coords)."""
    a, b = Vector(a), Vector(b)
    mid = (a + b) / 2
    d = b - a
    length = d.length
    # metaball CAPSULE extends along local X by size_x
    rot = d.to_track_quat("X", "Z").to_euler()
    return ("CAPSULE", mid, r, (length / 2, 0, 0), tuple(rot))


def decimate(obj, ratio):
    mod = obj.modifiers.new("dec", "DECIMATE")
    mod.ratio = ratio
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)


def rounded_box(name, size, loc, mat, bevel=0.02, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    m = o.modifiers.new("bevel", "BEVEL")
    m.width = bevel
    m.segments = 3
    bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def cylinder(name, a, b, r, mat, verts=12):
    a, b = Vector(a), Vector(b)
    d = b - a
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=d.length, location=(a + b) / 2)
    o = bpy.context.active_object
    o.name = name
    o.rotation_euler = d.to_track_quat("Z", "Y").to_euler()
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def sphere(name, loc, r, mat, scale=(1, 1, 1), seg=16):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=seg // 2, radius=r, location=loc)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def join(objs, name):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.active_object
    o.name = name
    return o


def parent(child, par):
    m = child.matrix_world.copy()
    child.parent = par
    child.matrix_world = m


# ---------------------------------------------------------------- build
def bounds(obj):
    vs = [obj.matrix_world @ v.co for v in obj.data.vertices]
    lo = Vector((min(v.x for v in vs), min(v.y for v in vs), min(v.z for v in vs)))
    hi = Vector((max(v.x for v in vs), max(v.y for v in vs), max(v.z for v in vs)))
    return lo, hi


# Metaball surfaces sit well inside their radius at threshold 0.6; scale params so sizes below read as real sizes.
K = 1.45


def build():
    mats = {
        "skin": material("Skin", SKIN, 0.6),
        "hair": material("Hair", HAIR, 0.92),
        "hoodie": material("Hoodie", HOODIE, 0.95),
        "cord": material("Cord", CORD, 0.6),
        "frame": material("Frame", FRAME, 0.35, 0.6),
        "lens": material("Lens", "#dfe6ee", 0.05),
        "eye": material("Eye", EYE, 0.3),
        "brow": material("Brow", BROW, 0.9),
        "beard": material("Beard", BEARD, 0.95),
        "lip": material("Lip", LIP, 0.55),
        "fade": material("Fade", FADE, 0.95),
    }
    lens = mats["lens"].node_tree.nodes["Principled BSDF"]
    lens.inputs["Alpha"].default_value = 0.12

    # ---- body: one soft hoodie volume so torso, shoulders, hood and arms melt together
    sh = 0.48
    elbow = (0.66, -0.12, 0.42)
    hand = (0.4, -0.72, 0.17)
    body_elems = [
        ("ELLIPSOID", (0, 0.02, 0.66), 0.5 * K, (0.92, 0.62, 1.0), None),  # torso
        ("ELLIPSOID", (0, 0.02, 1.08), 0.36 * K, (1.45, 0.82, 0.62), None),  # shoulder line
        ("ELLIPSOID", (0, 0.2, 1.3), 0.22 * K, (1.3, 0.85, 0.75), None),  # hood bunched behind the neck
        ("ELLIPSOID", (0, -0.03, 1.27), 0.17 * K, (1.35, 1.1, 0.5), None),  # collar
    ]
    for s in (-1, 1):
        e = (elbow[0] * s, elbow[1], elbow[2])
        h = (hand[0] * s, hand[1], hand[2])
        body_elems.append(capsule((sh * s, 0.0, 1.06), e, 0.15 * K))
        body_elems.append(capsule(e, h, 0.13 * K))
    body = metaball("BodyMeta", body_elems, mats["hoodie"])
    decimate(body, 0.45)
    body.name = "Hoodie"

    hands = [sphere(f"Hand{s}", (hand[0] * s, hand[1] - 0.1, hand[2] - 0.02), 0.115, mats["skin"], (1.0, 1.25, 0.72)) for s in (-1, 1)]
    neck = cylinder("Neck", (0, 0, 1.22), (0, 0, 1.56), 0.16, mats["skin"], 16)
    # drawstrings rest on the real hoodie surface (front-most y in a thin slab at each height)
    def front_y(x, z):
        ys = [v.co.y for v in body.data.vertices if abs(v.co.x - x) < 0.06 and abs(v.co.z - z) < 0.06]
        return min(ys) if ys else -0.35

    cords = []
    for s in (-1, 1):
        top = (0.1 * s, front_y(0.1 * s, 1.16) - 0.01, 1.16)
        end = (0.12 * s, front_y(0.12 * s, 0.82) - 0.012, 0.82)
        cords.append(cylinder(f"Cord{s}", top, end, 0.016, mats["cord"], 8))
        cords.append(sphere(f"Aglet{s}", (end[0], end[1] - 0.004, end[2] - 0.02), 0.028, mats["cord"], seg=8))

    body_root = bpy.data.objects.new("Body", None)
    bpy.context.collection.objects.link(body_root)
    for o in [body, neck, *hands, *cords]:
        parent(o, body_root)

    # ---- head: pivot at the top of the neck so the scene can rotate it
    pivot = Vector((0, 0, 1.46))
    head_root = bpy.data.objects.new("Head", None)
    bpy.context.collection.objects.link(head_root)
    head_root.location = pivot

    hc = pivot + Vector((0, -0.02, 0.42))
    skull = metaball(
        "HeadMeta",
        [
            ("ELLIPSOID", hc, 0.55 * K, (0.86, 0.9, 1.04), None),
            ("ELLIPSOID", hc + Vector((0, -0.08, -0.27)), 0.33 * K, (0.86, 0.78, 0.72), None),  # jaw / chin
            ("ELLIPSOID", hc + Vector((0, -0.36, -0.06)), 0.07 * K, (0.7, 1.0, 1.25), None),  # nose bridge → tip
        ],
        mats["skin"],
        resolution=0.026,
    )
    decimate(skull, 0.55)
    skull.name = "Skull"
    lo, hi = bounds(skull)
    half_w = (hi.x - lo.x) / 2
    print(f"HEAD width={hi.x - lo.x:.2f} height={hi.z - lo.z:.2f} top={hi.z:.2f} face_y={lo.y:.2f}")

    def front(x, z, obj=skull, slab=0.04):
        ys = [(obj.matrix_world @ v.co).y for v in obj.data.vertices if abs(v.co.x - x) < slab and abs(v.co.z - z) < slab]
        return min(ys) if ys else lo.y

    eye_z = hc.z + 0.04
    mouth_z = hc.z - 0.25
    face = []
    for s in (-1, 1):
        ey = front(0.15 * s, eye_z)
        face.append(sphere(f"Ear{s}", (s * (half_w + 0.005), hc.y + 0.03, eye_z - 0.06), 0.075, mats["skin"], (0.55, 1, 1.3), seg=12))
        face.append(sphere(f"Eye{s}", (0.15 * s, ey + 0.012, eye_z), 0.029, mats["eye"], (1.1, 0.5, 0.95), seg=12))
        by = front(0.15 * s, eye_z + 0.12)
        face.append(cylinder(f"Brow{s}", (0.07 * s, by - 0.004, eye_z + 0.115), (0.24 * s, by + 0.02, eye_z + 0.125), 0.024, mats["brow"], 8))
    my = front(0, mouth_z)
    face.append(sphere("Lip", (0, my + 0.008, mouth_z - 0.02), 0.05, mats["lip"], (1.25, 0.45, 0.42), seg=12))

    # mustache + chin beard: shells that sit just outside the skin
    beard = metaball(
        "BeardMeta",
        [
            ("ELLIPSOID", (0, front(0, mouth_z + 0.05) + 0.004, mouth_z + 0.045), 0.06 * K, (1.9, 0.55, 0.42), None),
            ("ELLIPSOID", (0, front(0, mouth_z - 0.13) + 0.012, mouth_z - 0.14), 0.07 * K, (1.2, 0.6, 0.9), None),
        ],
        mats["beard"],
        resolution=0.02,
    )
    decimate(beard, 0.5)

    # glasses: thin rectangular metal frames with a heavier brow bar, clear lenses
    glasses = []
    gy = front(0.15, eye_z) - 0.05
    for s in (-1, 1):
        cx = 0.158 * s
        outer = rounded_box(f"Frame{s}", (0.28, 0.022, 0.15), (cx, gy, eye_z), mats["frame"], 0.02)
        hole = rounded_box(f"Hole{s}", (0.25, 0.2, 0.12), (cx, gy, eye_z), mats["frame"], 0.018)
        mod = outer.modifiers.new("cut", "BOOLEAN")
        mod.operation = "DIFFERENCE"
        mod.object = hole
        bpy.context.view_layer.objects.active = outer
        bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(hole)
        glasses.append(outer)
        glasses.append(rounded_box(f"BrowBar{s}", (0.285, 0.028, 0.03), (cx, gy, eye_z + 0.065), mats["frame"], 0.01))
        glasses.append(rounded_box(f"Lens{s}", (0.25, 0.006, 0.12), (cx, gy, eye_z), mats["lens"], 0.004))
        glasses.append(rounded_box(f"Temple{s}", (0.016, half_w + 0.06, 0.018), (s * (half_w - 0.005), gy + (half_w + 0.06) / 2, eye_z + 0.05), mats["frame"], 0.006))
    glasses.append(rounded_box("Bridge", (0.05, 0.016, 0.016), (0, gy, eye_z + 0.04), mats["frame"], 0.006))

    # ---- hair: ONE continuous volume. A cap hugging the skull, carved at the hairline by negative
    # elements, with long swept locks on top; a band-noise displace adds the waves. No gaps by construction.
    rng = random.Random(SEED)
    hair_elems = [
        ("ELLIPSOID", hc + Vector((0, 0.03, 0.06)), 0.565 * K, (0.88, 0.93, 1.0), None),  # cap (short sides)
        ("ELLIPSOID", hc + Vector((0, -0.5, -0.1)), 0.46 * K, (1.0, 0.62, 0.78), None, True),  # face / forehead carve
        ("ELLIPSOID", hc + Vector((0, 0.06, -0.55)), 0.5 * K, (1.5, 1.5, 0.62), None, True),  # below the ears
        ("ELLIPSOID", hc + Vector((0, -0.18, -0.3)), 0.34 * K, (1.45, 0.8, 0.55), None, True),  # sideburn line
    ]
    # swept locks spread evenly over the whole crown (rings × spokes with jitter), following the skull dome.
    # Each lies tangent to the scalp, combed forward and out toward its own side, so volume is even, not a ridge.
    crown = r_dome = (hi.z - hc.z) * 0.98
    for ring, (phi_deg, count) in enumerate(((0, 1), (22, 7), (42, 11), (60, 13))):
        for k in range(count):
            theta = 2 * math.pi * k / count + rng.uniform(-0.2, 0.2) + ring * 0.37
            phi = math.radians(phi_deg + rng.uniform(-5, 5))
            d = Vector((math.cos(theta) * math.sin(phi), math.sin(theta) * math.sin(phi), math.cos(phi)))
            if -d.y > 0.55 and phi_deg >= 60:
                continue  # leave the forehead to the fringe
            pos = hc + Vector((d.x * half_w * 1.02, d.y * r_dome, d.z * crown)) + Vector((0, 0.03, 0.05))
            # comb direction: forward (-Y) blended with outward on the sides, projected onto the scalp tangent
            comb = Vector((d.x * 0.9, -1.0, 0)).normalized()
            comb = (comb - d * comb.dot(d)).normalized()
            rot = comb.to_track_quat("X", "Z").to_euler()
            size = rng.uniform(0.13, 0.16) * K
            hair_elems.append(("ELLIPSOID", pos, size, (1.0, 0.55, 0.42), tuple(rot)))
    # fringe falling onto the forehead
    for x, drop in ((-0.16, 0.05), (0.02, 0.09), (0.18, 0.04)):
        hair_elems.append(("ELLIPSOID", Vector((x, front(x, hc.z + 0.22) + 0.05, hc.z + 0.24 - drop / 2)), 0.1 * K, (0.6, 0.55, 1.0), (0.3, 0, 0)))
    hair = metaball("HairMeta", hair_elems, mats["hair"], resolution=0.02, threshold=0.6)

    tex = bpy.data.textures.new("Waves", "WOOD")
    tex.wood_type = "BANDNOISE"
    tex.noise_basis_2 = "SIN"
    tex.turbulence = 9
    tex.noise_scale = 0.12
    disp = hair.modifiers.new("waves", "DISPLACE")
    disp.texture = tex
    disp.strength = 0.03
    disp.mid_level = 0.5
    smooth = hair.modifiers.new("soft", "SMOOTH")
    smooth.factor = 0.6
    smooth.iterations = 3
    bpy.context.view_layer.objects.active = hair
    for m in list(hair.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)
    decimate(hair, 0.35)
    hair.name = "Hair"

    # faded sides + nape: a skin-tight shell just outside the skull, carved at the face and the neck
    fade = metaball(
        "FadeMeta",
        [
            ("ELLIPSOID", hc, 0.58 * K, (0.86, 0.9, 1.04), None),
            ("ELLIPSOID", hc + Vector((0, -0.5, -0.12)), 0.48 * K, (1.0, 0.66, 0.85), None, True),  # face
            ("ELLIPSOID", hc + Vector((0, 0.0, -0.78)), 0.5 * K, (1.6, 1.6, 0.6), None, True),  # neck
            ("ELLIPSOID", hc + Vector((0, -0.2, -0.32)), 0.3 * K, (1.6, 0.7, 0.5), None, True),  # jaw / sideburn
            ("ELLIPSOID", hc + Vector((0, 0.0, 0.52)), 0.46 * K, (1.5, 1.5, 0.75), None, True),  # top: the long hair owns it
        ],
        mats["fade"],
        resolution=0.026,
    )
    decimate(fade, 0.5)
    fade.name = "Fade"
    parent(fade, head_root)

    for o in glasses:
        o.visible_shadow = False
        o["no_shadow"] = 1  # exported as extras; the site skips castShadow for these
    for o in [skull, hair, beard, *face, *glasses]:
        parent(o, head_root)

    root = bpy.data.objects.new("Avatar", None)
    bpy.context.collection.objects.link(root)
    parent(body_root, root)
    parent(head_root, root)
    return root


# ---------------------------------------------------------------- render turnarounds
def renders(out_dir):
    import os

    os.makedirs(out_dir, exist_ok=True)
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 48
    scene.render.resolution_x = 720
    scene.render.resolution_y = 720
    scene.view_settings.view_transform = "AgX"

    world = bpy.data.worlds.new("W")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = srgb_to_linear("#1a1422")
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.6
    scene.world = world

    sun = bpy.data.objects.new("Sun", bpy.data.lights.new("Sun", "SUN"))
    sun.data.energy = 3.2
    sun.rotation_euler = (math.radians(50), math.radians(10), math.radians(35))
    scene.collection.objects.link(sun)
    rim = bpy.data.objects.new("Rim", bpy.data.lights.new("Rim", "AREA"))
    rim.data.energy = 300
    rim.data.color = srgb_to_linear("#9B76D3")[:3]
    rim.data.size = 2
    rim.location = (-2.5, 2.5, 2.5)
    scene.collection.objects.link(rim)

    cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
    cam.data.type = "ORTHO"
    cam.data.ortho_scale = 2.9
    scene.collection.objects.link(cam)
    scene.camera = cam
    target = Vector((0, 0, 1.15))
    views = {
        "front": Vector((0, -6, 1.3)),
        "three_quarter": Vector((4.2, -4.2, 1.8)),
        "side": Vector((6, 0, 1.3)),
        # same direction as the site's camera (three (9,6.4,12) → blender (9,-12,6.4))
        "desk_iso": Vector((9, -12, 6.4)).normalized() * 8 + target,
    }
    for name, pos in views.items():
        cam.location = pos
        cam.rotation_euler = (target - pos).to_track_quat("-Z", "Y").to_euler()
        scene.render.filepath = os.path.join(out_dir, f"{name}.png")
        bpy.ops.render.render(write_still=True)


def main():
    a = args()
    reset()
    build()
    tris = sum(
        sum(len(p.vertices) - 2 for p in o.data.polygons) for o in bpy.data.objects if o.type == "MESH"
    )
    print(f"AVATAR_TRIS {tris}")
    bpy.ops.export_scene.gltf(
        filepath=a.out,
        export_format="GLB",
        export_yup=True,
        export_apply=True,
        export_materials="EXPORT",
        export_extras=True,
    )
    if a.renders:
        renders(a.renders)


if __name__ == "__main__":
    main()
