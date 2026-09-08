"use client";

import { useState } from "react";
import EntryCard from "./entrycard/EntryCard.js";
import { entryMatches } from "../lib/searchEntries.js";
import EntrySearchInput from "./EntrySearchInput.js";
import EntrySearchEmptyState from "./EntrySearchEmptyState.js";

// Orchestrates the /entries browse view. Owns the search `query` state, filters
// the `entries` prop in the browser, and composes the search input against the
// responsive grid (or the empty state when nothing matches).
//
// The grid needs a breakpoint, so it uses styled-jsx (built into Next.js)
// rather than an inline style object — inline styles have no media queries.
export default function EntryList({ entries }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  // Empty (or whitespace-only) search shows every entry — no minimum length gate.
  const visible = q === "" ? entries : entries.filter((e) => entryMatches(e, q));

  return (
    <>
      <EntrySearchInput value={query} onChange={(e) => setQuery(e.target.value)} />

      {visible.length === 0 ? (
        <EntrySearchEmptyState query={query} />
      ) : (
        // Grid markup and CSS are untouched — only which cards render changes.
        <div className="entry-grid">
          {visible.map((entry) => (
            <EntryCard key={entry.id} entry={entry} query={query} />
          ))}
        </div>
      )}

      <style jsx>{`
        .entry-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        @media (max-width: 700px) {
          .entry-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}