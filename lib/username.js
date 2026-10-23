// Shared rules for contributor usernames — the display name shown publicly
// beside a contributor's entries. Plain logic, no JSX: the signup form imports
// this so the client-side rules and the hint text live in exactly one place.
// The database independently enforces length and reserved names; this module
// is the browser's copy of the same rules, applied before anything is sent.

export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 40;

// Reserved names, compared case-insensitively against the normalized value.
export const RESERVED_USERNAMES = [
  "admin",
  "administrator",
  "moderator",
  "curator",
  "staff",
  "support",
  "system",
];

// Shown under the signup field; kept here so the copy can't drift from the
// rules it describes.
export const USERNAME_HINT =
  "Letters in any script (including Khmer), digits, and . _ ' - ; 2 to 40 characters · shown publicly beside your entries.";

// Letters (any script, incl. Khmer), combining marks, and digits, with single
// separators (. _ ' -) between words; must start and end with a letter/digit.
const USERNAME_PATTERN = /^[\p{L}\p{M}\p{N}]+(?:[ ._'-][\p{L}\p{M}\p{N}]+)*$/u;

// Clean a raw input into the value actually submitted and stored. Khmer text
// pasted from other sources often carries U+200B zero-width spaces (which the
// database rejects), so they are stripped first; NFC folds visually identical
// composed/decomposed glyphs into one form; then surrounding and repeated
// whitespace is collapsed, so "ជា   សុវណ្ណ" and "ជា សុវណ្ណ" are the same name.
export function normalizeUsername(raw) {
  return String(raw || "")
    .replace(/\u200B/g, "")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");
}

// Runs every rule and returns an error string, or null when the username is
// valid. Normalizes first so validation always sees the stored value.
export function validateUsername(raw) {
  const username = normalizeUsername(raw);

  if (username.length === 0) return "Enter a username";

  // Count by code points, not UTF-16 units — combining marks (Khmer vowels,
  // subscript consonants) would otherwise inflate s.length and reject valid
  // names like "ជា សុវណ្ណរិទ្ធ".
  if (
    [...username].length < USERNAME_MIN_LENGTH ||
    [...username].length > USERNAME_MAX_LENGTH
  ) {
    return "Use 2 to 40 characters";
  }

  if (!USERNAME_PATTERN.test(username)) {
    return "Use letters or digits with only single . _ ' - between them";
  }

  if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
    return "That username is reserved";
  }

  return null;
}
