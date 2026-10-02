import Link from "next/link";
import collection from "../collection.config.js";
import { createClient } from "../lib/supabase/server.js";
import ContributeForm from "../components/contribute/ContributeForm.js";
import { styles } from "../components/contribute/ContributeStyles.js";

export const metadata = {
  title: `Contribute — ${collection.name}`,
};

// Server component gate: logged-in users get the form; logged-out visitors get
// a link to log in. The client form re-fetches the session at save time via
// supabase.auth.getUser() and sets `owner` from it — never from the form.
export default async function ContributePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>Contribute a term</h1>
      <p style={styles.sub}>
        Add a kinship term you have gathered from a real conversation. Every
        entry is yours — curated by {collection.curator}.
      </p>

      {user ? (
        <ContributeForm />
      ) : (
        <div style={styles.loginPrompt}>
          <p style={styles.loginTitle}>Log in to contribute</p>
          <p style={styles.loginBody}>
            Only signed-in contributors can add an entry to {collection.name}.
          </p>
          <div style={styles.linkRow}>
            <Link style={styles.link} href="/login">
              Log in
            </Link>
            <Link style={styles.link} href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026.
      </footer>
    </main>
  );
}