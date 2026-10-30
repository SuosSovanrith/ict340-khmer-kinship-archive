import { styles } from "./EntryListStyles.js";
import { bi } from "../lib/uiText.js";

// The single search input above the entries grid. Fully controlled: EntryList
// owns the `query` state and hands it in via `value`/`onChange`.
export default function EntrySearchInput({ value, onChange }) {
  return (
    <div style={styles.searchWrap}>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={bi("searchPlaceholder")}
        aria-label={bi("searchAria")}
        style={styles.searchInput}
      />
    </div>
  );
}
