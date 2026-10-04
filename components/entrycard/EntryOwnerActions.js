"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import { colors, fonts } from "../../lib/theme.js";

const supabase = createClient();

const styles = {
  bar: {
    marginTop: 16,
    paddingTop: 12,
    borderTop: `1px solid ${colors.border}`,
  },
  actions: { display: "flex", gap: 10, alignItems: "center" },
  edit: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: 700,
    color: colors.emerald,
    textDecoration: "none",
    border: `1px solid ${colors.emeraldDeep}`,
    borderRadius: 6,
    padding: "6px 12px",
  },
  delete: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: 700,
    color: colors.bg,
    backgroundColor: colors.gold,
    border: "none",
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer",
  },
  message: { color: colors.gold, fontSize: 12, margin: "6px 0 0", fontFamily: fonts.mono },
};

// Owner-only Edit/Delete controls shown at the bottom of a card. RLS is the real
// enforcement; this is the "is it actually the owner" check for delete (the edit
// route re-checks ownership server-side too).
export default function EntryOwnerActions({ entry }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${entry.term_khmer}" from the archive? This can't be undone.`)) {
      return;
    }
    setDeleting(true);
    setMessage("");
    const { data, error } = await supabase
      .from("entries")
      .delete()
      .eq("id", entry.id)
      .select();
    // RLS fails silently (no thrown error) — an empty result is the only signal
    // the delete was refused, so we check it explicitly.
    if (error || !data || data.length === 0) {
      console.error("Delete: no row returned", { entryId: entry.id, data, error });
      setMessage("That change wasn't saved");
      setDeleting(false);
      return;
    }
    router.refresh();
  }

  return (
    <div style={styles.bar}>
      <div style={styles.actions}>
        <Link style={styles.edit} href={`/entries/${entry.id}/edit`}>
          Edit
        </Link>
        <button type="button" style={styles.delete} onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}