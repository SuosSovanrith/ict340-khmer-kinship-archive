import HighlightText from "../HighlightText.js";
import { Fact } from "./Fact.js";
import { styles } from "./EntryCardStyles.js";

export default function EntryFacts({ entry, query = "" }) {
  return (
    <dl style={styles.facts}>
      <Fact
        label="Relation"
        value={<HighlightText text={entry.relation_described} query={query} />}
      />
      {entry.also_used_for_non_relatives && (
        <Fact label="Non-relatives usage" value={entry.also_used_for_non_relatives} />
      )}
      {entry.region_or_family_variation && (
        <Fact label="Regional/family variation" value={entry.region_or_family_variation} />
      )}
    </dl>
  );
}