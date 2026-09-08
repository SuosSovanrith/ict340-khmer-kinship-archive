import { styles } from "./EntryListStyles.js";

// Shown when a search matches no entries. Copy is a draft — rewrite freely in
// the archive's own voice; the block is isolated here so wording stays separate
// from logic.
export default function EntrySearchEmptyState({ query }) {
  return (
    <div style={styles.emptyState}>
      <p style={styles.emptyTitle}>រកមិនឃើញ — this word isn&apos;t here yet</p>
      <p style={styles.emptyBody}>
        Nothing in the archive matches &ldquo;{query.trim()}&rdquo;. Every card here is
        gathered by hand from real speakers, one term at a time — this is a
        living archive and it&apos;s still under construction. If you know this
        word, tell the curator; it may earn the next card.
      </p>
    </div>
  );
}
