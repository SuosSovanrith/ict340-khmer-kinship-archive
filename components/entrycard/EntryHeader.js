import { styles } from "./EntryCardStyles.js";

export default function EntryHeader({ entry }) {
  return (
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
  );
}