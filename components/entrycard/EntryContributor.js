import { colors, fonts } from "../../lib/theme.js";

const styles = {
  contributor: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.muted,
    margin: "16px 0 0",
    overflowWrap: "anywhere",
  },
};

// Small muted byline naming who added an entry. Renders nothing when there is
// no contributor (e.g. anonymous/older entries) — the card just omits the line.
export default function EntryContributor({ name }) {
  if (!name) return null;
  return <p style={styles.contributor}>Contributed by {name}</p>;
}