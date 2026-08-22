# 16-portfolio-pet-implementation-plan.md

# Portfolio Pet — Phase-by-Phase Implementation Plan

> **Read before starting any phase:**
> - Check `PROGRESS.MD` for current state.
> - Check `AGENT.md` Golden Rules before adding any dependency or pattern.
> - Teaching Mode is active — every step must be explained.
> - Update `PROGRESS.MD` and `15-development-roadmap.md` **after** each phase completes.

---

## Codebase Context (Verified 2026-08-22)

Before writing a single line of pet code, the agent confirmed these facts about the actual repo:

| Item | Actual State |
|---|---|
| `src/app`, `src/features`, `src/shared`, `src/domains` | All exist |
| `src/features/perspective/` | Exists with `components/` and `hooks/` |
| `src/domains/perspective/store.ts` | Zustand store (`usePerspectiveStore`) with `perspective`, `setPerspective`, `toggle` |
| `src/shared/components/global-shortcuts.tsx` | Exists — handles `c` (color), `r` (resume), `h` (home), `p` (projects), `a` (architecture-lab). Shift+P is NOT here. |
| `src/features/perspective/hooks/use-perspective-shortcut.ts` | Exists — this is where `Shift+P` lives |
| `src/app/layout.tsx` | Mounts `GlobalShortcuts`, `PerspectiveSync`, `Header`, `Footer` inside `SmoothScrollProvider` |
| `public/pet/` folder | Does not exist yet — needs creation with placeholder |
| `src/features/portfolio-pet/` | Does not exist — to be created |

**Key insight:** `Shift+P` lives in `use-perspective-shortcut.ts`, NOT in `GlobalShortcuts`. The pet must subscribe to `usePerspectiveStore` for perspective changes, and reuse the existing shortcut observable for `SHORTCUT_USED`. Do not duplicate shortcut logic.

---

## Pre-Phase: Documentation Updates

Before any implementation, update two docs to register Phase 14 officially:

1. `docs/15-development-roadmap.md` — Add Phase 14 (Portfolio Pet) with sub-phases 14.1–14.7 after Phase 13 (Deployment).
2. `PROGRESS.MD` — Add Portfolio Pet to the phase checklist (unchecked) and note it as pre-approved per `16-portfolio-pet-agent-context.md §0`.

> **These doc updates are the ONLY action before the user gives the go-ahead per phase.**

---

## Phase 14.1 — Placeholder Pet (Scaffold)

### Goal
Mount the `PortfolioPet` component globally in the root layout at a fixed position with a static placeholder visual (no Rive). Scaffold the Zustand store and make the hide toggle work with `localStorage` persistence.

### What Gets Built

```
src/features/portfolio-pet/
    components/
        portfolio-pet.tsx         <- public entry; mounted once in layout.tsx
        pet-visual.tsx            <- placeholder SVG/emoji; Rive slot prepared but stubbed
        pet-speech.tsx            <- speech bubble (HTML, not Rive)
        pet-menu.tsx              <- "Hide pet" menu only
        pet-controller.tsx        <- state wiring (no rendering)
    hooks/
        use-pet-store.ts          <- Zustand store
    lib/
        pet-events.ts             <- minimal event dispatcher scaffold (stubs only)
    pet-config.ts                  <- all copy + timing constants
    pet-types.ts                   <- PetStatus union, PetState interface, PetEvent type
```

Also:
- Add `<PortfolioPet />` to `src/app/layout.tsx` after `<GlobalShortcuts />` and before `<Header />`.
- Create `public/pet/README.md` noting that `portfolio-pet.riv` goes here.

### Zustand Store Shape

```ts
interface PetState {
  status: PetStatus;
  message: string | null;
  visible: boolean;
  hasSeenIntro: boolean;      // hydrated client-side only — SSR guard required
  lastInteractionAt: number;
  setStatus: (s: PetStatus) => void;
  setMessage: (m: string | null) => void;
  setVisible: (v: boolean) => void;
  markIntroSeen: () => void;
  recordInteraction: () => void;
}
```

### Config Shape

```ts
export const petConfig = {
  desktopSize: 96,
  mobileSize: 64,
  mobileBreakpointPx: 767,
  welcomeDelayMs: 3000,
  speechDurationMs: 3000,
  idleTimeoutMs: 60000,
  mobileWalkEnabled: false,
  reducedMotionDisableMovement: true,
  messages: { /* all copy here — no inline strings anywhere */ },
};
```

### Definition of Done for 14.1

- [ ] Pet renders on all pages at `position: fixed`, bottom-right.
- [ ] Desktop size = 96px, mobile size = 64px (from `petConfig`).
- [ ] "Hide pet" toggle works; `portfolio_pet_disabled` survives page reload.
- [ ] Pet does NOT overlap mobile Perspective Toggle or sticky nav — confirm by inspection.
- [ ] No Rive dependency installed yet.
- [ ] No animations wired yet — static placeholder only.
- [ ] `PROGRESS.MD` updated.

---

## Phase 14.2 — Rive Integration

### Goal
Install `@rive-app/react-canvas`, wire `PetVisual.tsx` to the real `.riv` asset (or keep SVG stub if asset not delivered), implement `Idle`, `Welcome`, `Happy` states.

### Rules

- `npm install @rive-app/react-canvas` (pre-approved in `16-portfolio-pet-agent-context.md §0`).
- `pet-visual.tsx` updated: `<RiveComponent>` pointing at `/pet/portfolio-pet.riv`.
- Graceful degradation: `.riv` load failure -> catch via `onLoadError` -> SVG stub. No crash. Per `08-error-handling.md §2`.
- Only wire three states first: `Idle`, `Welcome`, `Happy`. Do not invent state machine input names.
- SSR safe: `"use client"` + `dynamic(() => import(...), { ssr: false })` for Rive component.
- `prefers-reduced-motion`: replace Rive canvas with SVG stub when active.

### Definition of Done for 14.2

- [ ] `@rive-app/react-canvas` installed.
- [ ] `PetVisual.tsx` renders `.riv` on desktop with correct `Idle` state.
- [ ] `.riv` load failure -> SVG fallback, no crash.
- [ ] `prefers-reduced-motion` -> SVG stub, no Rive.
- [ ] No SSR crash.
- [ ] `PROGRESS.MD` updated.

---

## Phase 14.3 — Welcome Experience

### Goal
First-visit detection + welcome sequence with correct desktop/mobile copy. Sequence must not block page interaction.

### What Gets Built / Changed

- `pet-controller.tsx`: On mount, check `localStorage` for `portfolio_pet_intro_seen`. If absent -> wait `welcomeDelayMs` -> `welcome` status -> first message -> wait `speechDurationMs` -> platform-appropriate hint -> mark seen -> `idle`.
- Desktop hint copy: from `petConfig.messages.welcomeHintDesktop` ("Try Shift + P to switch to Architecture view.").
- Mobile hint copy: from `petConfig.messages.welcomeHintMobile` ("Tap the perspective switch up top for the engineering view.").
- Breakpoint detection: `window.matchMedia('(max-width: 767px)')` — value from `petConfig.mobileBreakpointPx`.
- `pet-speech.tsx`: Framer Motion `AnimatePresence` fade. Shorter width + duration on mobile — both from `petConfig`.

### SSR Guard Pattern

```ts
useEffect(() => {
  if (typeof window === 'undefined') return;
  try {
    const seen = localStorage.getItem('portfolio_pet_intro_seen');
    if (!seen) { /* trigger welcome */ }
  } catch { /* private browsing — proceed without persistence */ }
}, []);
```

### Definition of Done for 14.3

- [ ] Welcome plays exactly once per browser.
- [ ] Desktop second bubble: "Try Shift + P...".
- [ ] Mobile second bubble: "Tap the perspective switch..." — no shortcut text.
- [ ] Page remains interactive during welcome sequence.
- [ ] `prefers-reduced-motion`: speech shows; animations instant.
- [ ] SSR safe: no hydration mismatch.
- [ ] `PROGRESS.MD` updated.

---

## Phase 14.4 — Event Wiring

### Goal
Wire pet to real portfolio events: perspective changes, project opens, shortcut use (desktop only), architecture lab, telemetry.

### Events to Wire

| Event | Source | Desktop | Mobile |
|---|---|---|---|
| `PERSPECTIVE_CHANGED` | `usePerspectiveStore` | Happy + praise | Happy + praise |
| `PROJECT_OPENED` | `/projects/[slug]` mount | Rare (10/5/5%) | Rare speech only |
| `SHORTCUT_USED` | `use-perspective-shortcut.ts` | Happy reaction | Never attach |
| `ARCHITECTURE_LAB_OPENED` | `/architecture-lab` mount | Small reaction | Small reaction |
| `TELEMETRY_VIEWED` | `/telemetry` mount | Small reaction | Small reaction |
| `RESUME_DOWNLOADED` | `GlobalShortcuts` r key / Contact CTA | Happy | Happy |
| `CONTACT_CLICKED` | Contact CTA click | Happy | Happy |

### Key Rules

- `PERSPECTIVE_CHANGED`: Zustand selector in `pet-controller.tsx` — subscribe to `perspective` field.
- `SHORTCUT_USED`: Inspect `use-perspective-shortcut.ts` first. If no observable, add `perspectiveShortcutCount` to the perspective store, increment there. Pet subscribes to counter. NO second keydown listener in pet module.
- Mobile shortcut guard: detect via `matchMedia('(max-width: 767px)')` on setup — if mobile, never attach.
- Route mounts: thin `usePetEvent(eventName)` hook in page/layout.
- Probability model: Math.random() gate — 80% idle / 10% look / 5% walk (desktop-only) / 5% speech.

### Definition of Done for 14.4

- [ ] Pet reacts `happy` + praise when perspective changes (both platforms).
- [ ] `PROJECT_OPENED` fires rarely — not on every open.
- [ ] `Shift+P` fires `SHORTCUT_USED` on desktop only.
- [ ] No second `Shift+P` listener in pet module.
- [ ] Architecture lab and telemetry route signals fire correctly.
- [ ] `PROGRESS.MD` updated.

---

## Phase 14.5 — Idle, Sleep, Wake

### Goal
Inactivity detection -> sleep after `idleTimeoutMs`. Wake on next interaction. Rare idle ambient behaviors.

### Rules

- Listeners on `mousemove`, `click`, `keydown`, `scroll`, `touchstart` -> `recordInteraction()`.
- Resettable `setTimeout` (not `setInterval`) for 60s threshold -> `sleep` status.
- Next interaction after sleep -> `wake` -> short delay -> `idle`.
- Rare idle roll every ~15s while idle: 80% nothing / 10% look / 5% walk (desktop-only, `mobileWalkEnabled`) / 5% speech.
- All listeners and timers cleaned up in `useEffect` return — no memory leaks.

### Definition of Done for 14.5

- [ ] Pet sleeps after 60s no input.
- [ ] Pet wakes on next interaction.
- [ ] Rare idle behaviors at 80/10/5/5 ratio.
- [ ] Walking is desktop-only.
- [ ] All listeners cleaned up on unmount.
- [ ] `PROGRESS.MD` updated.

---

## Phase 14.6 — Hide/Disable and Accessibility

### Goal
Complete hide/disable flow, full ARIA accessibility, reduced-motion compliance, confirm no layout overlap.

### Hide Flow

- `portfolio_pet_disabled` in `localStorage` -> `PortfolioPet` returns `null` immediately — no listeners, no store, no timers.
- All `localStorage` calls wrapped in `try/catch` for private browsing.
- Re-enable path: footer link or persistent stub icon — decide and explain in Teaching Mode.

### Mobile PetMenu

- **Mobile: "Hide pet" ONLY.** No shortcuts panel. No "Show shortcuts" item. Not on mobile. Not ever.
- Desktop: "Hide pet" only (shortcuts help panel is out of V1 scope).

### Accessibility

- `aria-label="Portfolio assistant"` on pet container.
- `Escape` to dismiss menu.
- No keyboard focus trapping.
- No autoplaying sound. Ever.
- `prefers-reduced-motion`: all Framer Motion durations -> 0; Rive -> SVG stub; walk/bounce disabled; speech still shows.

### Layout Overlap Audit

- Inspect DOM at mobile viewport — confirm no overlap with: Mobile Perspective Toggle, sticky mobile nav, Contact CTA section.
- Adjust `bottom`/`right` offsets in Tailwind classes if needed. Do not assume clearance — measure it.

### Definition of Done for 14.6

- [ ] "Hide pet" works, persists via `localStorage`.
- [ ] Re-enable path exists.
- [ ] Mobile `PetMenu`: "Hide pet" only.
- [ ] ARIA, Escape, no focus trapping.
- [ ] No layout overlap at mobile — confirmed by inspection.
- [ ] `prefers-reduced-motion` compliant.
- [ ] `localStorage` try/catch everywhere.
- [ ] `PROGRESS.MD` updated.

---

## Phase 14.7 — Polish and Perf Check

### Goal
Final audit of performance, error handling, and cross-mode correctness. No new features — quality only.

### Performance Checklist

- [ ] `@rive-app/react-canvas` loaded via `dynamic(() => import(...), { ssr: false })` — not in initial bundle.
- [ ] `React.memo` on `PetVisual`, `PetSpeech`, `PetMenu` where useful.
- [ ] All `useEffect` listeners have cleanup.
- [ ] No continuous JS animation loops.
- [ ] Lighthouse regression negligible vs. pre-pet baseline.

### Error Handling Checklist

- [ ] `.riv` 404 -> SVG placeholder, no crash.
- [ ] `.riv` runtime error -> same fallback, isolated.
- [ ] `localStorage` blocked -> `try/catch` prevents crash.

### Cross-Mode Verification Matrix

| Mode | Expected |
|---|---|
| Desktop, first visit | Welcome + Shift+P hint plays once |
| Desktop, returning | No welcome; idle resumes |
| Desktop, Shift+P | Happy reaction |
| Desktop, perspective change | Happy + praise |
| Desktop, reduced-motion | Static, speech still works |
| Mobile, first visit | Welcome + tap-hint plays once |
| Mobile, perspective change | Happy (no shortcut reference) |
| Mobile, reduced-motion | Static, speech still works |
| Pet hidden | Returns null, no listeners |
| .riv load failure | SVG stub, no crash |

### Documentation Final Update

- [ ] `docs/15-development-roadmap.md` -> Phase 14 complete.
- [ ] `PROGRESS.MD` -> Phase 14 complete with implementation notes.

---

## Prompts to Send Phase by Phase

Send the next prompt only after the previous phase is confirmed done.

---

### PRE-PHASE PROMPT

```
Phase 14 Pre-work: Update docs only — no code yet.

1. Update `docs/15-development-roadmap.md`: Add Phase 14 — Portfolio Pet with sub-phases 14.1–14.7 as a new phase after Phase 13. Reference `docs/16-portfolio-pet-agent-context.md` for spec. Mark all sub-phases as pending.

2. Update `PROGRESS.MD`: Add "Portfolio Pet (Phase 14)" to the phase checklist as unchecked. In section 4 ("What's Actually Implemented"), add a note that Phase 14 is pre-approved per `16-portfolio-pet-agent-context.md §0` and that `@rive-app/react-canvas`, `src/features/portfolio-pet/`, and a pet-scoped Zustand store are all pre-approved without a further review round-trip.

Do not touch any source files. Confirm when both doc updates are complete.
```

---

### PHASE 14.1 PROMPT

```
Implement Phase 14.1 — Placeholder Pet.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.1.
Also read: `docs/16-portfolio-pet-agent-context.md`, `AGENT.md`, `PROGRESS.MD`.

Goal: Scaffold the entire `src/features/portfolio-pet/` module with a static placeholder visual. No Rive. No animations. Just structure, Zustand store, `pet-config.ts`, `pet-types.ts`, and a working hide toggle with localStorage persistence.

Rules:
- Check `PROGRESS.MD` first.
- Follow `10-coding-standards.md` naming exactly (kebab-case files, PascalCase exports).
- All copy and timing go in `pet-config.ts` — no magic strings in components.
- Add `<PortfolioPet />` to `src/app/layout.tsx` after `<GlobalShortcuts />` and before `<Header />`.
- Create `public/pet/README.md` noting that `portfolio-pet.riv` goes here.
- Inspect actual layout to confirm pet does not overlap mobile toggle or nav — adjust offsets if needed.
- Update `PROGRESS.MD` when done.
- Teaching Mode: explain every file you create and every decision you make.
```

---

### PHASE 14.2 PROMPT

```
Implement Phase 14.2 — Rive Integration.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.2.

Goal: Install `@rive-app/react-canvas` (pre-approved). Wire `pet-visual.tsx` to `/pet/portfolio-pet.riv`. If the `.riv` file does not exist yet, keep the SVG stub with a TODO comment and only install the package + prepare the integration code so it's ready to drop in.

Rules:
- Graceful degradation: `.riv` load failure -> SVG fallback, no crash. Implement `onLoadError` handler.
- SSR safe: Rive canvas is client-only. Use `"use client"` + dynamic import with `ssr: false`.
- `prefers-reduced-motion`: replace Rive canvas with SVG stub when active.
- Only wire `Idle`, `Welcome`, `Happy` states. Do not invent state machine input names. If `.riv` exists, read its exported inputs. If not, use string constants with TODO comments.
- Update `PROGRESS.MD` when done.
- Teaching Mode on.
```

---

### PHASE 14.3 PROMPT

```
Implement Phase 14.3 — Welcome Experience.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.3.

Goal: First-visit detection + welcome sequence with correct desktop/mobile copy. The sequence must not block page interaction.

Rules:
- localStorage key: `portfolio_pet_intro_seen`. Guard with `typeof window !== 'undefined'` and try/catch.
- Desktop hint: from `petConfig.messages.welcomeHintDesktop` — references "Shift + P".
- Mobile hint: from `petConfig.messages.welcomeHintMobile` — references "the perspective switch up top". No shortcut text on mobile. Ever.
- Breakpoint: `window.matchMedia('(max-width: 767px)')`. The 767 value comes from `petConfig.mobileBreakpointPx`.
- `pet-speech.tsx`: Framer Motion AnimatePresence fade. Shorter width + duration on mobile (config-driven).
- `prefers-reduced-motion`: speech still shows, animations instant.
- Update `PROGRESS.MD` when done.
- Teaching Mode on.
```

---

### PHASE 14.4 PROMPT

```
Implement Phase 14.4 — Event Wiring.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.4.

Goal: Wire pet reactions to real portfolio events: perspective changes, project opens, shortcut use (desktop only), architecture lab visits, telemetry visits.

Rules:
- `PERSPECTIVE_CHANGED`: subscribe to `usePerspectiveStore` in `pet-controller.tsx` — do NOT add a second Zustand store or pub/sub library.
- `SHORTCUT_USED`: First, inspect `src/features/perspective/hooks/use-perspective-shortcut.ts`. If it exposes an observable (counter or event), use that. If not, add a `perspectiveShortcutCount` field to the perspective Zustand store and increment it in the shortcut hook. The pet subscribes to that counter. Do NOT add a second keydown listener for Shift+P in the pet module.
- Mobile shortcut guard: detect `isMobile` via `matchMedia('(max-width: 767px)')` — if mobile, never attach.
- `PROJECT_OPENED`, `ARCHITECTURE_LAB_OPENED`, `TELEMETRY_VIEWED`: add a thin `usePetEvent(eventName)` hook in the relevant page/layout. Show me the files you plan to edit before writing — flag any conflict with existing architecture.
- Probability model: 80% idle, 10% look, 5% walk (desktop only), 5% speech — via `Math.random()` in `pet-controller.tsx`.
- Update `PROGRESS.MD` when done.
- Teaching Mode on.
```

---

### PHASE 14.5 PROMPT

```
Implement Phase 14.5 — Idle, Sleep, Wake.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.5.

Goal: Inactivity detection -> sleep after 60s. Wake on next interaction. Rare idle ambient behaviors.

Rules:
- Attach `mousemove`, `click`, `keydown`, `scroll`, `touchstart` listeners on `window`. Each calls `recordInteraction()` on the pet store.
- Use a resettable `setTimeout` (not `setInterval`) for 60s idle threshold -> sleep.
- On next interaction after sleep -> `wake` state -> short delay -> `idle`.
- Rare idle behaviors: roll every ~15s while idle — 80% nothing, 10% look, 5% walk (desktop-only, gated by `petConfig.mobileWalkEnabled`), 5% idle speech.
- All listeners and timers MUST be cleaned up in `useEffect` return. No memory leaks.
- Update `PROGRESS.MD` when done.
- Teaching Mode on.
```

---

### PHASE 14.6 PROMPT

```
Implement Phase 14.6 — Hide/Disable and Accessibility.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.6.

Goal: Complete hide/disable flow, full ARIA accessibility, reduced-motion compliance, confirm no layout overlap.

Rules:
- `portfolio_pet_disabled` in localStorage. When set, `PortfolioPet` returns null immediately — no listeners, no store, no timers.
- All localStorage calls wrapped in try/catch for private browsing compatibility.
- Re-enable path: decide on UX (footer link, tiny icon, or defer) — explain decision in Teaching Mode.
- Mobile PetMenu: "Hide pet" ONLY. No shortcuts panel. Not on mobile. Not ever.
- ARIA: `aria-label="Portfolio assistant"`, non-trapping, Escape to close menu.
- `prefers-reduced-motion`: all Framer Motion durations -> 0 when active; Rive replaced by SVG stub; walk/bounce disabled; speech still shows.
- Layout overlap audit: render at mobile viewport, inspect pet position against Perspective Toggle, sticky nav, Contact CTA. Adjust if overlap found. Document what you checked.
- Update `PROGRESS.MD` when done.
- Teaching Mode on.
```

---

### PHASE 14.7 PROMPT

```
Implement Phase 14.7 — Polish and Performance Check.

Reference: `docs/16-portfolio-pet-implementation-plan.md` §Phase 14.7.

Goal: Final audit of performance, error handling, and cross-mode correctness. No new features — quality only.

Tasks:
1. Bundle: confirm `@rive-app/react-canvas` loads via `dynamic(() => import(...), { ssr: false })`. Fix if not.
2. Re-renders: add `React.memo` to `PetVisual`, `PetSpeech`, `PetMenu` if they re-render unnecessarily.
3. Listener cleanup: re-audit every `useEffect` in pet module — every listener and timer must have a cleanup return.
4. Error paths: simulate `.riv` 404 (rename file temporarily) — confirm SVG stub shows, no crash. Simulate localStorage blocked — confirm try/catch prevents crash.
5. Run the cross-mode verification matrix from `docs/16-portfolio-pet-implementation-plan.md §Phase 14.7`.
6. Update `docs/15-development-roadmap.md` to mark Phase 14 complete.
7. Update `PROGRESS.MD` with full implementation summary for Phase 14.
Teaching Mode on — include what you tested, what you found, and what you fixed.
```

---

## Definition of Done (Full Feature)

- [ ] Pet renders globally — doesn't obstruct nav, CTAs, or mobile Perspective Toggle.
- [ ] Desktop: welcomes first-time visitors, mentions Shift + P, reacts to perspective/project events and shortcut.
- [ ] Mobile: welcomes first-time visitors, guidance-only copy — no shortcut references, no shortcuts panel.
- [ ] Idle -> sleep -> wake cycle works; rare idle behavior stays rare.
- [ ] Hideable via `portfolio_pet_disabled`; re-enable path exists.
- [ ] Respects `prefers-reduced-motion`.
- [ ] No new state-management library beyond existing Zustand pattern.
- [ ] No shortcut system duplicated — reuses `use-perspective-shortcut.ts`.
- [ ] `.riv` load failure degrades gracefully — no crash.
- [ ] All localStorage calls wrapped in try/catch.
- [ ] `15-development-roadmap.md` and `PROGRESS.MD` updated at each phase.
