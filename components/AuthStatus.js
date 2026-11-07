"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase/client.js";
import HeaderNav from "./header/HeaderNav.js";

// One browser client shared by this component, so getSession,
// onAuthStateChange, and signOut all see the same session.
const supabase = createClient();

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

  return (
    <HeaderNav
      user={user}
      username={username}
      isReviewer={isReviewer}
      signingOut={signingOut}
      onLogout={handleLogout}
      pathname={pathname}
    />
  );
}