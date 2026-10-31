// One pending entry in the /review queue. Shows who submitted it (date +
// contributor + short owner id) above the card exactly as the public sees it —
// EntryCard gets NO currentUserId, so no owner Edit/Delete buttons appear —
// then the reviewer's Publish/Return actions.
import EntryCard from "../entrycard/EntryCard.js";
import ReviewActions from "./ReviewActions.js";
import Bi from "../Bi.js";
import { styles } from "./ReviewStyles.js";
import { bi } from "../../lib/uiText.js";

export default function ReviewItem({ entry, contributorName }) {
  const date = new Date(entry.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Phnom_Penh",
  });
  const name = `${contributorName ?? bi("reviewUnknownContributor")} (${
    entry.owner ? entry.owner.slice(0, 8) : "no id"
  })`;

  return (
    <section style={styles.item}>
      <p style={styles.meta}>
        <Bi k="reviewSubmitted" vars={{ date, name }} />
      </p>
      <EntryCard entry={entry} />
      <ReviewActions entryId={entry.id} />
    </section>
  );
}
