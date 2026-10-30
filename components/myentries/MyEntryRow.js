import Link from "next/link";
import Bi from "../Bi.js";
import { colors, fonts } from "../../lib/theme.js";
import { STATUS_TEXT } from "../../lib/entryStatus.js";

const styles = {
  row: {
    padding: 20,
    marginBottom: 16,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
  },
  khmer: {
    fontFamily: fonts.khmer,
    fontSize: 22,
    color: colors.text,
    margin: "0 0 4px",
    lineHeight: 1.3,
  },
  romanized: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.emerald,
    margin: 0,
  },
  statusEn: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.muted,
    margin: "14px 0 4px",
  },
  statusKm: {
    fontFamily: fonts.khmer,
    fontSize: 14,
    color: colors.muted,
    lineHeight: 1.5,
    margin: 0,
  },
  edit: {
    display: "inline-block",
    marginTop: 16,
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: 700,
    color: colors.gold,
    textDecoration: "none",
    border: `1px solid ${colors.gold}`,
    borderRadius: 6,
    padding: "6px 12px",
  },
};

// Presentational row for one of the signed-in user's own entries. Falls back to
// the "pending" text if the stored status isn't one of the known keys.
export default function MyEntryRow({ entry }) {
  const status = STATUS_TEXT[entry.status] ?? STATUS_TEXT.pending;
  return (
    <article style={styles.row}>
      <h2 style={styles.khmer}>{entry.term_khmer}</h2>
      <p style={styles.romanized}>{entry.term_romanized}</p>
      <p style={styles.statusEn}>{status.en}</p>
      <p style={styles.statusKm}>{status.km}</p>
      <Link style={styles.edit} href={`/entries/${entry.id}/edit`}>
        <Bi k="edit" />
      </Link>
    </article>
  );
}