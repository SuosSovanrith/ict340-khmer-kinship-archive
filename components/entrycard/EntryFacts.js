import { Fact } from "./Fact.js";
import { styles } from "./EntryCardStyles.js";

export default function EntryFacts({ entry }) {
  return (
    <dl style={styles.facts}>
      <Fact label="Relation" value={entry.relation_described} />
      {entry.relative_age && <Fact label="Relative age" value={entry.relative_age} />}
      {entry.gender && <Fact label="Gender" value={entry.gender} />}
      <Fact label="Usage today" value={entry.usage_status_today} />
      {entry.formality && <Fact label="Formality" value={entry.formality} />}
      {entry.side_of_family && <Fact label="Side of family" value={entry.side_of_family} />}
    </dl>
  );
}