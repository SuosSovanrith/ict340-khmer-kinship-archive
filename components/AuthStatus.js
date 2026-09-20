"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase/client.js";
import { colors, fonts } from "../lib/theme.js";

// One browser client shared by this component, so getSession,
// onAuthStateChange, and signOut all see the same session.
const supabase = createClient();

const styles = {
  bar: { display: "flex", alignItems: "center", gap: 12 },
  email: { fontFamily: fonts.mono, fontSize: 13, color: colors.muted },
  link: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.gold,
    textDecoration: "none",
  },
  sep: { fontFamily: fonts.mono, fontSize: 13, color: colors.faint },
  button: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    // Load the current session on mount, then stay in sync as the user logs
    // in or out in this tab.
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session ? data.session.user : null);
    };
    loadSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session ? session.user : null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
  }

  if (user) {
    return (
      <div style={styles.bar}>
        <span style={styles.email}>{user.email}</span>
        <button
          style={styles.button}
          onClick={handleLogout}
          disabled={signingOut}
        >
          {signingOut ? "Signing out…" : "Log out"}
        </button>
      </div>
    );
  }

  return (
    <div style={styles.bar}>
      <Link style={styles.link} href="/login">Log in</Link>
      <span style={styles.sep}>·</span>
      <Link style={styles.link} href="/signup">Sign up</Link>
    </div>
  );
}