import { styles } from "./EntryListStyles.js";

// Shown when a search matches no entries. Copy is a draft — rewrite freely in
// the archive's own voice; the block is isolated here so wording stays separate
// from logic.
export default function EntrySearchEmptyState({ query }) {
  return (
    <div style={styles.emptyState}>
      <p style={styles.emptyTitle}>មិនទាន់មានពាក្យនេះទេ — this word isn&apos;t here yet</p>
      <p style={styles.emptyBody}>
        Nothing in the archive matches &ldquo;{query.trim()}&rdquo;. Every card here is
        gathered by hand from real speakers, one term at a time — this is a
        living archive and it&apos;s still under construction. If you know this
        word, tell the curator; it may earn the next card.
      </p> <br/>
      <p style={styles.emptyBody} lang="km">
        មិនមានអ្វីនៅក្នុងបណ្ណសារដែលត្រូវនឹង &ldquo;{query.trim()}&rdquo; ទេ។ កាតនីមួយៗនៅទីនេះ
        ត្រូវបានប្រមូលដោយដៃពីអ្នកនិយាយពិត ម្តងមួយពាក្យៗ — នេះជាបណ្ណសារដែលនៅតែមានជីវិត
        ហើយកំពុងសាងសង់បន្ថែម។ ប្រសិនបើអ្នកស្គាល់ពាក្យនេះ សូមប្រាប់អ្នកគ្រប់គ្រង
        វាអាចនឹងទទួលបានកាតបន្ទាប់។
      </p>
    </div>
  );
}
