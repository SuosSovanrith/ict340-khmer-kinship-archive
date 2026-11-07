// Shared paging helpers. Page sizes are per list: browse cards are big, review
// cards are taller still, and the contributor's own rows are small.
export const PAGE_SIZES = { browse: 6, review: 5, myEntries: 10 };

// Reads a ?page= value from the URL. Only a plain positive whole number of up
// to four digits counts; anything else (missing, 0, negative, letters, "1e3",
// leading zeros, arrays) is page 1. The result is the only thing that may reach
// a query.
export function parsePage(value) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string" || !/^[1-9][0-9]{0,3}$/.test(raw)) return 1;
  return Number(raw);
}

export function pageCount(total, size) {
  return Math.max(1, Math.ceil((total || 0) / size));
}

export function clampPage(page, pages) {
  return Math.min(Math.max(1, page), pages);
}

// Inclusive row range for supabase .range(from, to).
export function rangeFor(page, size) {
  const from = (page - 1) * size;
  return { from, to: from + size - 1 };
}
