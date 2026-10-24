"use client";

import { useRouter, usePathname } from "next/navigation";
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
    gap: "clamp(4px, 2vw, 12px)",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    minWidth: 0,
  },
  name: {
    fontFamily: fonts.mono,
    fontSize: "clamp(11px, 2.5vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    flex: "0 1 auto",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // Same truncating link, but rendered as a pill (matching ContributeLink's
  // active state) while the user is on the account page or the my entries page.
  nameActive: {
    fontFamily: fonts.mono,
    fontSize: "clamp(11px, 2.5vw, 13px)",
    color: colors.gold,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.gold}`,
    borderRadius: 6,
    padding: "clamp(4px, 1.5vw, 6px) clamp(6px, 2vw, 12px)",
    textDecoration: "none",
    flex: "0 1 auto",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // A slim vertical divider: one between Contribute and My entries, one between
  // My entries and the username, so the individual actions read as distinct.
  vsep: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: colors.border,
    flexShrink: 0,
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
    fontSize: "clamp(11px, 2.5vw, 13px)",
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "clamp(4px, 1.5vw, 6px) clamp(6px, 2vw, 12px)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

export default function AuthStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [known, setKnown] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Own the session: get it once on mount, then stay in sync as the user logs
  // in or out in this tab. Only session/user state is set here — never any
  // database read, because onAuthStateChange runs while the auth client holds
  // its lock and a supabase.from(...) call there can deadlock.
  useEffect(() => {
    let cancelled = false;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!cancelled) setUser(data.session ? data.session.user : null);
      setKnown(true);
    };
    loadSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      // Clear any leftover "signing out" flag the moment the auth state
      // changes (e.g. a fresh login after an earlier logout). Otherwise a
      // logout on this tab leaves signingOut=true, and the button would stay
      // permanently stuck on "Signing out…" after logging back in without a
      // refresh.
      setSigningOut(false);
      setUser(session ? session.user : null);
      setKnown(true);
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  // Load this user's profile username whenever the signed-in user changes
  // (which also covers the initial mount once the session resolves), and reload
  // it when the account form signals that the profile was updated. Uses only
  // the user's id — never the session object itself.
  useEffect(() => {
    if (!user) {
      setUsername(null);
      return;
    }
    let cancelled = false;

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();
      if (cancelled) return;

      if (error || !data || !data.username) {
        if (error) console.error(`Failed to read profile: ${error.message}`);
        else console.error("No profile row for user", { id: user.id });
        setUsername("Account");
        return;
      }
      setUsername(data.username);
    };
    loadProfile();

    const onProfileUpdated = () => loadProfile();
    window.addEventListener("profile-updated", onProfileUpdated);

    return () => {
      cancelled = true;
      window.removeEventListener("profile-updated", onProfileUpdated);
    };
  }, [user]);

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/");
  }

  if (!known) return null;

  if (user) {
    const myEntriesActive = pathname.startsWith("/my-entries");
    const accountActive = pathname.startsWith("/account");
    return (
      <div style={styles.bar}>
        <ContributeLink authenticated />
        <span style={styles.vsep} aria-hidden="true" />
        <Link
          style={myEntriesActive ? styles.nameActive : styles.name}
          href="/my-entries"
        >
          My entries
        </Link>
        <span style={styles.vsep} aria-hidden="true" />
        {username && (
          <Link
            style={accountActive ? styles.nameActive : styles.name}
            href="/account"
          >
            {username}
          </Link>
        )}
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