import { redirect } from "next/navigation";
import BackLink from "../../components/BackLink.js";
import Bi from "../../components/Bi.js";
import ReviewItem from "../../components/review/ReviewItem.js";
import { createClient } from "../../lib/supabase/server.js";
import { bi } from "../../lib/uiText.js";
import { styles } from "../../components/review/ReviewStyles.js";

export default async function ReviewPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Reviewer gate FIRST: non-reviewers (or an is_reviewer error -> null) get the
  // restricted frame and never trigger the entries or profiles queries.
  const { data: isReviewer } = await supabase.rpc("is_reviewer");
  const restricted = isReviewer !== true;

  let entries = [];
  let loadFailed = false;
  // owner -> username for the meta line; entry.contributor_name is deliberately
  // left unset so the card never renders its own byline.
  let contributorsById = new Map();

  if (!restricted) {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    // Log a real outage server-side so it doesn't look like an empty queue.
    if (error) {
      console.error(
        `Supabase /review queue query failed (${error.code || "unknown"}): ${error.message}`
      );
      loadFailed = true;
    } else {
      entries = data || [];

      // Username lookup for the distinct owners in THIS list only.
      const ownerIds = [...new Set(entries.map((e) => e.owner).filter(Boolean))];
      if (ownerIds.length > 0) {
        const { data: profiles, error: profileError } = await supabase
          .from("profiles")
          .select("id, username")
          .in("id", ownerIds);
        if (profileError) {
          console.error(
            `Supabase /review profiles query failed (${profileError.code || "unknown"}): ${profileError.message}.`
          );
        } else {
          contributorsById = new Map(
            (profiles || []).map((p) => [p.id, p.username])
          );
        }
      }
    }
  }

  return (
    <main style={styles.wrap}>
      <BackLink href="/" label={bi("backHome")} />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>
        <Bi k="reviewTitle" />
      </h1>

      {restricted ? (
        // Non-reviewer: the page frame plus one message, and nothing else.
        <div style={styles.noticeBlock}>
          <p style={styles.noticeText}><Bi k="reviewOnlyReviewers" /></p>
        </div>
      ) : (
        <>
          <p style={styles.sub}><Bi k="reviewIntro" separator={<br />} /></p>

          {loadFailed ? (
            <div style={styles.noticeBlock}>
              <p style={styles.noticeText}><Bi k="reviewLoadFailed" /></p>
            </div>
          ) : entries.length === 0 ? (
            <div style={styles.noticeBlock}>
              <p style={styles.noticeText}><Bi k="reviewEmptyPending" /></p>
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
        </>
      )}
    </main>
  );
}
