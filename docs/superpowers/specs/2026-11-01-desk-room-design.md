# Desk room v2 — the 3D hero as a working summary of Andrés

Date: 2026-11-01
Status: draft, pending approval

## Intent and the why

The portfolio opens with a hand-built 3D desk scene (`src/features/desk/`, react-three-fiber, no drei, no GLTF). It gives a good first impression, but three problems make it feel low-quality and disconnected:

1. **It reads as a separate page.** Every interactive object is personal (headphones → Spotify, mug → contact, avatar → "Off the clock", monitor → Snake). Nothing in the room says anything about his work, so the room says "me off the clock" and the page below says "my CV". No other part of the page shares the 3D language.
2. **The avatar looks bad.** It's made of primitives (sphere head, 11 spheres of hair, capsule arms, rounded-box torso). Primitives cap quality no matter how much they're tuned.
3. **Wide screens show a small box in the middle.** `CameraRig` uses a fixed orthographic frustum height (11.4 / 17), so the room is always the same size and wide monitors get empty sides. A dark gradient also covers the left 58% so the text reads.

The goal: **someone landing on the page should understand who Andrés is and what he does at a glance, without reading.** The room should be useful and informative, not just pretty, and it should be the entry point into the rest of the page.

## Goals

- The room shows real professional content, read from data:
  - **3 featured projects as posters** on the back wall, showing project images (currently Waycairn, Methodus, Casia & Canela).
  - **~12 featured skills as stacked cubes** on a shelf, each with its real icon.
  - **ICESI (current employer)** branding visible somewhere natural in the room.
  - **Andrés** at the desk, rebuilt as a proper modeled character.
- **Full-bleed composition (option A, chosen by Andrés):** the room fills the viewport edge to edge. Wider screens show more room, not more empty space. Remove the left gradient overlay. Name and role sit small at top-left; Contact / Resume stay at the bottom.
- **Scroll-driven camera:** as the user scrolls, the camera moves into the room, closing in on the posters before the Projects content and on the skill cubes before the Skills content. Clicking a poster or cube navigates to the same place. The room becomes the doorway to each section instead of a dead end.
- **Data-driven, edit-one-file:** what appears in the room is chosen in `src/services/dataService.ts`, with no hardcoded content in the scene. Swapping a poster or cube means changing one line there (a `featured` flag or a short list of ids, builder's choice, but it must live in that file).

## Non-goals (for now)

- Objects for experience entries (Education, ICESI history, Swiset), such as a diploma or badge. Agreed as a later pass.
- Redesigning the sections below the hero (Experience, Projects, Skills, Workflow). About is the exception: it gets merged into the hero.
- Option (b), the canvas persisting behind the whole page. Planned as a follow-up.
- Showing all ~60 skills in 3D. The full list stays in the Skills section.

## Anti-goals (would make this a failure even if it works)

- Looking generic or template-like (the previous critique flagged the "AI template" aesthetic).
- Personal objects competing with the professional ones for attention.
- A motion-heavy experience on phones: a traveling camera on a small screen causes dizziness and drains the battery.
- Content in the scene that drifts out of sync with `dataService.ts`.
- Breaking what already works: lazy loading of the scene, pausing when off-screen (`paused` / `frameloop`), the CV download states, and the contact modal.

## Decisions made

- **Composition:** option A, full-bleed room (Andrés).
- **Scroll zoom into posters/cubes:** yes (Andrés).
- **Featured projects:** Waycairn, Methodus, Casia & Canela (Andrés), changeable via data.
- **Skills shown:** ~12, taken from Expert/Advanced skills that have a real icon (proposed by Claude, accepted).
- **Personal objects:** cut down to one or two that add personality; the rest are removed (proposed by Claude, accepted). *Claude's call on which: keep the monitor (CRT/Snake easter egg) and the headphones (music); drop mug and gamepad. Contact stays as the button.*
- **Mobile:** simplified, with no camera tour (proposed by Claude, accepted). *Claude's call: on narrow or `prefers-reduced-motion` viewports, render a static framed view of the room; posters and cubes stay tappable and navigate directly.*
- **Avatar pipeline (Claude's call, Andrés has no 3D skills and delegated it):** install Blender and build the character with a headless `bpy` script, export a `.glb`, and load it with three's `GLTFLoader`. The script is committed so the model can be regenerated. Stylized "vinyl figure" look: smooth merged forms (metaballs or subdivision plus remesh), not primitives. Traits to keep from the current avatar: dark curly hair, glasses with a light purple-grey frame, warm brown skin tone (`#9c6b4e`), dark hoodie with purple drawstrings. Reference photo: `src/assets/img/me.jpeg`. Subtle idle animation (breathing, head following pointer) stays.
- **Scroll structure: option (a), a tour inside the room (Andrés).** The hero pins for extra scroll length. The camera goes overview → posters (project names overlaid) → skill cubes → ICESI, then releases into the next section. Page order stays as is. This is meant as a first step: a later version could keep the canvas alive behind the whole page and resurface it before Projects and Skills (option b). Build so that path isn't blocked, for example keep camera "stops" as data instead of hardcoded scroll math. Snap must allow the tour (e.g. snap only at the hero start and end), and `Navigation` keeps treating the hero as the single `home` section.
- **Merge Home and About (Andrés).** The `about` section and the `Presentation` component go away, and the extra scroll with them. What it held moves as follows (*Claude's calls*):
  - Bio paragraph ("Software engineer with experience building…") replaces the current tagline in the hero overlay, kept short.
  - Pitch video (YouTube `MKu16mOYshE`) becomes a CRT channel on the in-room monitor ("Watch pitch"). Clicking opens it in a modal player.
  - Photo (`me.webp`): dropped, since the avatar replaces it.
  - `LanguageStamps` and `Partner` (creative partner link): small, in the hero's bottom row next to Contact / Resume.
  - "Source Code" button: dropped from the hero (low value at first glance). The repo link can live in the footer.
  - The personal "Beyond the code" flip duplicates the Off-the-clock modal: keep only the modal.
  - Remove `{ id: 'about' }` from `Dashboard.tsx` sections and its icon case in `Navigation.tsx`.
- **ICESI logo (Claude's call; Andrés didn't specify):** take the official logo from ICESI's public site, saved as SVG in `public/img/logos/`. Showing your current employer's mark on a personal portfolio is normal practice. If Andrés objects, fall back to a text "Universidad Icesi" badge.
- **Avatar sign-off and fallback (Claude's call):** before integrating, render turnaround screenshots of the `.glb` and Andrés approves them. If the scripted model doesn't pass after a reasonable iteration, fall back to a CC0 stylized base character (e.g. Quaternius/KayKit) recolored and accessorized with his traits. Don't ship the primitive avatar again.
- **Click targets (Claude's call):** posters and cubes scroll to the Projects or Skills section. Deep-linking to the specific card or skill is out of scope, since it would mean changing those sections.
- **"Off the clock" (Claude's call):** keep the modal and its content. The avatar stays its only entry point: clicking "you" to learn about you is natural. Remove the separate "Off the clock ↗" button from the hero.
- **Hero copy (Claude's call):** keep name, role line and tagline, but scale the name down (about `text-5xl` / `md:text-6xl`) so it doesn't cover the room. Drop the "Hover the objects…" hint; hover affordance comes from the objects themselves (lift and glow) plus the existing hover pill.
- **Visual language:** keep the current palette (`C` in `DeskScene.tsx`, accent `#9B76D3`) and the orthographic isometric camera.

## Constraints

- Stack already in place: React 19, Vite, `@react-three/fiber` 9, `three` 0.187, Tailwind. Prefer what's installed. Adding `@react-three/drei` is acceptable only if it clearly removes code (e.g. `useGLTF`, `ScrollControls`); otherwise use three's own loaders.
- Page scroll lives in `.hero-scroll-container` (`src/components/HeroScroll.css`) with `scroll-snap-type: y mandatory`. Any scroll-driven camera has to coexist with or adjust this.
- Skill icons in `dataService.ts` are React elements: either `react-icons` components (`FaReact`, …) or `<img>` pointing to `public/icons/devicon/*.svg`. Cube textures must be produced from these. Possible approach: rasterize to canvas from the img `src`, or `renderToStaticMarkup` for react-icons. Don't duplicate icon assets.
- Project images come from the `images` arrays already in `dataService.ts`.
- Current employer comes from data (the experience entry marked "Present", ICESI). ICESI has no logo asset in the repo yet (see decision above).
- The scene is dark-only today while the site has light/dark themes (`ThemeContext`). Keeping it dark is acceptable.
- The whole `src/features/desk/` feature and its wiring in `Dashboard.tsx` and `Navigation.tsx` are uncommitted. Commit the current state before starting.

## Left to the builder

- Exact placement and styling of the ICESI branding (pennant, lanyard badge, laptop sticker, …).
- Poster and cube styling, hover states, and how labels or tooltips appear (reuse the existing hover pill in `HomeSection`).
- Frustum and framing math so wide screens show more room. Likely size the frustum by width beyond a breakpoint, and extend the room geometry (walls, floor, side props) to fill it.
- How the `featured` selection is expressed in `dataService.ts`.
- Lighting and material polish, and the performance budget (keep `dpr` capped and shadows reasonable).
