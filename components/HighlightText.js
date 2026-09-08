// Highlight every case-insensitive occurrence of `query` inside `text` with a
// <mark>, leaving surrounding text and the matched text's original casing
// untouched. Renders `text` unchanged when `query` is empty or absent.
import { styles } from "./entrycard/EntryCardStyles.js";

// Escapes RegExp metacharacters so a user typing `(` or `.` is treated
// literally rather than as a pattern (avoids a runtime error / surprises).
function escapeRegExp(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Khmer (like most Indic-family scripts) joins a base consonant to dependent
// vowel signs and subscript consonants (via the invisible COENG, U+17D2) into
// one *visual* letter made of several Unicode code points. Cutting that string
// at a raw code-unit index can orphan a combining mark, which then renders as
// a broken dotted-circle glyph. So a match is only highlighted when BOTH edges
// land exactly on a real grapheme boundary (found with Intl.Segmenter);
// otherwise it is emitted as plain, correctly-formed text, silently.
//
// NOTE: Intl.Segmenter segment objects expose their start offset as `index`,
// NOT `start` — using `.start` yields undefined and silently disables all
// highlighting. Keep `.index`.
export default function HighlightText({ text, query }) {
  if (typeof text !== "string" || !query) return text;

  const pattern = query.toLowerCase();
  if (!text.toLowerCase().includes(pattern)) return text;

  // No Intl.Segmenter in this runtime: render completely unhighlighted rather
  // than risk splitting a grapheme (or throwing).
  if (typeof Intl === "undefined" || typeof Intl.Segmenter !== "function") {
    return text;
  }

  // Record every grapheme boundary (each grapheme's start index). A grapheme's
  // end is the next boundary, or `text.length` for the final one.
  const boundaries = new Set();
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  for (const seg of segmenter.segment(text)) boundaries.add(seg.index);

  // Raw, case-insensitive [start, end) ranges, reusing the escaping above so a
  // `(`, `.`, etc. in the query is treated literally.
  const rawRanges = [];
  const regex = new RegExp(escapeRegExp(query), "gi");
  let m;
  while ((m = regex.exec(text)) !== null) {
    rawRanges.push({ start: m.index, end: m.index + m[0].length });
  }

  // Keep only occurrences whose start AND end sit exactly on grapheme
  // boundaries. Anything else renders plain and correct, no highlight.
  const aligned = rawRanges.filter(
    (r) =>
      boundaries.has(r.start) &&
      (r.end === text.length || boundaries.has(r.end))
  );

  if (aligned.length === 0) return text;

  // Walk the aligned matches in order, interleaving plain text and <mark>s.
  const nodes = [];
  let cursor = 0;
  for (const r of aligned) {
    if (r.start > cursor) nodes.push(text.substring(cursor, r.start));
    nodes.push(
      <mark key={r.start} style={styles.highlightMark}>
        {text.substring(r.start, r.end)}
      </mark>
    );
    cursor = r.end;
  }
  if (cursor < text.length) nodes.push(text.substring(cursor));

  return <>{nodes}</>;
}