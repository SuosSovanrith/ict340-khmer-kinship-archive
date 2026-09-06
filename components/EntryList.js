import EntryCard from "./entrycard/EntryCard.js";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 24,
  },
};

export default function EntryList({ entries }) {
  return (
    <div style={styles.grid}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}