import collection from "../collection.config.js";
import EntryCard from "../components/entrycard/EntryCard.js";
import { colors, fonts } from "../lib/theme.js";

// Mock entries from entry-sketch.md (Entry 1 & Entry 2).
// These will move to a database in Sprint 1; the component stays the same.
const mockEntries = [
  {
    id: "bong",
    term_khmer: "បង",
    term_romanized: "Bong",
    pronunciation: "bong",
    category: "Same generation",
    relation_described:
      "Generic term for an older sibling or older cousin (gender-neutral; can be specified as Bong Proh for male or Bong Srey for female)",
    also_used_for_non_relatives: "Yes, one of the most common polite ways to address anyone perceived as somewhat older than you, related or not",
    usage_notes:
      "Placed directly before a name, or used alone as direct address; never used toward someone younger than the speaker",
    usage_status_today: "Common",
    generational_note: "PLACEHOLDER",
    region_or_family_variation: "PLACEHOLDER",
    tags: ["sibling", "elder-address", "common", "gender-neutral"],
    source_name: "PLACEHOLDER",
    source_relation_to_contributor: "PLACEHOLDER",
    source_location: "PLACEHOLDER",
    interview_date: "PLACEHOLDER",
    consent_to_credit: "PLACEHOLDER",
    photo_caption: "PLACEHOLDER",
    photo_credit: "PLACEHOLDER",
  },
  {
    id: "oun",
    term_khmer: "អូន",
    term_romanized: "Oun",
    pronunciation: "oun",
    category: "Same generation",
    relation_described:
      "Generic term for a younger sibling or younger cousin; also widely used as an affectionate term between romantic partners regardless of relation",
    also_used_for_non_relatives:
      "Yes, used for anyone perceived younger, and notably as a term of endearment between partners",
    usage_notes:
      "Used as direct address or before a name; the romantic-partner usage is a separate, very common register from the sibling usage",
    usage_status_today: "Common",
    generational_note: "PLACEHOLDER",
    region_or_family_variation: "PLACEHOLDER",
    tags: ["sibling", "younger-address", "common", "romantic-usage"],
    source_name: "PLACEHOLDER",
    source_relation_to_contributor: "PLACEHOLDER",
    source_location: "PLACEHOLDER",
    interview_date: "PLACEHOLDER",
    consent_to_credit: "PLACEHOLDER",
    photo_caption: "PLACEHOLDER",
    photo_credit: "PLACEHOLDER",
  },
];

const styles = {
  wrap: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "80px 24px",
  },
  kicker: {
    fontFamily: fonts.mono,
    color: colors.emerald,
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 48,
    fontWeight: 700,
    color: colors.gold,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 18,
    color: colors.muted,
    lineHeight: 1.6,
    margin: 0,
  },
  card: {
    marginTop: 48,
    padding: 24,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
  },
  cardLabel: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
    margin: 0,
  },
  cardValue: {
    fontSize: 16,
    color: colors.text,
    margin: "6px 0 0",
  },
  count: {
    fontFamily: fonts.mono,
    fontSize: 14,
    color: colors.emerald,
    marginTop: 48,
  },
  entriesHeading: {
    fontFamily: fonts.serif,
    fontSize: 28,
    fontWeight: 700,
    color: colors.gold,
    margin: "48px 0 8px",
  },
  entriesSub: {
    fontSize: 15,
    color: colors.muted,
    margin: "0 0 24px",
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};

export default function Home() {
  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>{collection.name}</h1>
      <p style={styles.description}>{collection.description}</p>

      <div style={styles.card}>
        <p style={styles.cardLabel}>CURATED BY</p>
        <p style={styles.cardValue}>{collection.curator}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>SOURCE</p>
        <p style={styles.cardValue}>{collection.source}</p>
      </div>

      <p style={styles.count}>
        entries in the archive: {mockEntries.length} (mock data — more to come)
      </p>

      <h2 style={styles.entriesHeading}>Browse the terms</h2>
      <p style={styles.entriesSub}>
        Each card is one kinship term gathered from a family interview.
      </p>

      {mockEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}