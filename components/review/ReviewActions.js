"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Bi from "../Bi.js";
import { createClient } from "../../lib/supabase/client.js";
import { bi } from "../../lib/uiText.js";
import { styles } from "./ReviewStyles.js";

// One browser client shared by this component (same pattern as AuthStatus.js).
const supabase = createClient();

// Publish/Return for one pending entry. The ONLY database call is
// rpc("review_entry") — never a table update/delete. Success means exactly
// `data === true && !error`; anything else keeps the entry on screen.
export default function ReviewActions({ entryId }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");

  function fail(error) {
    if (error) {
      console.error(`Review decision failed (${error.code || "unknown"}): ${error.message}`);
    }
    setMessage(bi("reviewFailed"));
    setBusy(false);
  }

  async function handlePublish() {
    setBusy(true);
    setMessage("");
    const result = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision: "published",
    });
    if (result.data === true && !result.error) {
      // Leave busy set so buttons stay disabled until refresh drops it.
      router.refresh();
      return;
    }
    fail(result.error);
  }

  function handleReturn() {
    setShowNote(true);
  }

  function handleCancelNote() {
    setShowNote(false);
    setNote("");
    setMessage("");
  }

  async function handleSendBack() {
    const trimmedNote = note.trim();
    // Empty reason -> no database call; the contributor needs the note.
    if (!trimmedNote) {
      setMessage(bi("reviewNoteRequired"));
      return;
    }
    setBusy(true);
    setMessage("");
    const result = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision: "returned",
      note: trimmedNote,
    });
    if (result.data === true && !result.error) {
      router.refresh();
      return;
    }
    fail(result.error);
  }

  return (
    <div style={styles.actionsBar}>
      {showNote ? (
        <div style={styles.noteBlock}>
          <label style={styles.noteLabel} htmlFor={`review-note-${entryId}`}><Bi k="reviewNoteLabel" /></label>
          <textarea
            id={`review-note-${entryId}`}
            style={styles.noteTextarea}
            maxLength={500}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            disabled={busy}
          />
          <div style={styles.noteButtons}>
            <button type="button" style={{ ...styles.sendBack, ...(busy ? styles.buttonDisabled : {}) }} onClick={handleSendBack} disabled={busy}><Bi k="reviewSendBack" /></button>
            <button type="button" style={{ ...styles.cancel, ...(busy ? styles.buttonDisabled : {}) }} onClick={handleCancelNote} disabled={busy}><Bi k="cancel" /></button>
          </div>
        </div>
      ) : (
        <div style={styles.buttonsRow}>
          <button type="button" style={{ ...styles.buttonPublish, ...(busy ? styles.buttonDisabled : {}) }} onClick={handlePublish} disabled={busy}><Bi k="reviewPublish" /></button>
          <button type="button" style={{ ...styles.buttonReturn, ...(busy ? styles.buttonDisabled : {}) }} onClick={handleReturn} disabled={busy}><Bi k="reviewReturn" /></button>
        </div>
      )}

      {message && <p style={styles.message} role="alert">{message}</p>}
    </div>
  );
}
