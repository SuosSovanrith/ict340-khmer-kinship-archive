"use client";

import { useEffect, useRef, useState } from "react";
import EntryCard from "./entrycard/EntryCard.js";
import { entryMatches } from "../lib/searchEntries.js";
import EntrySearchInput from "./EntrySearchInput.js";
import EntrySearchEmptyState from "./EntrySearchEmptyState.js";
import Bi from "./Bi.js";
import { createClient } from "../lib/supabase/client.js";
import { styles } from "./EntryListStyles.js";
import Pagination from "./Pagination.js";
import { PAGE_SIZES, pageCount, clampPage } from "../lib/pagination.js";

// Orchestrates the /entries browse view. Owns the search `query` state, filters
// the `entries` prop in the browser, and composes the search input against the
// responsive grid (or the empty state when nothing matches).
//
// The grid needs a breakpoint, so it uses styled-jsx (built into Next.js)
// rather than an inline style object — inline styles have no media queries.
export default function EntryList({ entries }) {
  const [query, setQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [page, setPage] = useState(1);
  const topRef = useRef(null);
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

  // Client-side pagination. Filtering happens first (visible = ALL matching
  // entries across every page), then the current page slices that list.
  const pages = pageCount(visible.length, PAGE_SIZES.browse);
  const current = clampPage(page, pages);
  const pageEntries = visible.slice(
    (current - 1) * PAGE_SIZES.browse,
    current * PAGE_SIZES.browse
  );

  // A new page swaps the window and snaps the viewport back to the top.
  function goToPage(p) {
    setPage(p);
    topRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <>
      <div ref={topRef} />
      <p style={styles.entryCount}>
        <Bi k="entryCount" vars={{ shown: visible.length, total: entries.length }} />
      </p>
      <EntrySearchInput
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      {visible.length === 0 ? (
        <EntrySearchEmptyState query={query} />
      ) : (
        // Grid markup and CSS are untouched — only which cards render changes.
        <>
          <div className="entry-grid">
            {pageEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                query={query}
                currentUserId={currentUserId}
              />
            ))}
          </div>
          <Pagination page={current} totalPages={pages} onChange={goToPage} />
        </>
      )}

      <style jsx>{`
        .entry-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        @media (max-width: 900px) {
          .entry-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>

    </>
  );
}
