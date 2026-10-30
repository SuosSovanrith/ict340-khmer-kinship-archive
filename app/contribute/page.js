import Link from "next/link";
import collection from "../../collection.config.js";
import { createClient } from "../../lib/supabase/server.js";
import ContributeForm from "../../components/contribute/ContributeForm.js";
import BackLink from "../../components/BackLink.js";
import { styles } from "../../components/contribute/ContributeStyles.js";
import Bi from "../../components/Bi.js";
import { bi } from "../../lib/uiText.js";

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
      <BackLink href="/entries" label={bi("backEntries")} />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}><Bi k="contributeTitle" /></h1>
      <p style={styles.sub}>
        <Bi k="contributeIntro" vars={{ curator: collection.curator }} separator={<br />} />
      </p>

      {user ? (
        <ContributeForm />
      ) : (
        <div style={styles.loginPrompt}>
          <p style={styles.loginTitle}><Bi k="loginToContribute" /></p>
          <p style={styles.loginBody}>
            <Bi k="loginToContributeBody" vars={{ collection: collection.name }} separator={<br />} />
          </p>
          <div style={styles.linkRow}>
            <Link style={styles.link} href="/login">
              <Bi k="logIn" />
            </Link>
            <Link style={styles.link} href="/signup">
              <Bi k="signUp" />
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