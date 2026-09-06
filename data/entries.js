// Mock entries from entry-sketch.md.
// These will move to a database in Sprint 1; the component stays the same.
export const entries = [
  {
    id: "bong",
    term_khmer: "បង",
    term_romanized: "Bong",
    pronunciation: "bong",
    category: "Same generation",
    relation_described:
      "Generic term for an older sibling or older cousin (gender-neutral; can be specified as Bong Proh for male or Bong Srey for female)",
    also_used_for_non_relatives:
      "Yes, one of the most common polite ways to address anyone perceived as somewhat older than you, related or not",
    usage_notes:
      "Placed directly before a name, or used alone as direct address; never used toward someone younger than the speaker",
    region_or_family_variation: "",
    tags: ["sibling", "elder-address", "common", "gender-neutral"],
    photo_url: "/photos/bong.png",
    photo_caption:
      "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script",
    photo_credit: "ChatGPT, 2024-06-05, generated image",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Bong daily for anyone older in her age-group — older siblings, cousins, or close neighbors — and traditionally for a husband, as a normal term of closeness and respect for a Khmer wife. Says the word 'never go out of style' across her lifetime; the only change she's seen is couples now texting 'Bong'/'Oun' on Facebook instead of writing letters.",
      },
      middle: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Bong the same way she always has, for people older than her but not parent-age, including her husband when being affectionate. Noticeably more selective than younger generations: 'we used it mostly for people we actually knew or were related to. Strangers we were more shy to call bong right away.'",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Bong constantly, but much more broadly than the traditional definition — defaults to it for anyone who seems older even if she doesn't know them, including tuk-tuk drivers, coworkers, and strangers on Facebook Marketplace ('if I'm not sure how old someone is... I just default to bong, it's safer'). Also uses it as a romantic term regardless of actual age difference.",
      },
    },
  },
  {
    id: "oun",
    term_khmer: "អូន",
    term_romanized: "Oun",
    pronunciation: "oun",
    category: "Same generation",
    relation_described:
      "Generic term for a younger sibling or younger cousin; also widely used as an affectionate term between romantic partners regardless of relation",
    also_used_for_non_relatives:
      "Yes, used for anyone perceived younger, and notably as a term of endearment between partners",
    usage_notes:
      "Used as direct address or before a name; the romantic-partner usage is a separate, very common register from the sibling usage",
    region_or_family_variation: "",
    tags: ["sibling", "younger-address", "common", "romantic-usage"],
    photo_url: "/photos/oun.png",
    photo_caption:
      "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script",
    photo_credit: "ChatGPT, 2024-06-05, generated image",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Oun the same way throughout her life, for anyone younger in her circle — younger siblings, cousins, neighbors, or her household helper — and as an affectionate term for a younger husband. Says this hasn't changed, 'only now they do it through Facebook message instead of letter.'",
      },
      middle: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Oun consistently for people younger than her that she's close to — siblings, cousins, and sometimes her husband playfully. Notes younger generations now extend it to people met only online, which she doesn't do herself: 'for me, still just for people close to me, younger than me.'",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Oun often, and more broadly than the traditional in-group definition — for younger cousins, coworkers, and even a friendly stranger's teenager. Says she personally uses it more now that she's older and has more people younger than her around; no alternate word is replacing it for her generation.",
      },
    },
  },
  {
    id: "ming",
    term_khmer: "មីង",
    term_romanized: "Ming",
    pronunciation: "ming",
    category: "Parents' generation",
    relation_described:
      "Father's or mother's younger sister; Central Khmer usage typically doesn't distinguish which parent's side",
    also_used_for_non_relatives:
      "Yes, a common, polite way to address a woman roughly a parent's age or a bit younger",
    usage_notes:
      "Used as direct address, often before a first name; considered warm/respectful rather than overly formal",
    region_or_family_variation: "",
    tags: ["aunt", "parents-generation", "non-relative-address"],
    photo_url: "/photos/ming.png",
    photo_caption:
      "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script",
    photo_credit: "ChatGPT, 2024-06-05, generated image",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Still correctly uses Ming for her mother's or father's younger sister, or any woman roughly her parents' age. Observes — without it affecting her own usage — that some younger people now mix up Ming and Om, default to English 'Aunty,' or just say 'Bong' to avoid judging someone's age.",
      },
      middle: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Ming the same way she was taught, for a woman younger than her mother's generation but older than herself, related or not. Has noticed younger people sometimes 'guess, sometimes wrong' when distinguishing Ming from Om, since they don't judge age as carefully as her generation did.",
      },
      peer: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Ming exactly the way her mother does, for a woman around her parents' age but younger than 'Om' age, related or not. Hasn't noticed her own age group replacing it with anything else, though she says some younger kids are inconsistent and just default to 'Bong' for everyone — 'which honestly annoys the older ming's a little bit.'",
      },
    },
  },
  {
    id: "pou",
    term_khmer: "ពូ",
    term_romanized: "Pou",
    pronunciation: "pou",
    category: "Parents' generation",
    relation_described: "Father's or mother's younger brother",
    also_used_for_non_relatives:
      "Yes, commonly used to address a man somewhat younger than one's parents, e.g. a shopkeeper or driver",
    usage_notes:
      "Used as direct address, often before a name; carries a friendly, respectful tone",
    region_or_family_variation:
      "Some in the city now use the more formal \"Lok Pou\" instead of plain \"Pou\" (per Mom, from Kampong Chhnang, contrasting her own village usage). Separately, some Khmer-Chinese families use different aunt/uncle terms entirely at home (per Sister, Phnom Penh) — framed by her as a family/ethnic variation, not a generational shift.",
    tags: ["uncle", "parents-generation", "non-relative-address", "region-variation"],
    photo_url: "/photos/pou.png",
    photo_caption:
      "An image of the Kampong Chhnang province in Cambodia, reflecting the region's cultural and linguistic heritage",
    photo_credit: "Kampuchea Thmey Daily",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Still uses Pou for her father's or mother's younger brother, or any man in that generation, related or not — credits her own Pou with teaching her to fish as a child. Says the word itself is 'still strong,' though she's noticed some younger people default to 'Bong' for adult men rather than judging their age.",
      },
      middle: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Pou unchanged since childhood, for a father's or mother's younger brother or any man around that age, related or not, including strangers like a local moto-repair man. Notes a regional/formality difference rather than a generational one: 'in the city I hear some people use lok bpou or just skip straight to more formal words, but here in the province we still just say plain pou.'",
      },
      peer: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Pou the same way she was taught, and explicitly doesn't think it's changed generationally for her: 'it hasn't changed much for me.' Notes some Khmer-Chinese families use different uncle/aunt terms at home entirely, but frames that as a family/ethnic variation, not something her generation changed.",
      },
    },
  },
  {
    id: "om",
    term_khmer: "អ៊ំ",
    term_romanized: "Om",
    pronunciation: "om",
    category: "Parents' generation",
    relation_described:
      "Parent's older sibling, gender-neutral on its own; also the default generic term for \"uncle/aunt\" when exact relation isn't being specified",
    also_used_for_non_relatives:
      "Yes, extremely common, general-purpose respectful address for any adult roughly a parent's age or older",
    usage_notes:
      "Used alone or before a name; one of the most frequently heard kinship-derived address terms in daily life, related or not",
    region_or_family_variation: "",
    tags: ["uncle", "aunt", "parents-generation", "generic", "non-relative-address"],
    photo_url: "/photos/om.png",
    photo_caption:
      "A weathered Khmer inscription carved into an ancient sandstone temple wall, evoking the elegance of traditional Khmer script",
    photo_credit: "ChatGPT, 2024-06-05, generated image",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Still correctly distinguishes Om (older than her own parents, closer to grandparent age, e.g. her father's oldest brother) from Ming/Pou. At 80 she's now mostly addressed as 'Yay' (grandmother) herself. Describes a real decline in precision among younger, especially town, children — some now say 'Uncle'/'Auntie' in English, or default to Bong for everyone: 'old way slowly disappearing I think.'",
      },
      middle: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Om exactly as her grandmother taught her, for someone older than her own parents or a family friend of that same elder generation: 'this one hasn't changed for me at all.' Has noticed younger people sometimes apply Om a little early, to someone not quite old enough, just to be extra polite.",
      },
      peer: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Om carefully and says it 'hasn't shifted for me at all since I was little.' Flags what she calls 'the biggest generational shift out of all five': some younger Khmer kids in the city, especially those from international schools, substituting the English 'Uncle'/'Auntie' for Om specifically.",
      },
    },
  },
];
