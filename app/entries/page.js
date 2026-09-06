import { entries } from "../../data/entries.js";
import EntryList from "../../components/EntryList.js";
import { colors, fonts } from "../../lib/theme.js";

// Wider container than the landing page: the entries grid needs room to
// show multiple card columns. The landing page keeps its own narrow maxWidth.
const styles = {
  wrap: {
    maxWidth: 1150,
    margin: "0 auto",
    padding: "80px 24px",
  },
  kicker: {
    fontFamily: fonts.mono,
    color: colors.emerald,
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 40,
    fontWeight: 700,
    color: colors.gold,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  sub: {
    fontSize: 16,
    color: colors.muted,
    lineHeight: 1.6,
    margin: 0,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};

export default function Entries() {
  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>Browse the terms</h1>
      <p style={styles.sub}>
        Each card is one Khmer kinship term. Use the tabs to see how it&apos;s
        used across generations.
      </p>

      <EntryList entries={entries} />

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}