import { styles } from "./EntryCardStyles.js";

export default function EntrySource({ entry }) {
  return (
    <footer style={styles.source}>
      <span style={styles.sourceName}>
        Source: {entry.source_name}
        {entry.source_relation_to_contributor && ` — ${entry.source_relation_to_contributor}`}
      </span>
      {entry.source_location && <span style={styles.sourceDot}> · {entry.source_location}</span>}
      {entry.interview_date && <span style={styles.sourceDot}> · {entry.interview_date}</span>}
    </footer>
  );
}