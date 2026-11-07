import Link from "next/link";
import Bi from "./Bi.js";
import { bi } from "../lib/uiText.js";
import { colors, fonts } from "../lib/theme.js";

// Previous / "Page X of Y" / Next. Renders nothing when there is one page.
// Pass hrefFor(page) from a server page (renders links), or onChange(page)
// from a client component (renders buttons). The disabled end is a plain span.
const base = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 44,
  padding: "0 16px",
  border: `1px solid ${colors.muted}`,
  borderRadius: 6,
  backgroundColor: "transparent",
  color: colors.text,
  fontFamily: fonts.sans,
  fontSize: 14,
  textDecoration: "none",
  cursor: "pointer",
};
const disabledStyle = { opacity: 0.4, cursor: "not-allowed", color: colors.muted };
const navStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 12,
  marginTop: 32,
};
const labelStyle = { fontFamily: fonts.sans, fontSize: 14, color: colors.muted };

function Control({ target, disabled, rel, hrefFor, onChange, children }) {
  if (disabled) {
    return (
      <span aria-disabled="true" style={{ ...base, ...disabledStyle }}>
        {children}
      </span>
    );
  }
  if (hrefFor) {
    return (
      <Link href={hrefFor(target)} rel={rel} style={base}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => onChange(target)} style={base}>
      {children}
    </button>
  );
}

export default function Pagination({ page, totalPages, hrefFor, onChange }) {
  if (!totalPages || totalPages <= 1) return null;
  return (
    <nav aria-label={bi("pagination")} style={navStyle}>
      <Control target={page - 1} disabled={page <= 1} rel="prev" hrefFor={hrefFor} onChange={onChange}>
        ← <Bi k="pagePrev" />
      </Control>
      <span style={labelStyle} aria-live="polite">
        <Bi k="pageOf" vars={{ page, pages: totalPages }} />
      </span>
      <Control target={page + 1} disabled={page >= totalPages} rel="next" hrefFor={hrefFor} onChange={onChange}>
        <Bi k="pageNext" /> →
      </Control>
    </nav>
  );
}
