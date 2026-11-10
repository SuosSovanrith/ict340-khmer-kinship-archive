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

  // Non-reviewers must name a source per generation; reviewers keep the field
  // optional. Anything other than exactly true means sources are required —
  // false, null, or an RPC error all fail closed to "required".
  let requireSources = true;
  if (user) {
    const { data: isReviewer } = await supabase.rpc("is_reviewer");
    requireSources = isReviewer !== true;
  }

  return (
    <main style={styles.wrap}>
      <BackLink href="/entries" label={bi("backEntries")} />
      <p style={styles.kicker}><Bi k="kicker" /></p>
      <h1 style={styles.title}><Bi k="contributeTitle" /></h1>
      <p style={styles.sub}>
        <Bi k="contributeIntro" vars={{ curator: collection.curator }} separator={<br />} />
      </p>

      {user ? (
        <ContributeForm requireSources={requireSources} />
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