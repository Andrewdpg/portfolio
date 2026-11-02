# Avatar

`public/models/avatar.glb` and `public/models/pets.glb` (the two cats, `build_pets.py`) are generated, not hand-modelled. Edit `build_avatar.py` (palette, proportions and hair layout are at the top or in `build()`), then regenerate:

```
blender -b -P tools/avatar/build_avatar.py -- --out public/models/avatar.glb --renders tools/avatar/out
```

Blender 5.2 (any recent version with the bundled glTF exporter) works, including the portable build from blender.org. `--renders` writes front, 3/4, side and site-camera previews to `tools/avatar/out/` (git-ignored). Glasses carry a `no_shadow` extra that `Avatar.tsx` reads.
