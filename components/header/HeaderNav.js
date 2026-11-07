"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Bi from "../Bi.js";
import HeaderStyles, { styles } from "./HeaderStyles.js";

export default function HeaderNav({
  user,
  username,
  isReviewer,
  signingOut,
  onLogout,
  pathname,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const contributeActive = pathname.startsWith("/contribute");
  const myEntriesActive = pathname.startsWith("/my-entries");
  const reviewActive = pathname.startsWith("/review");
  const accountActive = pathname.startsWith("/account");

  // Close whenever the route changes. Navigation happens after a link click,
  // so this also catches any transition that skipped the onClick handler.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Document listeners exist only while the menu is open: Escape closes it and
  // returns focus to the trigger; a mousedown anywhere outside the wrapper
  // closes it. Cleaned up when the menu closes or the component unmounts.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onMouseDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const toggle = () => setOpen((value) => !value);
  const contributeHref = user ? "/contribute" : "/login";
  const divider = <span style={styles.vsep} aria-hidden="true" />;

  // --- large-screen: a single nowrap row of bilingual links ---
  const inlineLinks = user ? (
    <>
      <Link style={contributeActive ? styles.navActive : styles.navLink} href={contributeHref}>
        <Bi k="navContribute" />
      </Link>
      {divider}
      <Link style={myEntriesActive ? styles.navActive : styles.navLink} href="/my-entries">
        <Bi k="myEntries" />
      </Link>
      {isReviewer && (
        <>
          {divider}
          <Link style={reviewActive ? styles.navActive : styles.navLink} href="/review">
            <Bi k="navReview" />
          </Link>
        </>
      )}
      {divider}
      {username && (
        <Link style={accountActive ? styles.nameActive : styles.name} href="/account">
          {username}
        </Link>
      )}
      <button style={styles.button} onClick={onLogout} disabled={signingOut}>
        {signingOut ? <Bi k="navSigningOut" /> : <Bi k="navLogOut" />}
      </button>
    </>
  ) : (
    <>
      <Link style={contributeActive ? styles.navActive : styles.navLink} href={contributeHref}>
        <Bi k="navContribute" />
      </Link>
      {divider}
      <Link style={styles.navLink} href="/login">
        <Bi k="logIn" />
      </Link>
      {divider}
      <Link style={styles.navLink} href="/signup">
        <Bi k="signUp" />
      </Link>
    </>
  );

  // Shared row style so links, the username, and logout all keep one look.
  const rowStyle = (active) =>
    active ? { ...styles.menuRow, ...styles.menuRowActive } : styles.menuRow;
  const pageCurrent = (active) => (active ? "page" : undefined);

  // --- collapsed menu: the same links as the inline row ---
  const menuLinks = user ? (
    <>
      <Link style={rowStyle(contributeActive)} href={contributeHref} onClick={close}>
        <Bi k="navContribute" />
      </Link>
      <Link
        style={rowStyle(myEntriesActive)}
        href="/my-entries"
        onClick={close}
        aria-current={pageCurrent(myEntriesActive)}
      >
        <Bi k="myEntries" />
      </Link>
      {isReviewer && (
        <Link
          style={rowStyle(reviewActive)}
          href="/review"
          onClick={close}
          aria-current={pageCurrent(reviewActive)}
        >
          <Bi k="navReview" />
        </Link>
      )}
      {username && (
        <Link
          style={rowStyle(accountActive)}
          href="/account"
          onClick={close}
          aria-current={pageCurrent(accountActive)}
        >
          {username}
        </Link>
      )}
      <div style={styles.menuDivider} aria-hidden="true" />
      <button
        style={rowStyle(false)}
        onClick={() => {
          close();
          onLogout();
        }}
        disabled={signingOut}
      >
        {signingOut ? <Bi k="navSigningOut" /> : <Bi k="navLogOut" />}
      </button>
    </>
  ) : (
    <>
      <Link style={rowStyle(false)} href={contributeHref} onClick={close}>
        <Bi k="navContribute" />
      </Link>
      <Link style={rowStyle(false)} href="/login" onClick={close}>
        <Bi k="logIn" />
      </Link>
      <Link style={rowStyle(false)} href="/signup" onClick={close}>
        <Bi k="signUp" />
      </Link>
    </>
  );

  return (
    <nav ref={wrapperRef}>
      <HeaderStyles />
      <div className="hdr-inline">{inlineLinks}</div>
      <div className="hdr-menu">
        <button
          ref={buttonRef}
          style={styles.menuButton}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <span aria-hidden="true">☰</span>
          <Bi k="menu" />
        </button>
        {open && (
          <div id="site-menu" style={styles.panel}>
            {menuLinks}
          </div>
        )}
      </div>
    </nav>
  );
}