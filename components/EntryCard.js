import { colors, fonts } from "../lib/theme.js";

// Reusable card that displays a single kinship-term entry.
// Pass it an `entry` object shaped like the mock data in entry-sketch.md.
export default function EntryCard({ entry }) {
  return (
    <article style={styles.card}>
      {/* Header: Khmer term + romanized + pronunciation + category */}
      <header style={styles.header}>
        <h2 style={styles.termKhmer}>{entry.term_khmer}</h2>
        <div style={styles.termMeta}>
          <span style={styles.romanized}>{entry.term_romanized}</span>
          {entry.pronunciation && (
            <span style={styles.pronunciation}>/{entry.pronunciation}/</span>
          )}
        </div>
        <span style={styles.categoryBadge}>{entry.category}</span>
      </header>

      {/* Quick facts */}
      <dl style={styles.facts}>
        <Fact label="Relation" value={entry.relation_described} />
        {entry.relative_age && <Fact label="Relative age" value={entry.relative_age} />}
        {entry.gender && <Fact label="Gender" value={entry.gender} />}
        <Fact label="Usage today" value={entry.usage_status_today} />
        {entry.formality && <Fact label="Formality" value={entry.formality} />}
        {entry.side_of_family && <Fact label="Side of family" value={entry.side_of_family} />}
      </dl>

      {/* Usage notes */}
      <p style={styles.usageNotes}>{entry.usage_notes}</p>

      {/* Generational note — the heart of the project */}
      {entry.generational_note && (
        <blockquote style={styles.genNote}>
          <p style={styles.genNoteLabel}>Generational note</p>
          <p style={styles.genNoteText}>{entry.generational_note}</p>
        </blockquote>
      )}

      {/* Example sentence (optional) */}
      {entry.example_sentence_khmer && (
        <div style={styles.example}>
          <p style={styles.exampleKhmer}>{entry.example_sentence_khmer}</p>
          {entry.example_sentence_translation && (
            <p style={styles.exampleTrans}>{entry.example_sentence_translation}</p>
          )}
        </div>
      )}

      {/* Tags */}
      {entry.tags?.length > 0 && (
        <div style={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>
      )}

      {/* Source footer */}
      <footer style={styles.source}>
        <span style={styles.sourceName}>
          Source: {entry.source_name}
          {entry.source_relation_to_contributor && ` — ${entry.source_relation_to_contributor}`}
        </span>
        {entry.source_location && <span style={styles.sourceDot}> · {entry.source_location}</span>}
        {entry.interview_date && <span style={styles.sourceDot}> · {entry.interview_date}</span>}
      </footer>
    </article>
  );
}

function Fact({ label, value }) {
  return (
    <>
      <dt style={styles.factLabel}>{label}</dt>
      <dd style={styles.factValue}>{value}</dd>
    </>
  );
}

const styles = {
  card: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: 28,
    marginBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  termKhmer: {
    fontFamily: fonts.serif,
    fontSize: 42,
    fontWeight: 700,
    color: colors.gold,
    margin: 0,
    lineHeight: 1.1,
  },
  termMeta: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginTop: 6,
  },
  romanized: {
    fontFamily: fonts.sans,
    fontSize: 20,
    color: colors.emerald,
    fontWeight: 600,
  },
  pronunciation: {
    fontFamily: fonts.mono,
    fontSize: 14,
    color: colors.muted,
  },
  categoryBadge: {
    display: "inline-block",
    marginTop: 12,
    padding: "4px 12px",
    backgroundColor: "rgba(46, 230, 168, 0.12)",
    color: colors.emerald,
    border: `1px solid ${colors.emeraldDeep}`,
    borderRadius: 999,
    fontSize: 12,
    fontFamily: fonts.mono,
    letterSpacing: 0.5,
  },
  facts: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px 24px",
    margin: "0 0 20px",
    padding: 0,
  },
  fact: {
    margin: 0,
  },
  factLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: 0,
  },
  factValue: {
    fontSize: 15,
    color: colors.text,
    margin: "4px 0 0",
  },
  usageNotes: {
    fontSize: 15,
    lineHeight: 1.6,
    color: colors.text,
    margin: "0 0 20px",
  },
  genNote: {
    margin: "0 0 20px",
    padding: "16px 20px",
    backgroundColor: colors.surfaceAlt,
    borderLeft: `3px solid ${colors.gold}`,
    borderRadius: 4,
  },
  genNoteLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.gold,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: 0,
  },
  genNoteText: {
    fontSize: 15,
    lineHeight: 1.6,
    color: colors.text,
    margin: "6px 0 0",
    fontStyle: "italic",
  },
  example: {
    margin: "0 0 20px",
    padding: "14px 18px",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
  },
  exampleKhmer: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.goldSoft,
    margin: 0,
  },
  exampleTrans: {
    fontSize: 14,
    color: colors.muted,
    margin: "6px 0 0",
    fontStyle: "italic",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    padding: "3px 10px",
    backgroundColor: "rgba(212, 175, 55, 0.12)",
    color: colors.goldSoft,
    border: `1px solid ${colors.border}`,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: fonts.mono,
  },
  source: {
    paddingTop: 16,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.muted,
  },
  sourceName: {
    color: colors.text,
  },
  sourceDot: {
    color: colors.faint,
  },
};