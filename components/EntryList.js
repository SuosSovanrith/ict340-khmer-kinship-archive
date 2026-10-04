"use client";

import { useEffect, useState } from "react";
import EntryCard from "./entrycard/EntryCard.js";
import { entryMatches } from "../lib/searchEntries.js";
import EntrySearchInput from "./EntrySearchInput.js";
import EntrySearchEmptyState from "./EntrySearchEmptyState.js";
import { createClient } from "../lib/supabase/client.js";
import { styles } from "./EntryListStyles.js";

// Orchestrates the /entries browse view. Owns the search `query` state, filters
// the `entries` prop in the browser, and composes the search input against the
// responsive grid (or the empty state when nothing matches).
//
// The grid needs a breakpoint, so it uses styled-jsx (built into Next.js)
// rather than an inline style object — inline styles have no media queries.
export default function EntryList({ entries }) {
  const [query, setQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const q = query.trim().toLowerCase();

  // The current user's id drives the owner-only Edit/Delete buttons. No session
  // (logged out) → null → no buttons; RLS remains the real enforcement.
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await createClient().auth.getUser();
        setCurrentUserId(data.user ? data.user.id : null);
      } catch {
        setCurrentUserId(null);
      }
    };
    load();
  }, []);

  // Empty (or whitespace-only) search shows every entry — no minimum length gate.
  const visible = q === "" ? entries : entries.filter((e) => entryMatches(e, q));

  return (
    <>
      <p style={styles.entryCount}>
        {visible.length} of {entries.length} entries
      </p>
      <EntrySearchInput value={query} onChange={(e) => setQuery(e.target.value)} />

      {visible.length === 0 ? (
        <EntrySearchEmptyState query={query} />
      ) : (
        // Grid markup and CSS are untouched — only which cards render changes.
        <div className="entry-grid">
          {visible.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              query={query}
              currentUserId={currentUserId}
            />
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