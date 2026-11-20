// Typing-animation helpers for the home page title.
//
// splitClusters(text): splits a string into the steps a typing animation
// should reveal, one at a time. Typing Khmer one code point at a time shows
// broken in-between states (a consonant followed by a bare subscript marker),
// so a Khmer syllable is kept together: a base consonant or independent vowel,
// plus every combining mark, plus a subscript marker (COENG) and the consonant
// that follows it. Latin text is split one character at a time. The rules are
// written out here instead of relying on Intl.Segmenter so every browser
// behaves the same.

const COENG = 0x17d2;

function isCombining(cp) {
  return (
    (cp >= 0x17b4 && cp <= 0x17d3) || // inherent vowels, dependent vowels, signs, COENG, BATHAMASAT
    cp === 0x17dd || // ATTHACAN
    cp === 0x200c || // ZWNJ
    cp === 0x200d || // ZWJ
    (cp >= 0x0300 && cp <= 0x036f) // combining marks on Latin letters
  );
}

export function splitClusters(text) {
  const out = [];
  let afterCoeng = false;
  for (const ch of String(text)) {
    const cp = ch.codePointAt(0);
    if (out.length > 0 && (afterCoeng || isCombining(cp))) {
      out[out.length - 1] += ch;
    } else {
      out.push(ch);
    }
    afterCoeng = cp === COENG;
  }
  return out;
}

// One loop of the animation lasts cycleMs: type the English line, pause, type
// the Khmer line, then hold the finished title until the loop restarts.
export const TYPING = {
  cycleMs: 5000,
  enMsPerChar: 55,
  kmMsPerCluster: 120,
  pauseMs: 250,
};

// What is visible `elapsedMs` after the animation started.
// Returns how many English characters and Khmer clusters to show and which
// line holds the caret.
export function frameAt(elapsedMs, enLen, kmLen, cfg = TYPING) {
  const t = ((elapsedMs % cfg.cycleMs) + cfg.cycleMs) % cfg.cycleMs;
  const kmStart = enLen * cfg.enMsPerChar + cfg.pauseMs;
  const en = Math.min(enLen, Math.floor(t / cfg.enMsPerChar));
  const km = t < kmStart ? 0 : Math.min(kmLen, Math.floor((t - kmStart) / cfg.kmMsPerCluster));
  return { en, km, caret: t < kmStart ? "en" : "km" };
}
