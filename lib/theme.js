// ============================================================
//  Shared design tokens for the Khmer Kinship Terms Archive
//
//  Premium dark theme with gold + emerald accents representing
//  Khmer cultural heritage. Import these constants anywhere in
//  the app so styling stays consistent across components.
// ============================================================

// Color palette — dark base, gold primary accent, emerald secondary
export const colors = {
  // Backgrounds
  bg: "#14181F",          // page background (matches layout.js)
  surface: "#1C222C",     // card background (matches existing page.js)
  surfaceAlt: "#222B38",  // slightly lighter surface for nested blocks
  border: "#2E3644",      // card / divider borders

  // Text
  text: "#E8EDF2",        // primary text
  muted: "#97A1B3",        // secondary / label text
  faint: "#5A6373",        // footer / very subtle text

  // Accents — Khmer cultural palette
  gold: "#D4AF37",         // primary accent (Khmer script, headings)
  goldSoft: "#E8C870",     // lighter gold for hover/secondary gold
  emerald: "#2EE6A8",      // secondary accent (status, romanized terms)
  emeraldDeep: "#1FA37C",  // deeper emerald for badges/borders
};

// Font stacks — serif for Khmer script headings, sans for body, mono for labels
export const fonts = {
  // Khmer script renders beautifully in a serif; Georgia is universally
  // available and Noto Serif is a graceful fallback if installed.
  serif: 'Georgia, "Noto Serif", "Times New Roman", serif',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: "'Courier New', monospace",
};