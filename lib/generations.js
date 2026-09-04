// Shared constants + helpers for the generation-comparison feature.
// See entry-sketch.md for what each field means and how to fill it in.
// "elder"/"middle"/"peer" are age cohorts relative to the contributor,
// not required family roles — see sources.config.js.

export const GENERATION_ORDER = ["elder", "middle", "peer"];

export const GENERATION_LABELS = {
  elder: "Grandparent-age",
  middle: "Parent-age",
  peer: "Your generation",
};

// Visual weight per status, oldest-to-newest reading shows the term
// visibly thinning out if it's fading. Keys must match the controlled
// vocabulary for `generations.*.still_used` in entry-sketch.md.
export const STATUS_STYLE = {
  Same: { width: "100%", color: "#2EE6A8" },
  Changed: { width: "70%", color: "#E8C870" },
  Replaced: { width: "40%", color: "#D4AF37" },
  Unused: { width: "15%", color: "#5A6373" },
};

// Figures out who to credit for one generation's answer on one entry:
// a per-entry override if this term's answer came from someone other
// than the contributor's standing three sources, otherwise the default
// source for that age cohort from sources.config.js.
export function resolveGenerationSource(entry, genKey, sources) {
  const gen = entry.generations?.[genKey];
  if (gen?.source_override) {
    return { description: gen.source_override };
  }

  const base = sources[genKey];
  if (!base) return { description: "Source not yet recorded" };

  const name = base.consentToCredit ? base.name : "Anonymous, by request";
  return { description: `${name} — ${base.relationToContributor}` };
}