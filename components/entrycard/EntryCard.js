import { styles } from "./EntryCardStyles.js";
import EntryHeader from "./EntryHeader.js";
import EntryFacts from "./EntryFacts.js";
import EntryUsageNotes from "./EntryUsageNotes.js";
import EntryGenerationalNote from "./EntryGenerationalNote.js";
import EntryExample from "./EntryExample.js";
import EntryTags from "./EntryTags.js";
import EntrySource from "./EntrySource.js";
import { Fact } from "./Fact.js";

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