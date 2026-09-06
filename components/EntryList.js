"use client";

import EntryCard from "./entrycard/EntryCard.js";

// The grid needs a breakpoint, so it uses styled-jsx (built into Next.js)
// rather than an inline style object — inline styles have no media queries.
export default function EntryList({ entries }) {
  return (
    <>
      <div className="entry-grid">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>

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