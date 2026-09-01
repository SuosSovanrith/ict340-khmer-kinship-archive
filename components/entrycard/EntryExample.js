import { styles } from "./EntryCardStyles.js";

export default function EntryExample({ entry }) {
  if (!entry.example_sentence_khmer) return null;

  return (
    <div style={styles.example}>
      <p style={styles.exampleKhmer}>{entry.example_sentence_khmer}</p>
      {entry.example_sentence_translation && (
        <p style={styles.exampleTrans}>{entry.example_sentence_translation}</p>
      )}
    </div>
  );
}