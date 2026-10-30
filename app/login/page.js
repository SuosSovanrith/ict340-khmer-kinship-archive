"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client.js";
import BackLink from "../../components/BackLink.js";
import Bi from "../../components/Bi.js";
import { bi } from "../../lib/uiText.js";
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
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Never reveal WHY login failed (wrong password vs. unknown email).
      setMessage(bi("invalidLogin"));
      setSubmitting(false);
      return;
    }

    router.push("/");
  }

  return (
    <main style={styles.wrap}>
      <BackLink href="/" label={bi("backHome")} />
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}><Bi k="logIn" /></h1>
      <p style={styles.sub}>
        <Bi k="loginIntro" separator={<br />} />
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label} htmlFor="email"><Bi k="email" /></label>
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
          <label style={styles.label} htmlFor="password"><Bi k="password" /></label>
          <input
            id="password"
            type="password"
            style={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {message && <p style={styles.error}>{message}</p>}

        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? bi("signingIn") : bi("logIn")}
        </button>
        <p style={styles.sub}>
          <Bi k="noAccount" separator=" " /> {" "}
          <Link href="/signup">
            <Bi k="signUp" />
          </Link>
        </p>
      </form>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026.
      </footer>
    </main>
  );
}