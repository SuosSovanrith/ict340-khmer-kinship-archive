import Link from "next/link";
import { redirect } from "next/navigation";
import collection from "../../collection.config.js";
import { createClient } from "../../lib/supabase/server.js";
import Bi from "../../components/Bi.js";
import BackLink from "../../components/BackLink.js";
import { bi } from "../../lib/uiText.js";
import MyEntryRow from "../../components/myentries/MyEntryRow.js";
import { colors, fonts } from "../../lib/theme.js";

const styles = {
  wrap: { maxWidth: 760, margin: "0 auto", padding: "80px 24px" },
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
    margin: "0 0 20px",
  },
  emptyLink: {
    display: "inline-block",
    padding: "12px 20px",
    borderRadius: 8,
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: 14,
    color: colors.bg,
    backgroundColor: colors.gold,
    textDecoration: "none",
  },
  errorMessage: {
    padding: "20px",
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    color: colors.gold,
    fontSize: 15,
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

export const metadata = {
  title: `My entries — ${collection.name}`,
};

// Signed-in-only route listing everything the current user owns, newest first.
// Not logged in, redirect straight to /login — the page is meaningless without
// a session. Only this user's rows are requested; RLS stays the real guard.
export default async function MyEntriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("owner", user.id)
    .order("created_at", { ascending: false });

  // Log a real outage server-side so it doesn't look identical to "you have no
  // entries yet" in the UI — surface the code and message so the log is useful.
  if (error) {
    console.error(
      `Supabase /my-entries query failed (${error.code || "unknown"}): ${error.message}`
    );
  }

  const entries = error ? null : (data || []);

  return (
    <main style={styles.wrap}>
      <BackLink href="/entries" label={bi("backEntries")} />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}><Bi k="myEntries" /></h1>
      <p style={styles.sub}>Your own terms and their review status.</p>

      {entries === null ? (
        <p style={styles.errorMessage}>{bi("loadEntriesFailed")}</p>
      ) : entries.length === 0 ? (
        <div style={styles.emptyBlock}>
          <p style={styles.emptyTitle}>
            <Bi k="noEntriesTitle" />
          </p>
          <p style={styles.emptyBody}>
            <Bi k="noEntriesBody" separator={<br />} />
          </p>
          <Link style={styles.emptyLink} href="/contribute">
            <Bi k="contributeTitle" />
          </Link>
        </div>
      ) : (
        entries.map((entry) => <MyEntryRow key={entry.id} entry={entry} />)
      )}

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026.
      </footer>
    </main>
  );
}