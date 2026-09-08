import { styles } from "./EntryListStyles.js";

// The single search input above the entries grid. Fully controlled: EntryList
// owns the `query` state and hands it in via `value`/`onChange`.
export default function EntrySearchInput({ value, onChange }) {
  return (
    <div style={styles.searchWrap}>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search a term, a relation, a tag…"
        aria-label="Search Khmer kinship terms"
        style={styles.searchInput}
      />
    </div>
  );
}
