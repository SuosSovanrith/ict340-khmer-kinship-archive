import HighlightText from "../HighlightText.js";
import { styles } from "./EntryCardStyles.js";

export default function EntryTags({ entry, query = "" }) {
  if (!entry.tags?.length) return null;

  return (
    <div style={styles.tags}>
      {entry.tags.map((tag) => (
        <span key={tag} style={styles.tag}>
          <HighlightText text={tag} query={query} />
        </span>
      ))}
    </div>
  );
}