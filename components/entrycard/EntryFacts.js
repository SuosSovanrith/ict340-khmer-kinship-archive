import { Fact } from "./Fact.js";
import { styles } from "./EntryCardStyles.js";

export default function EntryFacts({ entry }) {
  return (
    <dl style={styles.facts}>
      <Fact label="Relation" value={entry.relation_described} />
      {entry.also_used_for_non_relatives && (
        <Fact label="Non-relatives usage" value={entry.also_used_for_non_relatives} />
      )}
      {entry.region_or_family_variation && (
        <Fact label="Regional/family variation" value={entry.region_or_family_variation} />
      )}
    </dl>
  );
}