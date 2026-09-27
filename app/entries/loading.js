import { colors, fonts } from "../../lib/theme.js";

// Shown automatically by Next.js while the /entries Server Component's
// Supabase query is pending. Same container and dark-theme tokens as page.js.
const styles = {
  wrap: {
    maxWidth: 1550,
    margin: "0 auto",
    padding: "80px 16px",
  },
  card: {
    padding: "48px 24px",
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
  },
  label: {
    fontFamily: fonts.mono,
    color: colors.emerald,
    fontSize: 14,
    letterSpacing: 1,
    margin: "0 0 16px",
  },
  text: {
    fontSize: 15,
    color: colors.muted,
    margin: 0,
  },
};

export default function Loading() {
  return (
    <main style={styles.wrap}>
      <div style={styles.card}>
        <p style={styles.label}>KHMER LIVING ARCHIVE</p>
        <p style={styles.text}>Loading the terms…</p>
      </div>
    </main>
  );
}