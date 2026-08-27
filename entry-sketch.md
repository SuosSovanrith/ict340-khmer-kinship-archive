# Entry Sketch — Khmer Kinship Terms Archive

This file defines the **content model**: the fields every kinship-term entry
needs, and blank templates to fill in with real interview data.

This is the *content* shape only. Account/ownership/review fields
(`owner_id`, `status`, `reviewed_by`, `submitted_at`, `published_at`) are
app-managed and get added when the database is built in Sprint 1 — don't
worry about those here.

---

## Field reference

### Required fields (an entry can't be published without these)

| Field | Type | Description | Example |
|---|---|---|---|
| `id` | slug | Short unique identifier, lowercase, hyphenated | `bong-srey` |
| `term_khmer` | text | The term in Khmer script | បងស្រី |
| `term_romanized` | text | Latin transliteration | Bong Srey |
| `term_of_address` | text | What you actually call the person to their face. Same as `term_khmer` if there's no separate address form. | Bong Srey (+ name) |
| `category` | enum | See controlled vocabulary below | Same generation (siblings & cousins) |
| `relation_described` | text | Plain-language relationship this term names | Older sister, or older female cousin |
| `relative_age` | enum | Older / Younger / Either / Not applicable | Older |
| `gender` | enum | Male / Female / Any | Female |
| `usage_notes` | text | When and how it's actually used in conversation | Used directly before the person's name; never used for someone younger than you |
| `usage_status_today` | enum | Common / Declining / Rare or mostly historical | Common |
| `generational_note` | text | **This is the heart of your project.** Who still uses it, who doesn't, and what your source said about why | "My mom uses this with all older female cousins, but my younger cousins in Phnom Penh mostly just use first names now." |
| `source_name` | text | Full name, or "Anonymous by request" | Sok Chan |
| `source_relation_to_contributor` | text | How this person relates to you | My maternal grandmother |
| `consent_to_credit` | boolean | Did they agree to be named in the public archive? | Yes |
| `photo_caption` | text | What the photo shows | Grandmother Sok Chan at her home in Kampong Cham, 2026 |
| `photo_credit` | text | Who took/owns the photo | Photo by contributor |
| `tags` | list | Freeform keywords for search | sibling, elder-address, common |

### Optional fields (include if the interview covered it)

| Field | Type | Description | Example |
|---|---|---|---|
| `pronunciation` | text | Simple phonetic guide (not strict IPA) | bong srey |
| `term_of_reference` | text | What you call the person *when talking about them to someone else*, if different from the address form | (same as address in this case) |
| `side_of_family` | enum | Paternal / Maternal / Either / Not applicable | Not applicable |
| `also_used_for_non_relatives` | boolean + note | Whether this term is used to politely address strangers/acquaintances by perceived age | Yes — used for any woman a bit older than you, related or not |
| `formality` | enum | Formal / Informal / Both | Both |
| `example_sentence_khmer` | text | A real sentence using the term | — |
| `example_sentence_translation` | text | English translation of the above | — |
| `region_or_family_variation` | text | Note if other provinces/families use a different term for the same relationship | Some families in Battambang use a different word for this |
| `interview_date` | date | When you talked to your source | 2026-08-20 |
| `source_location` | text | Province/town your source is from | Kampong Cham |

### Controlled vocabulary — `category`

Pick one per entry:
- Grandparents' generation
- Parents' generation (parents & their siblings, parents-in-law)
- Same generation (siblings, cousins, siblings-in-law)
- Children's & grandchildren's generation
- Non-relative honorific (a kin term used to address people you're not related to)

*(Fictive-kinship terms like `thoa`/adoptive-kin or `khloeu`/blood-brother are
culturally real but out of scope unless approved as a stretch feature —
don't build a category for them yet.)*

---

## Sample entry (illustration only — NOT one of your 5 real gathered entries)

```
id: bong-srey
term_khmer: បងស្រី
term_romanized: Bong Srey
pronunciation: bong srey
term_of_address: Bong Srey (+ name)
term_of_reference: same as address
category: Same generation (siblings & cousins)
relation_described: Older sister, or an older female cousin addressed the same way
side_of_family: Not applicable
relative_age: Older
gender: Female
also_used_for_non_relatives: Yes — commonly used for any woman somewhat older than the speaker, related or not
formality: Both
example_sentence_khmer: [TO FILL FROM INTERVIEW]
example_sentence_translation: [TO FILL FROM INTERVIEW]
usage_notes: Said directly before the person's name; a younger sibling or cousin would never use this toward someone younger than themselves
usage_status_today: Common
generational_note: [TO FILL FROM INTERVIEW — is this one actually fading, or still solid?]
region_or_family_variation: [TO FILL FROM INTERVIEW]
tags: sibling, elder-address, common
source_name: [REPLACE — real interview needed]
source_relation_to_contributor: [REPLACE]
source_location: [REPLACE]
interview_date: [REPLACE]
consent_to_credit: [REPLACE]
photo_caption: [REPLACE]
photo_credit: [REPLACE]
```

---

## Your entries (fill in from real interviews — need 5 for the pitch)

### Entry 1
```
id: bong
term_khmer: បង
term_romanized: Bong
pronunciation: bong
category: Same generation
relation_described: Generic term for an older sibling or older cousin (gender-neutral; can be specified as Bong Proh for male or Bong Srey for female)
also_used_for_non_relatives: Yes — one of the most common polite ways to address anyone perceived as somewhat older than you, related or not
usage_notes: Placed directly before a name, or used alone as direct address; never used toward someone younger than the speaker
usage_status_today: Common
generational_note: PLACEHOLDER
region_or_family_variation: PLACEHOLDER
tags: sibling, elder-address, common, gender-neutral
source_name: PLACEHOLDER
source_relation_to_contributor: PLACEHOLDER
source_location: PLACEHOLDER
interview_date: PLACEHOLDER
consent_to_credit: PLACEHOLDER
photo_caption: PLACEHOLDER
photo_credit: PLACEHOLDER
```

### Entry 2
```
id: oun
term_khmer: អូន
term_romanized: Oun
pronunciation: oun
category: Same generation
relation_described: Generic term for a younger sibling or younger cousin; also widely used as an affectionate term between romantic partners regardless of relation
also_used_for_non_relatives: Yes — used for anyone perceived younger, and notably as a term of endearment between partners
usage_notes: Used as direct address or before a name; the romantic-partner usage is a separate, very common register from the sibling usage
usage_status_today: Common
generational_note: PLACEHOLDER
region_or_family_variation: PLACEHOLDER
tags: sibling, younger-address, common, romantic-usage
source_name: PLACEHOLDER
source_relation_to_contributor: PLACEHOLDER
source_location: PLACEHOLDER
interview_date: PLACEHOLDER
consent_to_credit: PLACEHOLDER
photo_caption: PLACEHOLDER
photo_credit: PLACEHOLDER
```

### Entry 3
```
id: ming
term_khmer: មីង
term_romanized: Ming
pronunciation: ming
category: Parents' generation
relation_described: Father's or mother's younger sister; Central Khmer usage typically doesn't distinguish which parent's side
also_used_for_non_relatives: Yes — a common, polite way to address a woman roughly a parent's age or a bit younger
usage_notes: Used as direct address, often before a first name; considered warm/respectful rather than overly formal
usage_status_today: Common
generational_note: PLACEHOLDER — worth asking your source directly whether younger relatives still use this or default to something else
region_or_family_variation: PLACEHOLDER
tags: aunt, parents-generation, non-relative-address
source_name: PLACEHOLDER
source_relation_to_contributor: PLACEHOLDER
source_location: PLACEHOLDER
interview_date: PLACEHOLDER
consent_to_credit: PLACEHOLDER
photo_caption: PLACEHOLDER
photo_credit: PLACEHOLDER
```

### Entry 4
```
id: pou
term_khmer: ពូ
term_romanized: Pou
pronunciation: pou
category: Parents' generation
relation_described: Father's or mother's younger brother
also_used_for_non_relatives: Yes — commonly used to address a man somewhat younger than one's parents, e.g. a shopkeeper or driver
usage_notes: Used as direct address, often before a name; carries a friendly, respectful tone
usage_status_today: Common
generational_note: PLACEHOLDER
region_or_family_variation: PLACEHOLDER
tags: uncle, parents-generation, non-relative-address
source_name: PLACEHOLDER
source_relation_to_contributor: PLACEHOLDER
source_location: PLACEHOLDER
interview_date: PLACEHOLDER
consent_to_credit: PLACEHOLDER
photo_caption: PLACEHOLDER
photo_credit: PLACEHOLDER
```

### Entry 5
```
id: om
term_khmer: អ៊ំ
term_romanized: Om
pronunciation: om
category: Parents' generation
relation_described: Parent's older sibling, gender-neutral on its own; also the default generic term for "uncle/aunt" when exact relation isn't being specified
also_used_for_non_relatives: Yes — extremely common, general-purpose respectful address for any adult roughly a parent's age or older
usage_notes: Used alone or before a name; one of the most frequently heard kinship-derived address terms in daily life, related or not
usage_status_today: Common
generational_note: PLACEHOLDER — good one to probe for whether it's actually holding steady or getting replaced by borrowed terms
region_or_family_variation: PLACEHOLDER
tags: uncle, aunt, parents-generation, generic, non-relative-address
source_name: PLACEHOLDER
source_relation_to_contributor: PLACEHOLDER
source_location: PLACEHOLDER
interview_date: PLACEHOLDER
consent_to_credit: PLACEHOLDER
photo_caption: PLACEHOLDER
photo_credit: PLACEHOLDER
```

<!-- Duplicate the block above for additional entries beyond the first 5. -->