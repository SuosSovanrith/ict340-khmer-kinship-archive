import { styles } from "./EntryCardStyles.js";

export default function EntryUsageNotes({ entry }) {
  return <p style={styles.usageNotes}>{entry.usage_notes}</p>;
}