import { styles } from "./EntryCardStyles.js";
import EntryHeader from "./EntryHeader.js";
import EntryFacts from "./EntryFacts.js";
import EntryUsageNotes from "./EntryUsageNotes.js";
import GenerationExplorer from "./GenerationExplorer.js";
import EntryTags from "./EntryTags.js";
import EntryPhoto from "./EntryPhoto.js";
import EntryOwnerActions from "./EntryOwnerActions.js";

// Reusable card that displays a single kinship-term entry.
// Pass it an `entry` object shaped like the entries in entry-sketch.md.
// Each visual section is its own component in this folder — edit that
// file directly rather than adding markup here.
export default function EntryCard({ entry, query = "", currentUserId }) {
  const isOwner = Boolean(currentUserId) && entry.owner === currentUserId;
  return (
    <article style={styles.card}>
      <EntryHeader entry={entry} query={query} />
      <EntryFacts entry={entry} query={query} />
      <EntryUsageNotes entry={entry} />
      <GenerationExplorer entry={entry} />
      <EntryTags entry={entry} query={query} />
      <EntryPhoto entry={entry} />
      {isOwner && <EntryOwnerActions entry={entry} />}
    </article>
  );
}