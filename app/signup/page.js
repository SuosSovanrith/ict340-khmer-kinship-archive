"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client.js";
import BackLink from "../../components/BackLink.js";
import { colors, fonts } from "../../lib/theme.js";
import {
  normalizeUsername,
  validateUsername,
  USERNAME_HINT,
} from "../../lib/username.js";

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
    // Dark color scheme makes the browser render its native password
    // reveal eye icon light/white instead of black (which was invisible
    // against this dark background).
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
  error: { color: colors.gold, fontSize: 14, margin: "0 0 20px" },
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
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setUsernameError("");
    setSubmitting(true);

    // Always submit the normalized value, never the raw input — the stored
    // username is exactly what the rules validated.
    const candidate = normalizeUsername(username);
    const check = validateUsername(candidate);
    if (check) {
      setUsernameError(check);
      setSubmitting(false);
      return;
    }

    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc(
      "username_available",
      { candidate }
    );

    if (rpcError) {
      // Availability is unknown — block rather than risk a collision; the
      // details are for us, never for the user.
      console.error({
        status: rpcError.status,
        code: rpcError.code,
        message: rpcError.message,
      });
      setUsernameError("Could not check that username. Please try again.");
      setSubmitting(false);
      return;
    }

    // Only "exactly true" means it's free. false means taken; anything else
    // (null/undefined) also means the check didn't come back clean.
    if (data !== true) {
      setUsernameError(
        data === false
          ? "That username is taken"
          : "Could not check that username. Please try again."
      );
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: candidate } },
    });

    if (error) {
      // Keep sign-up failures generic too — don't reveal that an email is
      // already registered.
      console.error({
        status: error.status,
        code: error.code,
        message: error.message,
      });
      setMessage("Could not create your account.");
      setSubmitting(false);
      return;
    }

    router.push("/");
  }

  return (
    <main style={styles.wrap}>
      <BackLink href="/" label="Home" />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>Sign up</h1>
      <p style={styles.sub}>
        Create an account so you can contribute your own kinship terms.
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="username">USERNAME</label>
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
        <div style={styles.field}>
          <label style={styles.label} htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            style={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            style={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        {message && <p style={styles.error}>{message}</p>}

        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? "Creating account…" : "Sign up"}
        </button>
        <p style={styles.sub}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026.
      </footer>
    </main>
  );
}