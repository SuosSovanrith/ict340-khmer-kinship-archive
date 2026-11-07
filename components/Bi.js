import { fonts } from "../lib/theme.js";
import { UI_TEXT, fill } from "../lib/uiText.js";

// Bilingual text inside JSX: English, a separator, then the Khmer in its own
// span (Khmer font, no uppercase, no letter-spacing, lang="km").
// Usage: <Bi k="saveEntry" /> or <Bi k="hintOptionalMax" vars={{ max: 32 }} />
export default function Bi({ k, vars, separator = " · " }) {
  const t = UI_TEXT[k];
  if (!t) return k;
  return (
    <>
      {fill(t.en, vars)}
      {separator}
      <span
        lang="km"
        style={{ fontFamily: fonts.khmer, textTransform: "none", letterSpacing: "normal" }}
      >
        {fill(t.km, vars)}
      </span>
    </>
  );
}
