import Link from "next/link";
import collection from "../collection.config.js";
import { colors, fonts } from "../lib/theme.js";
import Bi from "../components/Bi.js";
import GenerationStrip from "../components/home/GenerationStrip.js";
import HomeStyles from "../components/home/HomeStyles.js";
import TypingTitle from "../components/home/TypingTitle.js";
import HeroVisual from "../components/home/HeroVisual.js";

// Hero, generation strip, info row. Only translucent gold/emerald glows sit
// outside the token palette.
const styles = {
  hero: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.bg,
    backgroundImage:
      "radial-gradient(circle at 12% 12%, rgba(212,175,55,0.12), transparent 45%), radial-gradient(circle at 88% 92%, rgba(46,230,168,0.08), transparent 45%)",
    borderBottom: `1px solid ${colors.border}`,
  },
  heroInner: {
    position: "relative",
    maxWidth: 1100,
    margin: "0 auto",
    padding: "clamp(40px, 8vw, 96px) clamp(16px, 4vw, 32px)",
  },
  kicker: {
    display: "inline-flex",
    flexWrap: "wrap", // pill wraps instead of overflowing at 320px
    justifyContent: "center",
    alignItems: "center",
    gap: 8, // restore the spaces lost around the "·" separator in flex layout
    fontFamily: fonts.mono,
    color: colors.emerald,
    border: `1px solid ${colors.emeraldDeep}`,
    borderRadius: 999,
    padding: "6px 14px",
    fontSize: 13,
    letterSpacing: 1,
    lineHeight: 1.6,
    margin: 0,
  },
  title: { fontFamily: fonts.serif, fontWeight: 700, color: colors.gold, fontSize: "clamp(34px, 4.6vw, 62px)", lineHeight: 1.08, margin: "20px 0 24px", overflowWrap: "break-word" },
  titleKm: { display: "block", fontFamily: fonts.khmer, color: colors.goldSoft, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.5, overflowWrap: "break-word" },
  descriptionWrap: { maxWidth: "64ch", borderLeft: `3px solid ${colors.goldSoft}`, paddingLeft: 20 },
  description: { margin: 0, color: colors.muted, fontSize: "clamp(16px, 2.2vw, 19px)", lineHeight: 1.7, textAlign: "justify", hyphens: "auto", textWrap: "pretty" },
  descriptionKm: { margin: "12px 0 0", color: colors.text, fontFamily: fonts.khmer, lineHeight: 1.9, textAlign: "justify" },
  cta: {
    display: "inline-flex",
    flexWrap: "wrap", // lets the button wrap to two lines on narrow screens
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    minHeight: 48,
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "0 28px",
    backgroundColor: colors.gold,
    color: colors.bg,
    borderRadius: 8,
    fontFamily: fonts.sans,
    fontWeight: 700,
    fontSize: 17,
    textDecoration: "none",
    marginTop: 36,
  },
  divider: { display: "flex", alignItems: "center", gap: 18, maxWidth: 1100, margin: "0 auto clamp(8px, 2vw, 24px)", padding: "0 clamp(16px, 4vw, 32px)" },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  diamond: { width: 10, height: 10, flexShrink: 0, transform: "rotate(45deg)", backgroundColor: colors.gold },
  infoRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto", padding: "clamp(8px, 2vw, 24px) clamp(16px, 4vw, 32px) clamp(40px, 6vw, 64px)" },
  card: { backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 24 },
  cardLabel: { fontFamily: fonts.mono, fontSize: 12, color: colors.muted, letterSpacing: 1, margin: 0 },
  cardValue: { fontSize: 17, color: colors.text, margin: "8px 0 0", lineHeight: 1.6 },
  cardValueKm: { fontFamily: fonts.khmer, lineHeight: 1.8, overflowWrap: "break-word" },
  footer: { maxWidth: 1100, margin: "24px auto 0", padding: "24px clamp(16px, 4vw, 32px) clamp(40px, 6vw, 64px)", borderTop: `1px solid ${colors.border}`, color: colors.faint, fontSize: 13, lineHeight: 1.6 },
};

export default function Home() {
  return (
    <main>
      <HomeStyles />

      <section aria-labelledby="home-title" style={styles.hero}>
        <div style={styles.heroInner} className="home-hero-grid">
          <div className="home-hero-copy">
            <p
              className="home-rise"
              style={{ ...styles.kicker, animationDelay: "0ms" }}
            >
              <Bi k="kicker" />
            </p>
            <TypingTitle
              id="home-title"
              en={collection.name}
              km={collection.nameKm}
              style={styles.title}
              kmStyle={styles.titleKm}
            />
            <div
              className="home-rise"
              style={{ ...styles.descriptionWrap, animationDelay: "160ms" }}
            >
              <p style={styles.description}>{collection.description}</p>
              <p lang="km" style={styles.descriptionKm}>
                <span lang="km" style={{ fontFamily: fonts.khmer }}>
                  {collection.descriptionKm}
                </span>
              </p>
            </div>
            <Link
              href="/entries"
              className="home-cta home-rise"
              style={{ ...styles.cta, animationDelay: "240ms" }}
            >
              <Bi k="browseTitle" />
              <span className="home-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <HeroVisual />
        </div>
      </section>

      <GenerationStrip />

      <div style={styles.divider} aria-hidden="true">
        <div style={styles.dividerLine} />
        <div style={styles.diamond} />
        <div style={styles.dividerLine} />
      </div>

      <section style={styles.infoRow}>
        <div style={styles.card}>
          <p style={styles.cardLabel}><Bi k="homeCuratedBy" /></p>
          <p style={styles.cardValue}>{collection.curator}</p>
        </div>
        <div style={styles.card}>
          <p style={styles.cardLabel}><Bi k="homeSource" /></p>
          <p style={styles.cardValue}>
            {collection.source}
            <br />
            <span lang="km" style={styles.cardValueKm}>
              {collection.sourceKm}
            </span>
          </p>
        </div>
      </section>

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}