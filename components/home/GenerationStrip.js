import { colors, fonts } from "../../lib/theme.js";
import { COHORT_KEYS } from "../../lib/uiText.js";
import Bi from "../Bi.js";

// Three informational cohort cards, in this order, each with its own accent
// along the top edge. Purely display — no links, no hover behavior.
const COHORT_ORDER = ["elder", "middle", "peer"];

const CARD_ACCENT = {
  elder: colors.gold,
  middle: colors.goldSoft,
  peer: colors.emerald,
};

const styles = {
  strip: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "clamp(32px, 6vw, 64px) clamp(16px, 4vw, 32px)",
  },
  heading: {
    fontFamily: fonts.serif,
    fontWeight: 700,
    color: colors.text,
    fontSize: "clamp(22px, 3.4vw, 30px)",
    lineHeight: 1.5, // room for the Khmer heading below the <br /> in <Bi>
    margin: "0 0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    padding: 20,
  },
  cardLabel: {
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 1.6, // tall enough for the Khmer label underneath
    color: colors.text,
    margin: 0,
  },
};

export default function GenerationStrip() {
  return (
    <section aria-labelledby="home-generations" style={styles.strip}>
      <h2 id="home-generations" style={styles.heading}>
        <Bi k="sectionGenerations" separator={<br />} />
      </h2>
      <div style={styles.grid}>
        {COHORT_ORDER.map((key) => (
          <div
            key={key}
            style={{ ...styles.card, borderTop: `3px solid ${CARD_ACCENT[key]}` }}
          >
            <p style={styles.cardLabel}>
              <Bi k={COHORT_KEYS[key]} separator={<br />} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}