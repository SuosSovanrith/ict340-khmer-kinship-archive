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
    gap: "clamp(3px, 1.5vw, 10px)",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    minWidth: 0,
  },
  name: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    flex: "0 1 auto",
    minWidth: "2.5ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // Same truncating link, but rendered as a pill (matching ContributeLink's
  // active state) while the user is on the account page or the my entries page.
  nameActive: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.gold}`,
    borderRadius: 6,
    padding: "clamp(3px, 1.2vw, 6px) clamp(5px, 1.6vw, 12px)",
    textDecoration: "none",
    flex: "0 1 auto",
    minWidth: "2.5ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // The "My entries" and reviewer-only "Review" links never truncate: full
  // label, nowrap, flexShrink 0 — only the username is allowed to shrink.
  navLink: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  // The active-pill variant of navLink, matching the username's and
  // Contribute's active pills while the current page is that link's route.
  navActive: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.gold}`,
    borderRadius: 6,
    padding: "clamp(3px, 1.2vw, 6px) clamp(5px, 1.6vw, 12px)",
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
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "clamp(3px, 1.2vw, 6px) clamp(5px, 1.6vw, 12px)",
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
  const [isReviewer, setIsReviewer] = useState(false);
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

  // Check whether the signed-in user is a reviewer, reloaded whenever the
  // user changes (which also covers the initial mount once the session
  // resolves). It is deliberately its OWN effect — never inside
  // onAuthStateChange, which runs while the auth client holds its lock and
  // could deadlock on a supabase.rpc(...) call, exactly like the
  // supabase.from(...) caveat above. The flag is only strict true when the
  // RPC says true: an error, null, or false all mean "not a reviewer", and
  // the link stays hidden whenever the flag is anything but true.
  useEffect(() => {
    if (!user) {
      setIsReviewer(false);
      return;
    }
    let cancelled = false;

    const loadReviewerState = async () => {
      const { data, error } = await supabase.rpc("is_reviewer");
      if (cancelled) return;

      if (error) {
        console.error(`Failed to check reviewer status: ${error.message}`);
        setIsReviewer(false);
        return;
      }
      setIsReviewer(data === true);
    };
    loadReviewerState();

    return () => {
      cancelled = true;
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
    const reviewActive = pathname.startsWith("/review");
    const accountActive = pathname.startsWith("/account");
    return (
      <div style={styles.bar}>
        <ContributeLink authenticated />
        <span style={styles.vsep} aria-hidden="true" />
        <Link
          style={myEntriesActive ? styles.navActive : styles.navLink}
          href="/my-entries"
        >
          My entries
        </Link>
        <span style={styles.vsep} aria-hidden="true" />
        {isReviewer && (
          <>
            <Link
              style={reviewActive ? styles.navActive : styles.navLink}
              href="/review"
            >
              Review
            </Link>
            <span style={styles.vsep} aria-hidden="true" />
          </>
        )}
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