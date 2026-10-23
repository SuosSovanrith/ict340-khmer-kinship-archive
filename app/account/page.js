import { redirect } from "next/navigation";
import collection from "../../collection.config.js";
import { createClient } from "../../lib/supabase/server.js";
import BackLink from "../../components/BackLink.js";
import UsernameForm from "../../components/account/UsernameForm.js";
import { colors, fonts } from "../../lib/theme.js";

const styles = {
  wrap: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "80px 24px",
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
  signedIn: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 1.6,
    margin: "0 0 40px",
    overflowWrap: "anywhere",
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
  title: `Account — ${collection.name}`,
};

// Signed-in-only route. Not logged in, redirect straight to /login — the
// account page is meaningless without a session. The header no longer shows
// the email, so this page surfaces it as a read-only "Signed in as" line.
export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main style={styles.wrap}>
      <BackLink href="/" label="Home" />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>Account</h1>
      <p style={styles.sub}>Manage the name shown beside your entries.</p>
      <p style={styles.signedIn}>Signed in as {user.email}</p>

      <UsernameForm userId={user.id} initialUsername={profile?.username || ""} />

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026.
      </footer>
    </main>
  );
}