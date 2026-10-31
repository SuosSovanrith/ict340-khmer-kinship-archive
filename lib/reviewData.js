// Server-side helpers for the /review queue. No "use client" — these run on
// the server only. The single job of parseReviewParams is to turn raw URL
// values into a whitelisted { status, sort } pair; nothing from the URL is
// ever interpolated into a query or an href except those results.

export const REVIEW_STATUSES = ["pending", "returned", "published"];

// Default sort per status when the URL gives no (or a bad) sort value.
const SORT_DEFAULTS = {
  pending: "oldest",
  returned: "newest",
  published: "newest",
};

export function parseReviewParams(params) {
  const rawStatus = params?.status;
  const status = REVIEW_STATUSES.includes(rawStatus) ? rawStatus : "pending";

  const rawSort = params?.sort;
  const sort =
    rawSort === "oldest" || rawSort === "newest" ? rawSort : SORT_DEFAULTS[status];

  return { status, sort };
}

export async function fetchReviewEntries(supabase, status, sort) {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: sort === "oldest" })
    .limit(100);

  // Log a real outage server-side so it doesn't look like an empty queue.
  if (error) {
    console.error(
      `Supabase /review queue query failed (${error.code || "unknown"}): ${error.message}`
    );
    return { entries: [], contributorsById: new Map(), loadFailed: true };
  }

  const entries = data || [];

  // Username lookup for the distinct owners in THIS list only.
  const ownerIds = [...new Set(entries.map((e) => e.owner).filter(Boolean))];
  let contributorsById = new Map();
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

  return { entries, contributorsById, loadFailed: false };
}

export async function fetchReviewCounts(supabase) {
  // head: true means only the count is returned — no row data is fetched.
  const counts = await Promise.all(
    REVIEW_STATUSES.map(async (s) => {
      const { count, error } = await supabase
        .from("entries")
        .select("id", { count: "exact", head: true })
        .eq("status", s);
      if (error) {
        console.error(
          `Supabase /review count query failed for "${s}" (${error.code || "unknown"}): ${error.message}`
        );
        return null;
      }
      return count;
    })
  );

  return {
    pending: counts[0],
    returned: counts[1],
    published: counts[2],
  };
}