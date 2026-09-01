import { styles } from "./EntryCardStyles.js";

export default function EntryGenerationalNote({ entry }) {
  if (!entry.generational_note) return null;

  return (
    <blockquote style={styles.genNote}>
      <p style={styles.genNoteLabel}>Generational note</p>
      <p style={styles.genNoteText}>{entry.generational_note}</p>
    </blockquote>
  );
}