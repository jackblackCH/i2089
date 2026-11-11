# PFD run: all pages of i2089.com (2026-11-11)

Perception-First Design v0.7.0, `/perception-first-design:all` (analyze, solve, evaluate).
Pages: `/`, `/ai-solutions`, `/engineering`, `/about`, `/projects`, `/projects/branded-goods`, `/projects/air-up`, `/projects/talentir`.
Skipped: `/services` (redirect only), `/proto` (unfinished prototype, not in git).
Baseline commit: `01eff2d`. Screenshots: `before/` and `after/`. Measured evidence: `evidence-before.json`, `evidence-after.json`. Fix mock-ups: `fixes.html`.

**Result: site score 59 → 75.** See [After the fixes](#after-the-fixes-branch-pfd-fixes).

## Baseline scores (the "before" to beat)

| Page | L0 | L1 | L2 | L3 | L4 | Overall |
|---|---|---|---|---|---|---|
| `/` | 80 | 55 | 80 | 30 | 30 | **57** |
| `/ai-solutions` | 78 | 55 | 75 | 30 | 35 | **57** |
| `/engineering` | 78 | 60 | 82 | 45 | 35 | **62** |
| `/about` | 76 | 65 | 82 | 60 | 40 | **66** |
| `/projects` | 82 | 70 | 76 | 50 | 50 | **67** |
| `/projects/*` (×3) | 76 | 65 | 80 | 45 | 45 | **63** |
| **Site** | **78** | **55** | **80** | **38** | **35** | **59** |

Overall = (L0 × 1.5 + L1 + L2 + L3 + L4) / 5.5. No dependency caps applied.

*Correction (2026-11-12): the first run said 60. The formula gives (117 + 55 + 80 + 38 + 35) / 5.5 = 59.1, so 59.*

---

## Analyze (descriptive)

**Question:** What happens in a buyer's mind as they move through i2089.com as it is today?
5 layer-cascade consequences, 3 integrative compounds.

### 1. Spare capacity, spent on motion [L0]
*The pages ask very little, but the home page keeps moving.*

Each page has 4 to 7 interactive elements and one font family. A visitor has a lot of working memory to spare. On home, two bands erase and retype after 4.2 s, the moment the visitor starts to read them. For about 600 ms per cycle, a link has no text. Reduced-motion and screen-reader users get a stable label. Visitors who click during an erase hit a shrinking target. Mobile body text is 13 px. The first 4 s are calm; then the motion repeats every 10 s. Trade-off: the motion pulls the eye to the offer, and it takes attention from the reading it invites.

**What happens:** Most visitors parse home in under 5 seconds with capacity to spare. On mobile subpages the wordmark row takes 31 % of the first screen, so the first screen shows little content.

**Citations:** Cowan (2010) for the 3–5 chunk limit; Hassin et al. (2009) for attention used by unwatched motion.

### 2. Premium verdict, unclear identity [L1]
*People see "expensive and well made" before "who" and "what".*

In 50 ms: dark surface, one extended grotesk, lots of space. Verdict: competent, design-literate. The largest element is "i2089" at 130 px, a code name with no meaning. Marc's name is 11 px tracked capitals. Design-literate buyers read "craft". Corporate CTOs often read "design studio", not "engineer who coaches teams in AI". Studio portfolios with code-name marks set that expectation. Right away: positive halo. Days later: "i2089" is hard to recall; "Marc Illien" sticks better. Trade-off: the abstract mark raises the premium signal and lowers recall.

**What happens:** Visitors pass the gate and stay. Most leave home with "quality frontend studio" in memory. "AI coaching for dev teams" mostly does not stick.

**Citations:** Lindgaard et al. (2006) for the 50 ms verdict; Kurosu & Kashimura (1995) for the beauty halo.

### 3. The design speaks quietly, the AI page speaks loudly [L2]
*The look is calm and exact; the AI copy sounds like a pitch.*

Visual voice: one font, one hue, strict spacing. Verbal voice on `/ai-solutions`: "skips the slop", "backlog melts", "Boring tickets are yesterday", "up to 50x". `/engineering` and `/about` are calm and factual. Fluent design makes every sentence feel more true, the multipliers too. Managers may accept the numbers; engineers distrust "10x" and switch to their marketing filter. On the first read it feels fluent; on a second visit or a LinkedIn comparison, the clash shows. Trade-off: fluency builds trust and lends trust to unsupported claims.

**What happens:** Engineers read the AI page as sales while the design still reads as craft. The split costs the lead offer most.

**Citations:** Reber & Schwarz (1999) for fluency and perceived truth; Alter & Oppenheimer (2009) for fluency below awareness.

### 4. The proof belongs to the second offer [L3]
*AI leads, but all evidence is frontend work.*

Home puts AI first. Evidence: AXA, air up®, Talentir, Branded Goods, OST, all frontend. No AI client, case or number. A visitor to a consultant site expects names and cases; the gap draws attention. An engineering lead who wants to pitch Marc to a CTO finds nothing to quote. "AI coaching" offers in 2024–2026 often claim "10x", so buyers start skeptical, and unsupported multipliers confirm it. Trade-off: the `/about` timeline (AXA, OST since 2014) gives strong personal authority that lends some weight to the AI claims.

**What happens:** Visitors believe Marc can build frontends. They doubt he can change how a team works with AI. The AI offer converts mainly with people who already know him.

**Citations:** Clark (2013) for the expectation gap; Cialdini (2001) for social proof and authority; Seckler et al. (2015) for trust as a perceptual result.

### 5. The trail ends at the foot of the page [L4]
*A visitor from search sees no next step.*

Nav: Projects, About. Offer pages are linked only from the home bands. Contact: one 13 px `mailto` link at the column foot, below the fold on desktop, 9 px tap height on mobile. Home has no contact. `mailto` often opens nothing on corporate laptops with webmail. Email-only contact works for warm referral traffic. Cold visitors from the SEO titles land on `/ai-solutions` with no visible next step and no link to the other offer. Trade-off: no pressure fits the premium position and passes the Golden Rule test, and cold traffic leaks.

**What happens:** The site works as a confirmation step for referrals and fails as a first contact for search traffic.

**Citations:** Pirolli & Card (1999) for information scent; Green & Swets (1966) for signal detection; Thaler & Sunstein (2008) for choice architecture.

### A. The forwarding test [Cross-layer + Social Aggregation]
*A forwarded AI page arms the skeptic.*

An engineering lead sends `/ai-solutions` to a manager, who sees polish, multipliers and no names. In a committee, the skeptic quotes "up to 50x" back as the weak point.

**What happens:** The page helps a champion who already believes and arms the doubters.

**Citations:** Applied prediction; closest adjacent: Learning #19 (relay users).

### B. The fluency trap [Cross-layer L2 × L3]
*The better the surface, the harder an unproven claim falls.*

Polish raises the weight of the numbers. When a buyer checks one and it fails, trust drops further than on a plain site, and it returns slowly.

**Citations:** Reber & Schwarz (1999); PFD fluency-trap detection.

### C. Claims without the design around them [Cross-layer + Ecosystem Cascade]
*Snippets and LLM answers show the claim bare.*

Meta descriptions and JSON-LD repeat "10x faster". Snippets and LLM answers quote it without the calm design. The 7 subpages have no `og:image`, so links pasted in Slack or Teams show as bare text.

**Citations:** Applied prediction; closest adjacent: Fogg (2003).

---

## Solve (prescriptive)

**Problem:** A CTO, engineering manager or tech lead in Switzerland wants help to make the team faster with AI, or needs a senior frontend engineer. They arrive from search, LinkedIn or a referral. In one visit they must decide: is Marc credible, and is it safe to contact him? Blockers: proof covers the second offer only; the next step is hidden; the code name comes before the person.

- **R1 (L0):** Each view must hold 4 chunks or fewer. Nothing the visitor must click may move or change while they read. Violation: typewriter erases link text; the mobile wordmark row takes 31–38 % of the first screen. *Citations: Cowan (2010); Hassin et al. (2009).*
- **R2 (L1):** The first screen of every entry page must show who (a person), what (an outcome for a dev team), and that a next step exists. Violation: "i2089" is largest, the name is 11 px, home has no next step. *Citations: Lindgaard et al. (2006); Fogg (2003).*
- **R3 (L2):** The words must be as calm and exact as the type. Violation: "backlog melts", "skips the slop", "up to 50x". *Citations: Reber & Schwarz (1999); Alter & Oppenheimer (2009).*
- **R4 (L3):** Every outcome claim must have a checkable referent (named client, measured metric, or a method with a set end). The lead offer must have at least one. Violation: no AI evidence; unsourced multipliers. *Citations: Cialdini (2001); Learning #23 (falsifiability triad).*
- **R5 (L4):** Every page must give one step to contact and one to each offer, with a concrete near-term label and no pressure. Violation: nav lacks offer pages; contact is a 13 px `mailto` below the fold; home has none. *Citations: Pirolli & Card (1999); Trope & Liberman (2010).*

**Solution: a quiet column of evidence**
1. Keep the "i2089" mark. Under it, "Marc Illien · AI coaching & frontend engineering, Zürich" at a readable size. (R2)
2. Home bands: static, one label each, with an arrow. One quiet primary action: "Book a 30-min intro call". (R1, R2, R5)
3. Nav: AI coaching · Engineering · Projects · About. (R5)
4. `/ai-solutions`: replace the multipliers with one real, checkable AI result, a "How we start" method (2-week pilot, lead time measured before and after), and a client line that links each name to its case. (R3, R4)
5. Each project page: one outcome line (the `TODO(marc)` in `content.ts`). (R4)
6. Mobile subpages: a lower wordmark row. (R1)

**Alternatives:** a testimonial carousel fails R1; a contact form adds fields and fails R1; putting frontend first until AI proof exists meets R4 cheaply but works against the business goal (valid fallback); the heuristic's filled-button fix meets R5 if used once per view.

**Hard fail:** R4 is a content gap, not a design gap. Without a real AI result, the pilot method reaches only 2 of 3 points of the falsifiability triad: honest, but not proof.

---

## Evaluate (rated)

### Context discovery
- **Audience:** CTOs, engineering managers and tech leads at Swiss startups, SMEs and corporates. Technical, skeptical, often relay users.
- **Intent:** Trust Marc's craft and judgment, then write to him.
- **Positioning:** Premium solo senior consultant. A quiet funnel is a valid choice.
- **Business model:** Service work, day rate or retainer.
- **What works:** one family, one hue, strict spacing; very low element counts; real client screenshots; concrete career facts on `/about`; good a11y details (sr-only labels, `aria-current`, reduced motion).
- **Meta level:** The site is a sample of the frontend craft it sells. Execution is a primary trust signal and works in its favour.

### Design system detection
Tailwind v4 plus custom CSS (`shared.css`, `playground.css`). Confidence 85. No component library. About 21 % bracket classes: mixed setup, so the stricter Tailwind severities do not apply.

### Foundation (L0): 78 (pass)
- V-F-001 minor: mobile wordmark row takes 31–38 % of the first screen (`app/_shared/frame.tsx:25`). Cowan (2010).
- V-F-002 minor: typewriter moves link text every 10 s (`app/_shared/type-cycle.tsx`). Practitioner observation, adjacent to Cowan (2010).
- V-F-003 minor: mobile body 13 px; `mailto` and external links have a 9 px tap height and no `hit-area`.
- Strengths: 4–7 interactive elements per page; one family; ≤196 words per page; correct viewport.

### Layer 1, first impression: 55 (fail)
- V-L1-001 major: the code name dominates; the offer is categories ("Consulting"), not an outcome. Lindgaard (2006).
- V-L1-002 major: home has no next step; elsewhere the contact is below the fold.
- V-L1-003 major: no trust signal on entry pages; AXA only in prose. Fogg (2003).
- Strengths: craft matches the premium position; real, sharp screenshots; no stock imagery.

### Layer 2, processing fluency: 80 (pass)
- V-L2-001 minor: verbal voice on `/ai-solutions` does not match the visual voice. Reber & Schwarz (1999).
- V-L2-002 minor, accidental: `font-medium` (500) is set on titles (`app/_shared/text.tsx:13`), but only 400 and 700 are loaded, so titles render at 400.
- V-L2-003 minor: near-miss colours. Card text `#fff` vs `--np-fg` rgb(231,233,239), ΔE 5.4 (`app/_shared/projects-list.tsx:42`). Selection `#ededed`, ΔE 3.2. Bujack et al. (2022).
- V-L2-004 minor: five off-scale spacing values (`gap-4`, `gap-x-[1.6em]`, `gap-x-[0.5em]`, `mt-[1.6em]`, `pl-[1.4em]`).
- Strengths: one family and one hue family; all contrast passes AA (worst 6.2:1); a 3-step vertical rhythm; one link style per role.
- Intentional, not scored: tracked uppercase labels; dark minimal look.

### Layer 3, perception bias: 38 (fail)
- V-L3-001 major: no social proof on `/ai-solutions` or `/engineering`. Cialdini (2001).
- V-L3-002 major: unfalsifiable claims ("10x", "up to 50x", "5x to 10x", "ship in a day"). With the high L2 score: **fluency-trap ethics flag**. Reber & Schwarz (1999).
- V-L3-003 major: the lead offer has no evidence. Clark (2013).
- V-L3-004 minor: project highlights have no outcomes.
- Strengths: concrete, dated facts on `/about`; a named axa.ch product on `/engineering`; no fake urgency.

### Layer 4, decision architecture: 35 (fail)
- V-L4-001 major: home has no contact path.
- V-L4-002 major: contact is a 13 px `mailto` below the fold with the weak label "Let's talk". Rule L4-CT-001 says critical; lowered to major because a quiet funnel is intentional for a premium practitioner (template Step 0c). Green & Swets (1966).
- V-L4-003 major: the nav has no offer pages. Pirolli & Card (1999).
- V-L4-004 minor: project pages end with an outbound link and no path back to the offers.
- Strengths: "← All projects" back link; `aria-current`; no outbound links on offer pages; no dark patterns. Alignment and Golden Rule pass; Sincerity at risk from V-L3-002.

### Cross-layer patterns
- Fluency trap (L2 × L3), see compound B.
- Experiential self-contradiction (Learning #15): `content.ts` says the copy is "concrete and checkable, no sales adjectives"; the AI page breaks that rule.

### Overall: 59/100
Excellent craft and very low load. Visitors trust the craft, then find no proof for the lead offer and no visible next step.

### Top 3 fixes (see `fixes.html`)
1. **One visible next step on every page:** offer pages in the nav; one intro-call action under the H1 on service pages and on home. L4 35 → ~58, L1 +5.
2. **Claims a buyer can check:** replace the multipliers with one named result or a pilot method; add a linked client line. L3 38 → ~62, ethics flag cleared.
3. **The offer wins the first 50 ms:** name and offer at a readable size, static bands, lower mobile wordmark row. L1 55 → ~70, L0 +3.

Quick wins: load the 500 weight or drop `font-medium` (`app/_shared/text.tsx:13`); `text-white` → `text-(--np-fg)` (`app/_shared/projects-list.tsx:42`); `hit-area` on the `mailto` and external links; `og:image` for subpages.

### Dependency notes
No caps: L0 78, L1 55, both ≥ 40. No critical violation after lowering L4-CT-001. Scores spread 35–80.

---

## Heuristic rule pass (Tier 1) — failed rules

| Rule | Severity (YAML) | Pages | Evidence |
|---|---|---|---|
| L4-CT-001 CTA clarity | critical (lowered to major, see L4) | `/ai-solutions`, `/engineering` | No button CTA; "Let's talk." is a `<p>`; `mailto` link 127×13 px |
| L1-FI-002 CTA above fold | high | all | Home has no contact; `mailto` at y≈936 desktop |
| L2-TC-002 near-miss colour | high | `/projects`, all (selection) | `#fff` vs `--np-fg` ΔE 5.4; `#ededed` ΔE 3.2; `--color-frame` vs `--color-ink` ΔE 2.5 |
| L3-SP-001 social proof | high | `/ai-solutions`, `/engineering` | No logos, testimonials or case links |
| L1-TS-001 trust signal | medium → high (B2B) | all | Clients only in prose on `/about`, `/engineering` |
| F-CL-004 above-fold density | medium | mobile, all | Home 6 blocks; detail pages 5 (limit 4) |

## Measured facts
- Font: Helvetica Neue LT Pro Extended, 400 and 700, inlined (48.9 KB). ThEx/LtEx/BlkEx files in `app/fonts/` are unused.
- Sizes desktop: 11.1 / 11.5 / 17.6 / 44 / 129.6 px. Mobile: 9 / 11 / 13 / 30 / 72 px.
- Contrast on surface rgb(4,5,7): fg 16.8:1, mute 9.4:1, link hover 6.2:1.
- Interactive elements: `/` 4, `/ai-solutions` 4, `/engineering` 4, `/about` 5, `/projects` 7, details 6.
- Headings: content pages have only an h1; term labels and card titles are spans.
- `og:image` only on home.

---

## After the fixes (branch `pfd-fixes`)

Scored with the same rubric. Evidence measured with the same script for before and after (Puppeteer, desktop 1440×900, mobile 390×844 @2x, reduced motion).

### Scores

| Page | L0 | L1 | L2 | L3 | L4 | Overall |
|---|---|---|---|---|---|---|
| `/` | 80 → 84 | 55 → 70 | 80 → 85 | 30 → 55 | 30 → 68 | **57 → 73** |
| `/ai-solutions` | 78 → 84 | 55 → 72 | 75 → 85 | 30 → 48 | 35 → 76 | **57 → 74** |
| `/engineering` | 78 → 84 | 60 → 74 | 82 → 86 | 45 → 62 | 35 → 76 | **62 → 77** |
| `/about` | 76 → 82 | 65 → 76 | 82 → 86 | 60 → 68 | 40 → 76 | **66 → 78** |
| `/projects` | 82 → 84 | 70 → 78 | 76 → 82 | 50 → 62 | 50 → 76 | **67 → 77** |
| `/projects/axa` (new) | 82 | 72 | 84 | 56 | 74 | **74** |
| `/projects/*` (×3) | 76 → 82 | 65 → 72 | 80 → 84 | 45 → 52 | 45 → 74 | **63 → 74** |
| **Site** | **78 → 84** | **55 → 72** | **80 → 85** | **38 → 58** | **35 → 74** | **59 → 75** |

No caps. Spread 58–85. The weakest layer is still L3, because the lead offer has no measured result yet.

### Evidence (measured)

| Fix | Before | After |
|---|---|---|
| Contact on subpages (desktop) | text link, 13 px tall, y 791–1372 px (below the fold on 6 of 7 subpages) | filled button, 45 px tall, y 203–249 px (in the first screen on every subpage) |
| Contact on home | none | filled button, y 727 px desktop; y 938 px mobile (below the first screen) |
| Offer pages in the nav | 0 | 2 (AI coaching, Engineering) |
| Multipliers in visible copy | 1–5 per page ("10x", "50x", "5x to 10x") | 0, also in meta descriptions |
| Name size | 11.1 px desktop, 9 px mobile, tracked caps | 17.6 px desktop, 15 px mobile home |
| Home bands | text changes within 6 s (typewriter) | static |
| Client line | none | 5 names, each linked to its proof, on home, `/ai-solutions`, `/engineering` |
| AXA case | hidden (404) | `/projects/axa` |
| Mobile body text | 13 px | 15 px |
| Smallest tap target | 9 px (mobile) | 24 px (mobile), 25 px (desktop) |
| Title weight | `500` requested, only 400/700 loaded | `400`, as rendered |
| Card text colour | `#fff` (ΔE 5.4 off `--np-fg`) | `--np-fg` |
| Selection colour | `#ededed` / `#222` (near-misses) | `--np-fg` / `--np-surface` |
| Share image on subpages | none | all 9 pages |
| Mobile subpage first row | 210 px | 150 px |

### Decisions

- **Voice skill vs analysis:** where `swiss-engineer-voice` conflicts with the analysis, the analysis wins. Clients are named and linked (the skill bans naming corporate clients); no "slop" wording (R3).
- **R1 vs R2 on mobile subpages:** the byline does not fit a compact first row. PFD rule: the lower layer wins, so mobile subpages hide the byline and the title says "what". Home and desktop keep it.
- **Sincerity:** on `/ai-solutions` the client line says "Engineering clients", since none of them is an AI engagement.
- **Mobile home:** the contact sits below the first screen. The two band links are the first-screen next steps.

### Still open (needs Marc)

- The measured AI result (Swiss SME, tickets per sprint): `TODO(marc)` in `app/_shared/content.ts`. Until then R4 is a hard fail for the lead offer.
- One outcome line per project (Branded Goods, air up®, Talentir, AXA): `TODO(marc)` in `content.ts`.
- Calendar link ("or pick a time"): `TODO(marc)` in `app/_shared/contact.tsx`.
- Own-work links (OST course page, talks or posts, repos).

### How to compare live

The branch has a **Before / After** switch, bottom right, with a **Scores** panel (keys `b` and `s`). It shows only on localhost and Vercel previews, never on i2089.com. "Before" lays the same path from the old build over the page.

- On a Vercel preview, "Before" is the live i2089.com.
- On localhost, "Before" is a worktree at `01eff2d` on port 2223:

```sh
git worktree add --detach ../i2089-before 01eff2d
cp -cR node_modules ../i2089-before/
(cd ../i2089-before && npx next dev --port 2223) &
npm run dev   # http://localhost:2222
```

Remove `app/_compare/` and its two lines in `app/layout.tsx` after merge.

### Screenshots

| Page | Before | After |
|---|---|---|
| `/` desktop | ![before](before/desktop_home.jpg) | ![after](after/desktop_home.jpg) |
| `/` mobile | ![before](before/mobile_home.jpg) | ![after](after/mobile_home.jpg) |
| `/ai-solutions` desktop | ![before](before/desktop_ai-solutions.jpg) | ![after](after/desktop_ai-solutions.jpg) |
| `/ai-solutions` mobile | ![before](before/mobile_ai-solutions.jpg) | ![after](after/mobile_ai-solutions.jpg) |
| `/engineering` desktop | ![before](before/desktop_engineering.jpg) | ![after](after/desktop_engineering.jpg) |
| `/engineering` mobile | ![before](before/mobile_engineering.jpg) | ![after](after/mobile_engineering.jpg) |
| `/about` desktop | ![before](before/desktop_about.jpg) | ![after](after/desktop_about.jpg) |
| `/about` mobile | ![before](before/mobile_about.jpg) | ![after](after/mobile_about.jpg) |
| `/projects` desktop | ![before](before/desktop_projects.jpg) | ![after](after/desktop_projects.jpg) |
| `/projects` mobile | ![before](before/mobile_projects.jpg) | ![after](after/mobile_projects.jpg) |
| `/projects/axa` desktop | *new page* | ![after](after/desktop_projects_axa.jpg) |
| `/projects/axa` mobile | *new page* | ![after](after/mobile_projects_axa.jpg) |
| `/projects/branded-goods` desktop | ![before](before/desktop_projects_branded-goods.jpg) | ![after](after/desktop_projects_branded-goods.jpg) |
| `/projects/branded-goods` mobile | ![before](before/mobile_projects_branded-goods.jpg) | ![after](after/mobile_projects_branded-goods.jpg) |
| `/projects/air-up` desktop | ![before](before/desktop_projects_air-up.jpg) | ![after](after/desktop_projects_air-up.jpg) |
| `/projects/air-up` mobile | ![before](before/mobile_projects_air-up.jpg) | ![after](after/mobile_projects_air-up.jpg) |
| `/projects/talentir` desktop | ![before](before/desktop_projects_talentir.jpg) | ![after](after/desktop_projects_talentir.jpg) |
| `/projects/talentir` mobile | ![before](before/mobile_projects_talentir.jpg) | ![after](after/mobile_projects_talentir.jpg) |
