import { styles } from "./EntryCardStyles.js";

export default function EntryTags({ entry }) {
  if (!entry.tags?.length) return null;

  return (
    <div style={styles.tags}>
      {entry.tags.map((tag) => (
        <span key={tag} style={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}