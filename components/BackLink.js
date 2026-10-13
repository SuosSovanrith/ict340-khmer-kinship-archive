import Link from "next/link";
import { colors, fonts } from "../lib/theme.js";

const styles = {
  link: {
    display: "inline-block",
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.gold,
    textDecoration: "none",
    padding: "10px 12px 10px 0", // comfortable tap target (like a button)
    margin: "0 0 24px",
  },
};

// A small back link rendered above a page title. Takes { href, label }.
// Plain next/link with the same mono/gold styling as the links in
// AuthStatus.js; the decorative arrow is hidden from screen readers so
// they announce only the label.
export default function BackLink({ href, label }) {
  return (
    <Link href={href} style={styles.link}>
      <span aria-hidden="true">← </span>
      {label}
    </Link>
  );
}
