# Entry Sketch: Khmer Kinship Terms Archive

This file defines the **content model**: the fields every kinship-term entry
needs, and the entries gathered so far. Read this before touching the code
in `components/entrycard/` — the components are a direct rendering of the
shape described here.

This is the *content* shape only. Account/ownership/review fields
(`owner_id`, `status`, `reviewed_by`, `submitted_at`, `published_at`) are
app-managed and get added when the database is built in Sprint 1.

## The pitch, and why the schema looks like this

An archive of Khmer kinship terms, sourced from real interviews, showing
**how each word is actually used by three different generations** — someone
of grandparent age, someone of parent age, and someone the contributor's own
age — so a visitor can see a term's usage change (or not) across generations
instead of just being told it's "declining."

That's why there's no single `usage_status_today` or `generational_note`
field anymore. Every term carries **three separate, sourced answers**, one
per age cohort, under `generations`. The UI (`GenerationExplorer.js`) lets
a visitor click between them and watch the status bar and text change —
see "How this maps to the code" at the bottom.

**Important: age cohort ≠ family role.** "Elder," "middle," and "peer" mean
*someone of roughly that age*, not literally your grandparent, parent, or
cousin. A neighbor, a family friend, a monk, or a willing stranger of the
right age group is a completely valid source — they just need to be
credited accurately and have agreed to it, same as anyone else in this
archive.

---

## Two files, two jobs

- **`sources.config.js`** (repo root) — your three standing interview
  sources, one per age cohort: name, relation to you, location, interview
  date, and whether they've agreed to be named/quoted (`consentToCredit`).
- **`entry-sketch.md`** (this file) — the terms themselves. Each entry's
  `generations` block holds what that cohort said *about this specific
  term*, and normally doesn't repeat who the source is — it's assumed to be
  whoever is in `sources.config.js`, unless overridden (see below).

If you interview one specific person for one specific term who isn't one of
your three standing sources (e.g. you happened to ask a shopkeeper about
one particular word), add a `generations.<cohort>.source_override` on that
entry instead of changing `sources.config.js`.

---

## Field reference

### Entry-level required fields

| Field | Type | Description | Example |
|---|---|---|---|
| `id` | slug | Short unique identifier, lowercase, hyphenated | `bong-srey` |
| `term_khmer` | text | The term in Khmer script | បងស្រី |
| `term_romanized` | text | Latin transliteration, so it's searchable without Khmer script | Bong Srey |
| `category` | enum | See controlled vocabulary below | Same generation |
| `relation_described` | text | Plain-language relationship this term names — phrase it so age/gender/side are implied, e.g. "father's younger brother," not just "uncle" | Older sister, or an older female cousin addressed the same way |
| `also_used_for_non_relatives` | bool + note | Whether this term is also used to politely address strangers/acquaintances by perceived age | Yes — used for any woman a bit older than you, related or not |
| `usage_notes` | text | The *general* meaning/usage, true across generations — generation-specific differences go in `generations`, not here | Said directly before the person's name; never used toward someone younger than the speaker |
| `tags` | list | Freeform keywords for search/browse | sibling, elder-address, common |
| `photo_caption` | text | What the photo shows (never an identifiable person — see photo policy below) | A village home near the river, Battambang |
| `photo_credit` | text | Who took/owns the photo | Photo by contributor |
| `photo_url` | text | Path/URL to the actual image file, e.g. `/photos/pou-fishing-spot.jpg` once saved under `public/photos/` | `/photos/bong-village.jpg` |
| `generations.elder.still_used` | enum | See controlled vocabulary below | Same |
| `generations.elder.note` | text | What this source actually said about this word | "I've used this my whole life for anyone older, related or not." |
| `generations.middle.still_used` | enum | — | Same |
| `generations.middle.note` | text | — | — |
| `generations.peer.still_used` | enum | — | Changed |
| `generations.peer.note` | text | — | — |

### Optional fields

| Field | Type | Description | Keep if... |
|---|---|---|---|
| `pronunciation` | text | Short phonetic guide (not audio — see note below) | Easy to add, low cost either way |
| `region_or_family_variation` | text | Note when another province or family uses a different word or usage rule for the *same* relationship | You're interviewing sources from more than one province/family |
| `example_sentence_khmer` / `example_sentence_translation` | text | A real sentence using the term, + translation | You have time for polish |
| `generations.<cohort>.alternate_term` | text | The different word this cohort uses instead, if `still_used` is "Replaced" | Only when relevant |
| `generations.<cohort>.source_override` | text | Short description of who answered for this *specific* term, if not your standing source for that cohort, e.g. "Neighbor, elder-age, interviewed at the market — consent: yes" | Only when this term's source differs from `sources.config.js` |

### Controlled vocabulary — `category`

Pick one per entry:
- Grandparents' generation
- Parents' generation (parents & their siblings, parents-in-law)
- Same generation (siblings, cousins, siblings-in-law)
- Children's & grandchildren's generation
- Non-relative honorific (a kin term used to address people you're not related to)

### Controlled vocabulary — `generations.<cohort>.still_used`

Exactly one of these four, spelled exactly like this (the code matches on
these strings):
- **Same** — used the same way this entry describes
- **Changed** — still used, but the meaning or context has shifted (explain how, in `note`)
- **Replaced** — this cohort uses a *different word* for the same relationship (put that word in `alternate_term`)
- **Unused** — this cohort doesn't really use it / isn't familiar with it

### Deliberately cut — fold into `relation_described` / `usage_notes` instead

`side_of_family`, `relative_age`, `gender`, `term_of_reference`, `formality`
were considered and dropped as separate structured fields. Central Khmer
often doesn't distinguish maternal/paternal for aunts/uncles at all, and
age/gender are usually already implied by `relation_described`. **Don't add
these back as component props or dropdowns** — if something feels lost, it
almost always fits as a sentence inside `usage_notes` instead.

**Audio pronunciation is not in this schema yet.** Worth recording now for
your own safekeeping, but it needs its own upload pipeline and its own
explicit voice-recording consent, so it goes through instructor approval as
a named stretch feature before it becomes a real field here.

---

## Two-source pattern: what if you can't find someone of grandparent age?

If a genuine elder-generation source isn't reachable for a given term,
parent-generation + peer-generation is an acceptable fallback for that
entry — just don't silently drop the `elder` block. `still_used: "Unused"`
isn't right either (that means "asked, and they don't use it"). Leave
`note` explicit instead, e.g. "No elder-generation source available for
this term," so a reader can tell "asked and got an answer" apart from
"wasn't asked." Confirm with your instructor if more than a couple of
entries end up this way.

---

### Photo policy

Every entry needs a real photo (skeleton requirement), but this archive
**never photographs identifiable people** — no portraits, ever, by default.
Photos are of a place, an object, or the script itself: a village, a
fishing spot mentioned in an interview, a written word, a family kitchen.
This is why there's no per-source photo-consent field in
`sources.config.js` — the question doesn't come up under this policy.
`consentToCredit` (being named and quoted) is the only per-source consent
this archive tracks. If a future source ever *offers* a portrait, that's a
one-off exception worth a direct conversation, not something to build a
recurring field around.

---

## Using `region_or_family_variation` (e.g. parents from different provinces)

Two patterns, pick per term:

- **Same word, different nuance/pronunciation** → one entry, note the
  difference in `region_or_family_variation`.
- **Genuinely different words for the same relationship** → **two separate
  entries**, one sourced from each parent (own photo, and a
  `generations.<cohort>.source_override` naming which parent if they're not
  your standing source for that cohort), sharing a common tag so search
  surfaces both together.

---

## Sample entry (illustration only — NOT one of your 5 real gathered entries)
```
id: bong-srey
term_khmer: បងស្រី
term_romanized: Bong Srey
pronunciation: bong srey
category: Same generation
relation_described: Older sister, or an older female cousin addressed the same way
also_used_for_non_relatives: Yes — commonly used for any woman somewhat older than the speaker, related or not
usage_notes: Said directly before the person's name; a younger sibling or cousin would never use this toward someone younger than themselves
region_or_family_variation: [TO FILL FROM INTERVIEW]
example_sentence_khmer: [OPTIONAL]
example_sentence_translation: [OPTIONAL]
tags: sibling, elder-address, common
photo_url: [REPLACE]
photo_caption: [REPLACE]
photo_credit: [REPLACE]

generations.elder.still_used: Same
generations.elder.note: [TO FILL FROM INTERVIEW]

generations.middle.still_used: Same
generations.middle.note: [TO FILL FROM INTERVIEW]

generations.peer.still_used: Changed
generations.peer.alternate_term: (leave blank unless status is Replaced)
generations.peer.note: [TO FILL FROM INTERVIEW]
generations.peer.source_override: (leave blank to credit the standing peer source in sources.config.js)
```


---

## Entries — real interview data (Sept 2, 2026; sources named in `sources.config.js`)

### Entry 1
```
id: bong
term_khmer: បង
term_romanized: Bong
pronunciation: bong
category: Same generation
relation_described: Generic term for an older sibling or older cousin (gender-neutral; can be specified as Bong Proh for male or Bong Srey for female)
also_used_for_non_relatives: Yes, one of the most common polite ways to address anyone perceived as somewhat older than you, related or not
usage_notes: Placed directly before a name, or used alone as direct address; never used toward someone younger than the speaker
region_or_family_variation:
tags: sibling, elder-address, common, gender-neutral
photo_url: /photos/bong.png
photo_caption: "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script"
photo_credit: ChatGPT, 2024-06-05, generated image

generations.elder.still_used: Same
generations.elder.note: Uses Bong daily for anyone older in her age-group — older siblings, cousins, or close neighbors — and traditionally for a husband, as a normal term of closeness and respect for a Khmer wife. Says the word "never go out of style" across her lifetime; the only change she's seen is couples now texting "Bong"/"Oun" on Facebook instead of writing letters.

generations.middle.still_used: Same
generations.middle.note: Uses Bong the same way she always has, for people older than her but not parent-age, including her husband when being affectionate. Noticeably more selective than younger generations: "we used it mostly for people we actually knew or were related to. Strangers we were more shy to call bong right away."

generations.peer.still_used: Changed
generations.peer.alternate_term:
generations.peer.note: Uses Bong constantly, but much more broadly than the traditional definition — defaults to it for anyone who seems older even if she doesn't know them, including tuk-tuk drivers, coworkers, and strangers on Facebook Marketplace ("if I'm not sure how old someone is... I just default to bong, it's safer"). Also uses it as a romantic term regardless of actual age difference.
```


### Entry 2
```
id: oun
term_khmer: អូន
term_romanized: Oun
pronunciation: oun
category: Same generation
relation_described: Generic term for a younger sibling or younger cousin; also widely used as an affectionate term between romantic partners regardless of relation
also_used_for_non_relatives: Yes, used for anyone perceived younger, and notably as a term of endearment between partners
usage_notes: Used as direct address or before a name; the romantic-partner usage is a separate, very common register from the sibling usage
region_or_family_variation:
tags: sibling, younger-address, common, romantic-usage
photo_url: /photos/oun.png
photo_caption: "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script"
photo_credit: ChatGPT, 2024-06-05, generated image

generations.elder.still_used: Same
generations.elder.note: Uses Oun the same way throughout her life, for anyone younger in her circle — younger siblings, cousins, neighbors, or her household helper — and as an affectionate term for a younger husband. Says this hasn't changed, "only now they do it through Facebook message instead of letter."

generations.middle.still_used: Same
generations.middle.note: Uses Oun consistently for people younger than her that she's close to — siblings, cousins, and sometimes her husband playfully. Notes younger generations now extend it to people met only online, which she doesn't do herself: "for me, still just for people close to me, younger than me."

generations.peer.still_used: Changed
generations.peer.alternate_term:
generations.peer.note: Uses Oun often, and more broadly than the traditional in-group definition — for younger cousins, coworkers, and even a friendly stranger's teenager. Says she personally uses it more now that she's older and has more people younger than her around; no alternate word is replacing it for her generation.
```

### Entry 3
```
id: ming
term_khmer: មីង
term_romanized: Ming
pronunciation: ming
category: Parents' generation
relation_described: Father's or mother's younger sister; Central Khmer usage typically doesn't distinguish which parent's side
also_used_for_non_relatives: Yes, a common, polite way to address a woman roughly a parent's age or a bit younger
usage_notes: Used as direct address, often before a first name; considered warm/respectful rather than overly formal
region_or_family_variation:
tags: aunt, parents-generation, non-relative-address
photo_url: /photos/ming.png
photo_caption: "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script"
photo_credit: ChatGPT, 2024-06-05, generated image

generations.elder.still_used: Same
generations.elder.note: Still correctly uses Ming for her mother's or father's younger sister, or any woman roughly her parents' age. Observes — without it affecting her own usage — that some younger people now mix up Ming and Om, default to English "Aunty," or just say "Bong" to avoid judging someone's age.

generations.middle.still_used: Same
generations.middle.note: Uses Ming the same way she was taught, for a woman younger than her mother's generation but older than herself, related or not. Has noticed younger people sometimes "guess, sometimes wrong" when distinguishing Ming from Om, since they don't judge age as carefully as her generation did.

generations.peer.still_used: Same
generations.peer.alternate_term:
generations.peer.note: Uses Ming exactly the way her mother does, for a woman around her parents' age but younger than "Om" age, related or not. Hasn't noticed her own age group replacing it with anything else, though she says some younger kids are inconsistent and just default to "Bong" for everyone — "which honestly annoys the older ming's a little bit."
```


### Entry 4
```
id: pou
term_khmer: ពូ
term_romanized: Pou
pronunciation: pou
category: Parents' generation
relation_described: Father's or mother's younger brother
also_used_for_non_relatives: Yes, commonly used to address a man somewhat younger than one's parents, e.g. a shopkeeper or driver
usage_notes: Used as direct address, often before a name; carries a friendly, respectful tone
region_or_family_variation: Some in the city now use the more formal "Lok Pou" instead of plain "Pou" (per Mom, from Kampong Chhnang, contrasting her own village usage). Separately, some Khmer-Chinese families use different aunt/uncle terms entirely at home (per Sister, Phnom Penh) — framed by her as a family/ethnic variation, not a generational shift.
tags: uncle, parents-generation, non-relative-address, region-variation
photo_url: /photos/pou.png
photo_caption: "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script"
photo_credit: ChatGPT, 2024-06-05, generated image

generations.elder.still_used: Same
generations.elder.note: Still uses Pou for her father's or mother's younger brother, or any man in that generation, related or not — credits her own Pou with teaching her to fish as a child. Says the word itself is "still strong," though she's noticed some younger people default to "Bong" for adult men rather than judging their age.

generations.middle.still_used: Same
generations.middle.note: Uses Pou unchanged since childhood, for a father's or mother's younger brother or any man around that age, related or not, including strangers like a local moto-repair man. Notes a regional/formality difference rather than a generational one: "in the city I hear some people use lok bpou or just skip straight to more formal words, but here in the province we still just say plain pou."

generations.peer.still_used: Same
generations.peer.alternate_term:
generations.peer.note: Uses Pou the same way she was taught, and explicitly doesn't think it's changed generationally for her: "it hasn't changed much for me." Notes some Khmer-Chinese families use different uncle/aunt terms at home entirely, but frames that as a family/ethnic variation, not something her generation changed.
```


### Entry 5
```
id: om
term_khmer: អ៊ំ
term_romanized: Om
pronunciation: om
category: Parents' generation
relation_described: Parent's older sibling, gender-neutral on its own; also the default generic term for "uncle/aunt" when exact relation isn't being specified
also_used_for_non_relatives: Yes, extremely common, general-purpose respectful address for any adult roughly a parent's age or older
usage_notes: Used alone or before a name; one of the most frequently heard kinship-derived address terms in daily life, related or not
region_or_family_variation:
tags: uncle, aunt, parents-generation, generic, non-relative-address
photo_url: /photos/om.png
photo_caption: "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script"
photo_credit: ChatGPT, 2024-06-05, generated image

generations.elder.still_used: Same
generations.elder.note: Still correctly distinguishes Om (older than her own parents, closer to grandparent age, e.g. her father's oldest brother) from Ming/Pou. At 80 she's now mostly addressed as "Yay" (grandmother) herself. Describes a real decline in precision among younger, especially town, children — some now say "Uncle"/"Auntie" in English, or default to Bong for everyone: "old way slowly disappearing I think."

generations.middle.still_used: Same
generations.middle.note: Uses Om exactly as her grandmother taught her, for someone older than her own parents or a family friend of that same elder generation: "this one hasn't changed for me at all." Has noticed younger people sometimes apply Om a little early, to someone not quite old enough, just to be extra polite.

generations.peer.still_used: Same
generations.peer.alternate_term:
generations.peer.note: Uses Om carefully and says it "hasn't shifted for me at all since I was little." Flags what she calls "the biggest generational shift out of all five": some younger Khmer kids in the city, especially those from international schools, substituting the English "Uncle"/"Auntie" for Om specifically.
```


<!-- Duplicate the block above for additional entries beyond the first 5. -->

---

## How this maps to the code

- `sources.config.js` — the three standing sources, one object per cohort.
- `lib/generations.js` — shared constants (cohort order, display labels,
  the color/width per status) and `resolveGenerationSource()`, which
  decides whether to show a per-entry `source_override` or fall back to
  `sources.config.js`.
- `components/entrycard/GenerationExplorer.js` — the interactive part
  (`"use client"`): holds which cohort tab is active and drives the fade
  transition. No animation library — plain `useState` + a short `setTimeout`
  + CSS `transition`.
- `components/entrycard/GenerationPanel.js` — renders one cohort's answer:
  the status bar, the alternate term (if any), the note, and the credited
  source.
- `components/entrycard/EntryPhoto.js` — renders the entry's photo (an
  `<img>`, gated on `photo_url` being set). Replaced the old
  `EntrySource.js`, which read entry-level source fields that no longer
  exist on any entry.

If you change a field name here, update the matching code files to match —
nothing enforces the connection automatically until there's a real database
and validation in a later sprint.