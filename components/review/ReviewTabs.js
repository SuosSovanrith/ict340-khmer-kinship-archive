// Three status tabs for the /review queue. Server component (no "use client"):
// each tab is a plain <Link> to /review?status=<s>. Counts come from
// fetchReviewCounts; a null count (a failed query) hides the number.
import Link from "next/link";
import Bi from "../Bi.js";
import { REVIEW_STATUSES } from "../../lib/reviewData.js";
import { styles } from "./ReviewStyles.js";

const TAB_KEYS = {
  pending: "tabPending",
  returned: "tabReturned",
  published: "tabPublished",
};

export default function ReviewTabs({ status, counts }) {
  return (
    <nav style={styles.tabsRow} aria-label="Review queue status">
      {REVIEW_STATUSES.map((s) => {
        const active = s === status;
        const count = counts[s];
        return (
          <Link
            key={s}
            href={`/review?status=${s}`}
            style={active ? styles.tabActive : styles.tab}
            aria-current={active ? "page" : undefined}
          >
            <Bi k={TAB_KEYS[s]} />
            {count !== null && ` (${count})`}
          </Link>
        );
      })}
    </nav>
  );
}