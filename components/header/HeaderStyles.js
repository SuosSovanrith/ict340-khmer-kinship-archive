"use client";

import { colors, fonts } from "../../lib/theme.js";

// Shared inline style objects for the header navigation. NOTE: the two layout
// wrappers (hdr-inline / hdr-menu) carry NO `display` here on purpose — their
// visibility is driven only by the global CSS below, so the media query wins.
// An inline display would override it and break the breakpoint.
export const styles = {
  // --- large-screen (.hdr-inline) ---
  navLink: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  // Active pill for a nav link on its own page.
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
  // Truncating username link: only the username shrinks, capped ~14 characters.
  name: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    flex: "0 1 auto",
    minWidth: "2.5ch",
    maxWidth: "14ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // Username link rendered as an active pill while on the account page.
  nameActive: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    flex: "0 1 auto",
    minWidth: "2.5ch",
    maxWidth: "14ch",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.gold}`,
    borderRadius: 6,
    padding: "clamp(3px, 1.2vw, 6px) clamp(5px, 1.6vw, 12px)",
  },
  // 1px vertical divider between inline links.
  vsep: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: colors.border,
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

  // --- small-screen (.hdr-menu) ---
  menuButton: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    padding: "6px 12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  // Dropdown panel, anchored under the button and right-aligned.
  panel: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 6,
    width: "min(280px, calc(100vw - 32px))",
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
    overflow: "hidden",
  },
  // One vertical row (Link or logout button): full width, 44px touch target,
  // left aligned, ellipsis so a long username never blows out the panel.
  menuRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: 44,
    padding: "0 16px",
    boxSizing: "border-box",
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
  },
  // Gold highlight + left accent for the current page.
  menuRowActive: {
    backgroundColor: colors.surfaceAlt,
    boxShadow: `inset 3px 0 0 ${colors.gold}`,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    margin: "4px 12px",
  },
};

// Global styles: the ONLY place the two wrappers get a display value. Switching
// between the inline row and the collapsed menu happens via this media query,
// so no JavaScript ever needs to know the viewport width.
export default function HeaderStyles() {
  return (
    <style jsx global>{`
      .hdr-inline {
        display: flex;
        align-items: center;
        gap: clamp(3px, 1.5vw, 10px);
        flex-wrap: nowrap;
        justify-content: flex-end;
        min-width: 0;
      }
      .hdr-menu {
        display: none;
      }
      @media (max-width: 1024px) {
        .hdr-inline {
          display: none;
        }
        .hdr-menu {
          display: block;
        }
      }
    `}</style>
  );
}