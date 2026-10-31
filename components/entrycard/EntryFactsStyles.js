"use client";

// EntryFacts lives in a child component, so these styles must be
// global for styled-jsx to reach them. minmax(0, 1fr) on desktop too,
// so the value column can never blow out the card.
export default function EntryFactsStyles() {
  return (
    <style jsx global>{`
      .entry-facts {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        gap: 12px 16px;
      }

      .fact-row {
        display: contents;
      }

      @media (max-width: 560px) {
        .entry-facts {
          display: block;
        }

        .fact-row {
          display: block;
        }

        .fact-row + .fact-row {
          margin-top: 16px;
        }
      }
    `}</style>
  );
}
