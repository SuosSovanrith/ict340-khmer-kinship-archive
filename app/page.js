import Link from "next/link";
import collection from "../collection.config.js";
import { colors, fonts } from "../lib/theme.js";
import Bi from "../components/Bi.js";

const styles = {
  wrap: {
    maxWidth: 760,
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
    fontSize: 48,
    fontWeight: 700,
    color: colors.gold,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 18,
    color: colors.muted,
    lineHeight: 1.6,
    margin: 0,
  },
  card: {
    marginTop: 48,
    padding: 24,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
  },
  cardLabel: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.muted,
    margin: 0,
  },
  cardValue: {
    fontSize: 16,
    color: colors.text,
    margin: "6px 0 0",
  },
  browseLink: {
    display: "inline-block",
    marginTop: 48,
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.gold,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.faint,
  },
};

export default function Home() {
  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}><Bi k="kicker" /></p>
      <h1 style={styles.title}>
        {collection.name}
        <br />
        <span lang="km" style={{ fontFamily: fonts.khmer }}>
          {collection.nameKm}
        </span>
      </h1>
      <p style={styles.description}>
        {collection.description}
        <br />
        <span lang="km" style={{ fontFamily: fonts.khmer }}>
          {collection.descriptionKm}
        </span>
      </p>

      <div style={styles.card}>
        <p style={styles.cardLabel}><Bi k="homeCuratedBy" /></p>
        <p style={styles.cardValue}>{collection.curator}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}><Bi k="homeSource" /></p>
        <p style={styles.cardValue}>
          {collection.source}
          <br />
          <span lang="km" style={{ fontFamily: fonts.khmer }}>
            {collection.sourceKm}
          </span>
        </p>
      </div>

      <Link style={styles.browseLink} href="/entries">
        <Bi k="browseTitle" /> →
      </Link>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}