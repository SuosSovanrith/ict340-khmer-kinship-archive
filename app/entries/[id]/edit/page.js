import { redirect } from "next/navigation";
import collection from "../../../../collection.config.js";
import { createClient } from "../../../../lib/supabase/server.js";
import ContributeForm from "../../../../components/contribute/ContributeForm.js";
import { styles } from "../../../../components/contribute/ContributeStyles.js";

export const metadata = {
  title: `Edit — ${collection.name}`,
};

// Owner-only edit route. The card button only *shows* owners the Edit/Delete
// controls (politeness); this route is the real enforcement: not logged in, the
// entry missing, or not its owner → back to /entries (no form rendered).
export default async function EditEntryPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/entries");

  const { data: entry } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!entry || entry.owner !== user.id) redirect("/entries");

  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>Edit entry</h1>
      <p style={styles.sub}>Update your term; changes are saved to the archive.</p>

      <ContributeForm entry={entry} />

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026.
      </footer>
    </main>
  );
}