// Client-side search helper for the /entries browse view.
// Pure logic, no JSX — the caller (EntryList) filters the already-loaded
// `entries` array in the browser. See the searchable-field list below.

// Case-insensitive substring match across every searchable field.
// `tags` is an array — the entry matches if ANY one tag contains the query.
export function entryMatches(entry, q) {
  const haystacks = [
    entry.term_romanized,
    entry.term_khmer,
    entry.relation_described,
    entry.category,
  ];
  if (
    haystacks.some(
      (v) => typeof v === "string" && v.toLowerCase().includes(q)
    )
  ) {
    return true;
  }
  return (
    Array.isArray(entry.tags) &&
    entry.tags.some(
      (tag) => typeof tag === "string" && tag.toLowerCase().includes(q)
    )
  );
}
