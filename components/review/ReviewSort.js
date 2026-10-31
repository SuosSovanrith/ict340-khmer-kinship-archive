// Two sort links for the /review queue: oldest first / newest first. Server
// component; the effective current sort (from parseReviewParams) gets the
// active style and aria-current="true".
import Link from "next/link";
import Bi from "../Bi.js";
import { styles } from "./ReviewStyles.js";

export default function ReviewSort({ status, sort }) {
  return (
    <div style={styles.sortRow} role="group" aria-label="Sort order">
      <Link
        href={`/review?status=${status}&sort=oldest`}
        style={sort === "oldest" ? styles.sortActive : styles.sortLink}
        aria-current={sort === "oldest" ? "true" : undefined}
      >
        <Bi k="sortOldest" />
      </Link>
      <Link
        href={`/review?status=${status}&sort=newest`}
        style={sort === "newest" ? styles.sortActive : styles.sortLink}
        aria-current={sort === "newest" ? "true" : undefined}
      >
        <Bi k="sortNewest" />
      </Link>
    </div>
  );
}