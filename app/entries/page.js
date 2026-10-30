import EntryList from "../../components/EntryList.js";
import BackLink from "../../components/BackLink.js";
import Bi from "../../components/Bi.js";
import { createClient } from "../../lib/supabase/server.js";
import { colors, fonts } from "../../lib/theme.js";
import { bi } from "../../lib/uiText.js";

// Wide container so the two-card grid actually grows on large screens.
// The landing page keeps its own narrow maxWidth.
const styles = {
  wrap: {
    maxWidth: 1550,
    margin: "0 auto",
    padding: "80px 16px",
  },
  kicker: {
    fontFamily: fonts.mono,
    color: colors.emerald,
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 40,
    fontWeight: 700,
    color: colors.gold,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  sub: {
    fontSize: 16,
    color: colors.muted,
    lineHeight: 1.6,
    margin: "0 0 40px",
  },
  // Simple on-theme "nothing to show" block, styled from lib/theme.js only.
  emptyBlock: {
    padding: "48px 24px",
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    textAlign: "center",
  },
  emptyTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.gold,
    margin: "0 0 12px",
  },
  emptyBody: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 1.6,
    margin: 0,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};

export default async function Entries() {
  const supabase = await createClient();

  // Fetch every column, newest first. A query error and an empty result both
  // mean the grid has nothing to show — send both down the same path.
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  // Log a real outage server-side so it doesn't look identical to "the archive
  // has nothing yet" in the UI. Fallback behavior stays the same either way.
  // Surface the structure (code/hint) instead of a bare `{}` so the log actually
  // tells us what's wrong — e.g. permission denied vs. empty table.
  if (error) {
    const hint = error.hint ? ` Hint: ${error.hint}` : "";
    console.error(
      `Supabase /entries query failed (${error.code || "unknown"}): ${error.message}.${hint}`
    );
  }

  const entries = error ? [] : (data || []);

  // Collect the distinct owner ids so each card can show a "Contributed by"
  // name. `owner` is a uuid referencing auth.users; the readable name lives in
  // public.profiles. Entries with no owner (or no profile row) stay null.
  const ownerIds = [...new Set(entries.map((e) => e.owner).filter(Boolean))];

  // id -> username lookup for every profile owned by an entry owner.
  let profilesById = new Map();
  if (ownerIds.length > 0) {
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, username")
      .in("id", ownerIds);
    // A missing profile (or RLS refusing the read) must never break the browse
    // page — log it and render the cards without names.
    if (profileError) {
      console.error(
        `Supabase /entries profiles query failed (${
          profileError.code || "unknown"
        }): ${profileError.message}.`
      );
    } else {
      profilesById = new Map((profiles || []).map((p) => [p.id, p.username]));
    }
  }

  for (const entry of entries) {
    entry.contributor_name = profilesById.get(entry.owner) ?? null;
  }

  return (
    <main style={styles.wrap}>
      <BackLink href="/" label={bi("backHome")} />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>
        <Bi k="browseTitle" />
      </h1>
      <p style={styles.sub}>
        Each card is one Khmer kinship term. Use the tabs to see how it&apos;s
        used across generations.
      </p>

      {entries.length === 0 ? (
        <div style={styles.emptyBlock}>
          <p style={styles.emptyTitle}>
            <Bi k="noTermsYet" />
          </p>
          <p style={styles.emptyBody}>
            Every card here is gathered by hand from real speakers, one term at
            a time — this living archive is still under construction. Check back
            soon.
          </p>
        </div>
      ) : (
        <EntryList entries={entries} />
      )}

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}