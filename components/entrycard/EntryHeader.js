import HighlightText from "../HighlightText.js";
import { styles } from "./EntryCardStyles.js";

export default function EntryHeader({ entry, query = "" }) {
  return (
    <header style={styles.header}>
      <h2 style={styles.termKhmer}>
        <HighlightText text={entry.term_khmer} query={query} />
      </h2>
      <div style={styles.termMeta}>
        <span style={styles.romanized}>
          <HighlightText text={entry.term_romanized} query={query} />
        </span>
        {entry.pronunciation && (
          <span style={styles.pronunciation}>/{entry.pronunciation}/</span>
        )}
      </div>
      <span style={styles.categoryBadge}>
        <HighlightText text={entry.category} query={query} />
      </span>
    </header>
  );
}