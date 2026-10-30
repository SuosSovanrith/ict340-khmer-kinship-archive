"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../../lib/supabase/client.js";
import {
  normalizeUsername,
  validateUsername,
  USERNAME_HINT,
} from "../../lib/username.js";
import { bi } from "../../lib/uiText.js";
import Bi from "../Bi.js";
import { colors, fonts } from "../../lib/theme.js";

const styles = {
  form: { display: "block", margin: 0 },
  field: { margin: "0 0 20px" },
  label: {
    display: "block",
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
    margin: "0 0 8px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    fontFamily: fonts.sans,
    outline: "none",
    colorScheme: "dark",
  },
  button: {
    padding: "14px 20px",
    fontSize: 16,
    fontWeight: 700,
    color: colors.bg,
    backgroundColor: colors.gold,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontFamily: fonts.sans,
  },
  buttonDisabled: { opacity: 0.55, cursor: "default" },
  hint: {
    color: colors.faint,
    fontSize: 12,
    margin: "6px 0 0",
    lineHeight: 1.5,
  },
  fieldError: {
    color: colors.gold,
    fontSize: 13,
    margin: "6px 0 0",
  },
  messageSuccess: {
    color: colors.emerald,
    fontSize: 14,
    margin: "0 0 16px",
  },
  messageError: {
    color: colors.gold,
    fontSize: 14,
    margin: "0 0 16px",
  },
};

// Lets a signed-in contributor change the username shown beside their entries.
// Receives the current username from the server page and only ever sends the
// username column back — never the session, email, or any other profile field.
export default function UsernameForm({ userId, initialUsername }) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [usernameError, setUsernameError] = useState("");
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageTone("");
    setUsernameError("");
    setSaving(true);

    // Always submit the normalized value, never the raw input.
    const candidate = normalizeUsername(username);
    const check = validateUsername(candidate);
    if (check) {
      setUsernameError(check);
      setSaving(false);
      return;
    }

    const supabase = createClient();

    // The user's own current name always counts as available, so skip the RPC
    // entirely when nothing changed rather than risk it rejecting "their" name.
    if (candidate !== normalizeUsername(initialUsername)) {
      const { data, error: rpcError } = await supabase.rpc(
        "username_available",
        { candidate }
      );

      if (rpcError) {
        console.error({
          code: rpcError.code,
          message: rpcError.message,
        });
        setUsernameError(bi("usernameCheckFailed"));
        setSaving(false);
        return;
      }

      if (data !== true) {
        setUsernameError(bi("usernameTaken"));
        setSaving(false);
        return;
      }
    }

    // Send only the username column, scoped to this user's row.
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: candidate })
      .eq("id", userId)
      .select();

    if (error) {
      // Never surface error.message; log it for us and show copy only.
      console.error({ code: error.code, message: error.message });
      setUsernameError(
        error.code === "23505"
          ? bi("usernameTaken")
          : bi("usernameSaveFailed")
      );
      setSaving(false);
      return;
    }

    // A successful update with .select() returns the changed row(s); an empty
    // array means nothing was actually written.
    if (!data || data.length === 0) {
      console.error("Username update returned no row", { userId });
      setMessage(bi("notSaved"));
      setMessageTone("error");
      setSaving(false);
      return;
    }

    setSaving(false);
    setMessage("Saved");
    setMessageTone("success");
    window.dispatchEvent(new Event("profile-updated"));
    router.refresh();
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.field}>
        <label style={styles.label} htmlFor="username"><Bi k="username" /></label>
        <input
          id="username"
          name="username"
          type="text"
          style={styles.input}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setUsernameError("");
          }}
          required
          autoComplete="nickname"
        />
        <p style={styles.hint}>{USERNAME_HINT}</p>
        {usernameError && <p style={styles.fieldError}>{usernameError}</p>}
      </div>

      {message && (
        <p style={messageTone === "success" ? styles.messageSuccess : styles.messageError}>
          {message}
        </p>
      )}

      <button
        type="submit"
        style={{ ...styles.button, ...(saving ? styles.buttonDisabled : {}) }}
        disabled={saving}
      >
        {saving ? bi("saving") : bi("saveChanges")}
      </button>
    </form>
  );
}