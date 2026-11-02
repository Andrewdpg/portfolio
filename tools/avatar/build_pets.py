"""Build Andrés's two cats, each in a small black bowl bed, and export public/models/pets.glb.

    blender -b -P tools/avatar/build_pets.py -- --out public/models/pets.glb --renders tools/avatar/out

Two root nodes, both at the origin on the floor: "CatOrange" (curled up asleep) and "CatSiamese" (sitting).
DeskScene places each one. Reuses the helpers from build_avatar.py.
"""
import math
import os
import sys

import bpy
from mathutils import Vector

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from build_avatar import (  # noqa: E402
    K, args, bounds, capsule, cylinder, decimate, material, metaball, parent, reset, sphere, srgb_to_linear,
)

BED = "#19181d"
CUSHION = "#2c2a31"
ORANGE = "#e08a3c"
ORANGE_DARK = "#b9642a"
CREAM = "#eee2cc"
POINTS = "#4a3426"  # siamese mask, ears, paws, tail
BLUE = "#5f9fd8"
DARK = "#1a120c"
PINK = "#d99a94"


def cone(name, loc, r, depth, mat, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cone_add(vertices=12, radius1=r, radius2=0.008, depth=depth, location=loc, rotation=rot)
    o = bpy.context.active_object
    o.name = name
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat)
    return o


def bed(name, m):
    """Black half-sphere bowl with a rolled rim and a cushion."""
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=20, radius=0.62, location=(0, 0, 0))
    bowl = bpy.context.active_object
    bowl.name = f"{name}Bowl"
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="DESELECT")
    bpy.ops.object.mode_set(mode="OBJECT")
    for v in bowl.data.vertices:
        v.select = v.co.z > 0.001
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.delete(type="VERT")
    bpy.ops.object.mode_set(mode="OBJECT")
    bowl.scale = (1, 1, 0.55)
    bowl.location = (0, 0, 0.34)
    bpy.ops.object.transform_apply(location=True, scale=True)
    sol = bowl.modifiers.new("thick", "SOLIDIFY")
    sol.thickness = 0.05
    bpy.ops.object.modifier_apply(modifier=sol.name)
    bpy.ops.object.shade_smooth()
    bowl.data.materials.append(m["bed"])

    bpy.ops.mesh.primitive_torus_add(major_radius=0.6, minor_radius=0.065, location=(0, 0, 0.34), major_segments=40, minor_segments=10)
    rim = bpy.context.active_object
    rim.name = f"{name}Rim"
    bpy.ops.object.shade_smooth()
    rim.data.materials.append(m["bed"])

    cushion = sphere(f"{name}Cushion", (0, 0, 0.2), 0.53, m["cushion"], (1, 1, 0.2), seg=24)
    return [bowl, rim, cushion]


def siamese(m):
    """Sitting, looking out of the bed."""
    base = 0.26
    body = metaball(
        "SiameseBody",
        [
            ("ELLIPSOID", (0, 0.08, base + 0.2), 0.3 * K, (0.95, 1.0, 0.85), None),  # haunches
            ("ELLIPSOID", (0, -0.07, base + 0.42), 0.2 * K, (0.85, 0.8, 1.25), None),  # chest
            ("ELLIPSOID", (0, -0.11, base + 0.74), 0.19 * K, (1.05, 0.9, 0.85), None),  # head
            capsule((0.085, -0.15, base + 0.35), (0.085, -0.2, base + 0.04), 0.05 * K),  # front legs
            capsule((-0.085, -0.15, base + 0.35), (-0.085, -0.2, base + 0.04), 0.05 * K),
        ],
        m["cream"],
        resolution=0.02,
    )
    decimate(body, 0.5)
    lo, hi = bounds(body)
    face_y = lo.y
    head_z = base + 0.74
    points = metaball(
        "SiamesePoints",
        [
            ("ELLIPSOID", (0, -0.2, head_z - 0.04), 0.11 * K, (1.15, 0.75, 1.0), None),  # face mask
            capsule((0.2, 0.22, base + 0.05), (0.32, -0.05, base + 0.04), 0.045 * K),  # tail around the front
            capsule((0.32, -0.05, base + 0.04), (0.16, -0.28, base + 0.04), 0.042 * K),
        ],
        m["points"],
        resolution=0.02,
    )
    decimate(points, 0.5)
    parts = [body, points]
    for s in (-1, 1):
        parts.append(cone(f"SiameseEar{s}", (0.095 * s, -0.09, head_z + 0.14), 0.064, 0.12, m["points"], (0.15, 0.32 * s, 0)))
        parts.append(sphere(f"SiamesePaw{s}", (0.085 * s, -0.23, base + 0.03), 0.052, m["points"], (1, 1.25, 0.6), seg=12))
        parts.append(sphere(f"SiameseEye{s}", (0.062 * s, face_y + 0.012, head_z + 0.02), 0.026, m["blue"], (1.25, 0.5, 0.85), seg=12))
    parts.append(sphere("SiameseNose", (0, face_y - 0.004, head_z - 0.04), 0.018, m["dark"], (1.2, 0.8, 0.8), seg=10))
    return parts


def orange(m):
    """Curled up asleep: a loaf with the head tucked in front and the tail wrapped around."""
    base = 0.26
    body = metaball(
        "OrangeBody",
        [
            ("ELLIPSOID", (0.04, 0.04, base + 0.14), 0.32 * K, (1.15, 0.92, 0.55), None),  # curled body
            ("ELLIPSOID", (-0.2, -0.2, base + 0.2), 0.16 * K, (1.0, 0.95, 0.82), None),  # head tucked
            capsule((0.32, 0.12, base + 0.06), (0.26, -0.22, base + 0.05), 0.048 * K),  # tail wrap
            capsule((0.26, -0.22, base + 0.05), (-0.04, -0.34, base + 0.05), 0.046 * K),
        ],
        m["orange"],
        resolution=0.02,
    )
    decimate(body, 0.5)
    lo, hi = bounds(body)
    parts = [body]
    # tabby stripes laid across the back
    for i, x in enumerate((-0.05, 0.07, 0.19)):
        parts.append(sphere(f"OrangeStripe{i}", (x, 0.04, hi.z - 0.075), 0.2, m["orange_dark"], (0.1, 0.8, 0.42), seg=16))
    hx, hy, hz = -0.2, -0.2, base + 0.2
    for s, (ex, ey) in ((-1, (-0.3, -0.16)), (1, (-0.13, -0.24))):
        parts.append(cone(f"OrangeEar{s}", (ex, ey, hz + 0.13), 0.062, 0.11, m["orange"], (0.25 * s, -0.3, 0)))
    # closed eyes: two short dark strokes on the tucked face
    for s in (-1, 1):
        a = Vector((hx + 0.055 * s - 0.03, hy - 0.16, hz + 0.03))
        parts.append(cylinder(f"OrangeLid{s}", a, a + Vector((0.045, -0.012, -0.006)), 0.008, m["dark"], 6))
    parts.append(sphere("OrangeNose", (hx - 0.03, hy - 0.2, hz - 0.03), 0.017, m["pink"], (1.2, 0.8, 0.8), seg=10))
    return parts


def group(name, objs):
    root = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(root)
    for o in objs:
        parent(o, root)
    return root


def renders(out_dir, roots):
    os.makedirs(out_dir, exist_ok=True)
    roots[0].location.x = -0.75
    roots[1].location.x = 0.75
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 48
    scene.render.resolution_x = 900
    scene.render.resolution_y = 600
    scene.view_settings.view_transform = "AgX"
    world = bpy.data.worlds.new("W")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = srgb_to_linear("#1a1422")
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.7
    scene.world = world
    sun = bpy.data.objects.new("Sun", bpy.data.lights.new("Sun", "SUN"))
    sun.data.energy = 3.2
    sun.rotation_euler = (math.radians(50), math.radians(10), math.radians(35))
    scene.collection.objects.link(sun)
    cam = bpy.data.objects.new("Cam", bpy.data.cameras.new("Cam"))
    cam.data.type = "ORTHO"
    cam.data.ortho_scale = 3.0
    scene.collection.objects.link(cam)
    scene.camera = cam
    target = Vector((0, 0, 0.45))
    for name, pos in {"pets_front": Vector((0, -6, 1.2)), "pets_iso": Vector((9, -12, 6.4)).normalized() * 8 + target}.items():
        cam.location = pos
        cam.rotation_euler = (target - pos).to_track_quat("-Z", "Y").to_euler()
        scene.render.filepath = os.path.join(out_dir, f"{name}.png")
        bpy.ops.render.render(write_still=True)


def main():
    a = args()
    reset()
    m = {
        "bed": material("Bed", BED, 0.85),
        "cushion": material("Cushion", CUSHION, 0.95),
        "orange": material("OrangeFur", ORANGE, 0.9),
        "orange_dark": material("OrangeStripe", ORANGE_DARK, 0.9),
        "cream": material("CreamFur", CREAM, 0.9),
        "points": material("Points", POINTS, 0.9),
        "blue": material("BlueEye", BLUE, 0.25),
        "dark": material("Dark", DARK, 0.4),
        "pink": material("Pink", PINK, 0.6),
    }
    o = group("CatOrange", bed("Orange", m) + orange(m))
    s = group("CatSiamese", bed("Siamese", m) + siamese(m))
    tris = sum(sum(len(p.vertices) - 2 for p in ob.data.polygons) for ob in bpy.data.objects if ob.type == "MESH")
    print(f"PETS_TRIS {tris}")
    bpy.ops.export_scene.gltf(filepath=a.out, export_format="GLB", export_yup=True, export_apply=True)
    if a.renders:
        renders(a.renders, [o, s])


main()
