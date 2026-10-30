import Bi from "../Bi.js";
import HighlightText from "../HighlightText.js";
import { Fact } from "./Fact.js";
import { styles } from "./EntryCardStyles.js";

export default function EntryFacts({ entry, query = "" }) {
  return (
    <dl className="entry-facts" style={styles.facts}>
      <Fact
        label={<Bi k="factRelation" />}
        value={<HighlightText text={entry.relation_described} query={query} />}
      />
      {entry.also_used_for_non_relatives && (
        <Fact label={<Bi k="factNonRelatives" />} value={entry.also_used_for_non_relatives} />
      )}
      {entry.region_or_family_variation && (
        <Fact label={<Bi k="factVariation" />} value={entry.region_or_family_variation} />
      )}
    </dl>
  );
}