"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase/client.js";
import { colors, fonts } from "../lib/theme.js";
import ContributeLink from "./ContributeLink.js";

// One browser client shared by this component, so getSession,
// onAuthStateChange, and signOut all see the same session.
const supabase = createClient();

const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(6px, 2.5vw, 12px)",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    minWidth: 0,
  },
  email: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.muted,
    flex: "0 1 auto",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  link: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.gold,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  sep: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.faint,
    flexShrink: 0,
  },
  button: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

export default function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [known, setKnown] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    // Load the current session on mount, then stay in sync as the user logs
    // in or out in this tab.
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session ? data.session.user : null);
      setKnown(true);
    };
    loadSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session ? session.user : null);
      setKnown(true);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!known) return null;

  if (user) {
    return (
      <div style={styles.bar}>
        <ContributeLink authenticated />
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
      <ContributeLink authenticated={false} />
      <Link style={styles.link} href="/login">Log in</Link>
      <span style={styles.sep}>·</span>
      <Link style={styles.link} href="/signup">Sign up</Link>
    </div>
  );
}