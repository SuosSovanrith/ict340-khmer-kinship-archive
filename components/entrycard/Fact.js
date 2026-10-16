import { styles } from "./EntryCardStyles.js";

export function Fact({ label, value }) {
  return (
    <div className="fact-row">
      <dt style={styles.factLabel}>{label}</dt>
      <dd style={styles.factValue}>{value}</dd>
    </div>
  );
}