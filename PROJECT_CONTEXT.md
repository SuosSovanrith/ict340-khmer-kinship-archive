# PROJECT_CONTEXT.md

Read this before touching code if you're new here — human or AI agent.
It's the "why does this look like this" doc. `README.md` is setup steps,
`AGENTS.md` is coding rules, this is project history and current state.

## What this is

A student capstone for ICT 340 (Vibe Coding) at AUPP: a community archive
that preserves one piece of Khmer culture, built to a fixed four-feature
skeleton, deployed on Vercel with Next.js. Every student in the course
builds the same skeleton around a different collection — this one is
**Khmer kinship terms**: what people call their relatives, and how that's
changing across generations.

The pitch was approved. The professor's specific note on top of it: don't
just assert that terms are fading — show it, by asking the same question to
someone of grandparent age, someone of parent age, and someone the
contributor's own age, for the same word, and letting a visitor compare the
three answers directly. That single note is why the data model looks the
way it does below.

## The four-feature skeleton, and where each one stands

| # | Feature | Sprint | Status |
|---|---|---|---|
| 1 | Browse & search | 1 | **Not started.** Everything below is pre-Sprint-1 groundwork: the content model and the entry card, not the browse/search UI itself. |
| 2 | Contributor accounts | 2 | Not started |
| 3 | Ownership (edit/delete own entries only) | 2 | Not started |
| 4 | Review workflow (submitted → reviewed → published) | 3 | Not started |

No feature beyond this list gets built without the professor's approval —
see `AGENTS.md` rule 7 ("build only what the current task asks for") and
the "Explicitly out of scope" section below.

## The data model, at a glance

Full field-by-field reference lives in `entry-sketch.md` — this is just the
shape, so you know what to go read.

- **`collection.config.js`** — the archive's identity (name, description,
  curator, source). Set once in Lab 1, read everywhere, never hard-coded.
- **`sources.config.js`** — the contributor's three *standing* interview
  sources, one per age cohort (`elder`, `middle`, `peer`). Most entries cite
  these three by default.
- **`entry-sketch.md`** — the content schema and the actual gathered terms.
  Each entry has core fields (`term_khmer`, `category`, `relation_described`,
  `usage_notes`, `tags`, photo credit, etc.) plus a `generations` object:
```  
generations: {
    elder: { still_used, note, alternate_term?, source_override? },
    middle: { still_used, note, alternate_term?, source_override? },
    peer: { still_used, note, alternate_term?, source_override? },
}
```

  `still_used` is one of `Same` / `Changed` / `Replaced` / `Unused` — this
  is the whole "how did the word drift" mechanism.

## Key decisions already made, and why (read this before changing the schema)

- **`elder`/`middle`/`peer` are age cohorts, not family roles.** A source
  doesn't have to be the contributor's actual grandparent — a neighbor, a
  monk, or a willing stranger of that age group is fine, as long as they're
  named and have actually consented. Don't add validation or UI copy that
  implies these must be blood relatives.
- **`side_of_family`, `relative_age`, `gender`, `term_of_reference`,
  `formality` were cut as separate fields**, deliberately, after review.
  Central Khmer usage often doesn't distinguish maternal/paternal for
  aunts/uncles at all, and age/gender are normally already implied by
  `relation_described`. If a similar-sounding field looks "missing," it's
  cut on purpose — put the nuance in `usage_notes` prose instead of adding
  a new structured field back.
- **There is no single `usage_status_today` / `generational_note` field
  anymore.** That was the first version of this schema; it was replaced by
  the three-way `generations` breakdown per the professor's note above.
  Don't reintroduce a single summary field — if you want an "overall
  trend," derive it from the three `still_used` values in code, don't ask
  contributors to duplicate that judgment by hand.
- **Sourcing lives in two places on purpose.** `sources.config.js` holds
  the default source per cohort so consent/name isn't repeated on every
  entry; `generations.<cohort>.source_override` on a specific entry is only
  for the exception case where that one term's answer came from someone
  else. Don't collapse these back into one place — it would either force
  re-entering the same source repeatedly, or make one-off exceptions
  impossible.
- **No animation library.** The generation-compare interaction
  (`GenerationExplorer.js` + `GenerationPanel.js`) is plain `useState` +
  a short `setTimeout` + CSS `transition`, per `AGENTS.md` rule 1 (no new
  dependencies). If a future task wants smoother transitions, prefer the
  browser's native View Transitions API over installing a package — but
  note it's inconsistent across browsers, so keep a non-animated fallback.
- **Khmer script needs an explicit web font.** `Georgia`/`"Noto Serif"`/
  `"Times New Roman"` (the Latin serif stack) contain no Khmer glyphs.
  `lib/theme.js` has a separate `fonts.khmer` token (Noto Serif Khmer,
  loaded via a `<link>` in `app/layout.js`, not an npm package) — use it
  for any new UI that renders real Khmer-script text.
- **No dedicated per-entry route (`app/entries/[id]/page.js`) yet.**
  Deliberately deferred — whether search results link to a detail page or
  expand in place is a Sprint 1 design decision, not something to guess at
  before search exists. Currently everything renders inline on `/`.
- **Photos never depict identifiable people, by policy — not per-source
  consent.** Every entry needs a real photo (skeleton requirement), but
  it's always of a place, object, or the script itself, never a portrait.
  This removes the need for a separate photo-consent field entirely;
  `consentToCredit` (naming/quoting) is the only per-source consent
  tracked. `components/entrycard/EntryPhoto.js` renders it (an `<img>`,
  gated on `entry.photo_url` being set) and replaces the old
  `EntryPhoto.js`, which was quietly dead code after the generations
  redesign — it referenced entry-level source fields
  (`entry.source_name`, etc.) that no longer exist anywhere.

## Current status: what's real vs. placeholder

Entry *content* (the definitions, categories, usage notes for `bong`,
`oun`, `ming`, `pou`, `om`) is accurate, common Khmer vocabulary — safe to
treat as real.

Everything tied to actual interviews — `sources.config.js` names/consent,
every `generations.*.still_used`/`.note`/`.alternate_term`, and each
entry's `photo_caption`/`photo_credit`/`region_or_family_variation` —
starts out as a literal `"PLACEHOLDER"` string or `consentToCredit: false`,
and gets replaced field by field as real interviews happen. That list
changes too often to keep accurate here, so don't trust a status written
in this doc — check the live files instead:

```bash
grep -rn "PLACEHOLDER" entry-sketch.md sources.config.js
grep -n "consentToCredit: false" sources.config.js
```

Whatever those two commands return is what's still missing. Empty output
means every gathered field is real. **This has to reach empty before the
pitch/grading gate** — the course rule is explicit: no entries gathered,
no approval.



## File map

| File | Job |
|---|---|
| `collection.config.js` | Archive identity (name/description/curator/source) |
| `sources.config.js` | The three standing interview sources by age cohort |
| `entry-sketch.md` | Full content schema + the gathered terms |
| `lib/theme.js` | Colors + font stacks, including the Khmer font token |
| `lib/generations.js` | Cohort order/labels, status→color/width map, source-resolution helper |
| `components/entrycard/EntryCard.js` | Composes one entry's card from the sub-components below |
| `components/entrycard/EntryHeader.js`, `EntryFacts.js`, `EntryUsageNotes.js`, `EntryExample.js`, `EntryTags.js`, `EntryPhoto.js`, `Fact.js` | Individual card sections |
| `components/entrycard/GenerationExplorer.js` | Client component: the tab UI + fade-transition state machine |
| `components/entrycard/GenerationPanel.js` | Renders one cohort's answer (status bar, note, credited source) |
| `app/page.js` | Currently the whole site: renders collection info + all mock entries inline |
| `app/layout.js` | Root HTML shell; loads the Khmer web font |
| `AGENTS.md` | Rules for AI coding agents (and students) working in this repo |
| `README.md` | Lab 1 setup instructions |

## Explicitly out of scope (needs professor approval before building)

- Audio pronunciation clips — a real, likely-good idea, but needs its own
  upload pipeline and its own explicit voice-recording consent (separate
  from photo consent). Not pitched yet.
- Fictive-kinship terms (*thoa*, *khloeu*) as a category
- Multi-language UI toggle, comments/discussion, crowd voting on entries
- A visual family-tree diagram

## If you're about to start Sprint 1 (browse & search)

Read `entry-sketch.md`'s field reference and the `mockEntries` shape in
`app/page.js` first — search/filter fields should map onto fields that
already exist (`category`, `tags`, `also_used_for_non_relatives`, and
derived generation-trend logic), not new ones invented ad hoc. Deciding on
a dedicated `/entries/[id]` route is a natural part of this sprint's design,
not a prerequisite for it.