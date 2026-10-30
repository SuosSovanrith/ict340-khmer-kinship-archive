"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors, fonts } from "../lib/theme.js";

const styles = {
  link: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  hint: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.muted,
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  active: {
    fontFamily: fonts.mono,
    fontSize: "clamp(10px, 2.4vw, 13px)",
    color: colors.gold,
    backgroundColor: colors.surfaceAlt,
    border: `1px solid ${colors.gold}`,
    borderRadius: 6,
    padding: "clamp(3px, 1.2vw, 6px) clamp(5px, 1.6vw, 12px)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};

export default function ContributeLink({ authenticated }) {
  const pathname = usePathname();
  const active = pathname.startsWith("/contribute");
  const href = authenticated ? "/contribute" : "/login";
  const label = authenticated ? "Contribute" : "Log in to contribute";
  const style = active ? styles.active : authenticated ? styles.link : styles.hint;

  return (
    <Link style={style} href={href}>
      {label}
    </Link>
  );
}