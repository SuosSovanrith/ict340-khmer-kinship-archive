import { redirect } from "next/navigation";
import BackLink from "../../components/BackLink.js";
import Bi from "../../components/Bi.js";
import ReviewItem from "../../components/review/ReviewItem.js";
import ReviewTabs from "../../components/review/ReviewTabs.js";
import ReviewSort from "../../components/review/ReviewSort.js";
import { createClient } from "../../lib/supabase/server.js";
import { bi } from "../../lib/uiText.js";
import { styles } from "../../components/review/ReviewStyles.js";
import {
  parseReviewParams,
  fetchReviewCounts,
  fetchReviewEntries,
} from "../../lib/reviewData.js";

export default async function ReviewPage({ searchParams }) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Reviewer gate FIRST: non-reviewers (or an is_reviewer error -> null) get the
  // restricted frame and never trigger the entries, counts, or profiles queries.
  const { data: isReviewer } = await supabase.rpc("is_reviewer");
  const restricted = isReviewer !== true;

  if (restricted) {
    return (
      <main style={styles.wrap}>
        <BackLink href="/" label={bi("backHome")} />
        <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
        <h1 style={styles.title}>
          <Bi k="reviewTitle" />
        </h1>
        <div style={styles.noticeBlock}>
          <p style={styles.noticeText}><Bi k="reviewOnlyReviewers" /></p>
        </div>
      </main>
    );
  }

  const params = await searchParams;
  const { status, sort } = parseReviewParams(params);
  const counts = await fetchReviewCounts(supabase);
  const { entries, contributorsById, loadFailed } = await fetchReviewEntries(
    supabase,
    status,
    sort
  );

  return (
    <main style={styles.wrap}>
      <BackLink href="/" label={bi("backHome")} />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>
        <Bi k="reviewTitle" />
      </h1>

      <p style={styles.sub}><Bi k="reviewIntro" separator={<br />} /></p>

      <ReviewTabs status={status} counts={counts} />
      <ReviewSort status={status} sort={sort} />

      {loadFailed ? (
        <div style={styles.noticeBlock}>
          <p style={styles.noticeText}><Bi k="reviewLoadFailed" /></p>
        </div>
      ) : entries.length === 0 ? (
        <div style={styles.noticeBlock}>
          <p style={styles.noticeText}>
            <Bi k={status === "pending" ? "reviewEmptyPending" : "reviewEmptyOther"} />
          </p>
        </div>
      ) : (
        entries.map((entry) => (
          <ReviewItem
            key={entry.id}
            entry={entry}
            contributorName={contributorsById.get(entry.owner) ?? null}
          />
        ))
      )}
    </main>
  );
}
