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
    photo_url: "photos/bong.png",
    photo_caption:
      "",
    photo_credit: "",
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
      "",
    photo_credit: "",
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
      "",
    photo_credit: "",
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
      "",
    photo_credit: "",
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
      "",
    photo_credit: "",
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
    {
    id: "ta",
    term_khmer: "តា",
    term_romanized: "Ta",
    pronunciation: "ta",
    category: "Grandparents' generation",
    relation_described: "Grandfather, or any elderly man addressed with respect",
    also_used_for_non_relatives:
      "Yes, extremely common — used for any elderly man regardless of relation, e.g. a vendor at the market or a security guard",
    usage_notes:
      "Used directly as address, often alone; considered a basic, universal term unlikely to sound rude even toward an elderly stranger",
    region_or_family_variation:
      "No different word found across any source — all three independently describe Ta as essentially uniform nationwide. Only accent-level variation reported: husband's relatives from Kampot draw it out ('taaa') per Mom; Kampong Chhnang relatives speak it with a flatter tone per Sister.",
    tags: ["grandparent", "elder-address", "common", "non-relative-address"],
    photo_url: "/photos/ta.png",
    photo_caption:
      "",
    photo_credit: "",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses plain Ta for her own grandfather growing up, and now for any old man, family or stranger — 'Ta is Ta, very simple, very old word, everybody know.' Says it hasn't changed for her personally, though she's noticed some younger people now add 'Lok Ta' for a stranger to sound more formal.",
      },
      middle: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses plain Ta for family and even a stranger vegetable seller she sees regularly, unchanged since childhood — but personally switches to 'Lok Ta' for a monk or someone of very high status, especially in a temple setting, to add extra respect.",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Ta the same way she always has for her actual grandfather and any clearly elderly man — but personally adds 'Lok Ta' for an elderly stranger, especially if he 'looks really old or important-looking,' to sound more formal; says she'd never use 'Lok Ta' with her own grandfather, 'that would sound too distant.'",
      },
    },
  },
  {
    id: "yay",
    term_khmer: "យាយ",
    term_romanized: "Yay",
    pronunciation: "yay",
    category: "Grandparents' generation",
    relation_described: "Grandmother, or any elderly woman addressed with respect",
    also_used_for_non_relatives:
      "Yes, extremely common — used for any elderly woman regardless of relation, e.g. a food vendor on the street",
    usage_notes:
      "Used directly as address, often alone; carries the same warmth and universality as Ta, for elderly women",
    region_or_family_variation:
      "No different base word found. Mom's cousin's in-laws (Battambang) sometimes say 'yay tuek' or append a name (e.g. 'Yay Sok') to tell apart multiple grandmothers in one household — a disambiguation habit, not a different word. Separately, Sister's father's-side relatives (also Battambang) occasionally still use a genuinely different, rarer word, 'chreay,' reserved for a great-grandmother-level elder, mostly among older speakers.",
    tags: ["grandparent", "elder-address", "common", "non-relative-address", "region-variation"],
    photo_url: "/photos/yay.png",
    photo_caption:
      "",
    photo_credit: "",
    generations: {
      elder: {
        still_used: "Same",
        alternate_term: "",
        note:
          "Uses Yay for her own grandmother growing up and, now that she's elderly herself, is called Yay by her own grandchildren even over the phone from Phnom Penh — 'that one never change, thank goodness.' Notes some younger people add 'Lok Yay' for an elderly female stranger, but doesn't describe this as her own habit.",
      },
      middle: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Yay for her own grandmother and for any elderly woman, related or not, unchanged since childhood — but personally adds 'Lok Yay' for someone especially respected, like a former teacher or a devout pagoda-goer, to be extra polite.",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Yay for her actual grandmother and for an elderly stranger, like a street vendor, to get her attention politely — but personally adds 'Lok Yay' specifically for a stranger, the same logic as her use of 'Lok Ta.' Also uses a personal shortened form, 'yay ei,' when calling her grandmother from another room.",
      },
    },
  },
  {
    id: "chao",
    term_khmer: "ចៅ",
    term_romanized: "Chao",
    pronunciation: "chao",
    category: "Children's & grandchildren's generation",
    relation_described:
      "Grandchild; also used for nieces, nephews, and other junior-generation relatives",
    also_used_for_non_relatives:
      "Yes — used loosely for any small child, related or not, especially by older speakers; used more when introducing a junior relative to someone else than as constant daily address",
    usage_notes:
      "Often used in third person to describe the relationship ('this is my Chao') rather than as constant direct address; for a very young baby, a nickname or the word 'koun' is commonly used instead until the child is a bit older",
    region_or_family_variation:
      "No different base word found — Elder's sister's family in Siem Reap uses Chao the same way for both grandchildren and nieces/nephews. Mother separately notes some Khmer-Chinese families in her area use their own Chinese-language term for grandchild at home instead — framed as language-mixing, not a Khmer regional variant, the same pattern already noted for Pou.",
    tags: ["grandchild", "niece-nephew", "junior-generation", "common"],
    photo_url: "/photos/chao.png",
    photo_caption:
      "",
    photo_credit: "",
    generations: {
      elder: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Chao for grandchildren, nieces, and nephews, and introduces them to others as 'my Chao' — but for a very young baby still, personally uses 'koun' (little one) or just a nickname, saving Chao for once the child is a bit older or for talking about them to someone else.",
      },
      middle: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Uses Chao loosely for her own grandchildren and any small child close to the family, the same way her own grandparents did — but personally switches to the child's name directly, or 'kmeng' (little kid), when scolding a naughty child rather than the warmer Chao.",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Reserves Chao specifically for a real grandparent-grandchild relationship, describing it as flowing more from an elder addressing her than the reverse — for an unrelated small child she doesn't know, personally says 'oun' or 'kmouy' instead, unlike her own grandmother who 'calls basically every kid in the neighborhood chao, even kids not related to us.'",
      },
    },
  },
  {
    id: "mak",
    term_khmer: "ម៉ាក់",
    term_romanized: "Mak",
    pronunciation: "mak",
    category: "Parents' generation",
    relation_described:
      "Mother, in everyday informal speech, contrasted with the more formal/literary word \"Mday\"",
    also_used_for_non_relatives:
      "Occasionally extended to a mother-in-law, or a very close older woman treated almost like one's own mother — not a general stranger-address term the way Ta/Yay/Bong are",
    usage_notes:
      "Used as both direct address and everyday reference to one's own mother; the formal counterpart 'Mday' is reserved for writing or very polite/literary speech, not daily conversation",
    region_or_family_variation:
      "Elder notes a Phnom Penh-style short form, 'Me,' contrasted with Battambang's fuller 'Mak'; her husband's family from deeper countryside says 'Mae' instead, which she frames as accent, not a different word. Separately, and independently, both Mother's husband's relatives near the Vietnamese border and Sister's husband's family from Svay Rieng report a genuinely distinct, Vietnamese-influenced form — 'mé'/'má' — a real cross-border variant, not just accent.",
    tags: ["mother", "parents-generation", "region-variation"],
    photo_url: "/photos/mak.png",
    photo_caption:
      "",
    photo_credit: "",
    generations: {
      elder: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Calls her own mother Mak every day, as her own children call her — but personally uses the more formal 'Mday' in writing or very polite speech. Notes a Phnom Penh-style short form 'Me' as different from Battambang's fuller 'Mak,' and that her husband's countryside relatives say 'Mae,' which she frames as just a village accent difference, not a different word.",
      },
      middle: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Calls her own mother Mak in daily life, unchanged since childhood — but personally uses the more formal 'Mae' when writing something official or explaining to a teacher. Notes younger people now mixing in English 'mommy,' which her own generation didn't do.",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Calls her mother Mak, not the 'very formal book-Khmer' Mday, which she says isn't something you'd say out loud at home — but personally uses 'Mae' interchangeably with Mak already, plus a personal pleading form, 'Mak oy.' Notes some younger cousins now say 'mommy' mixed into Khmer sentences, which her own generation didn't do growing up.",
      },
    },
  },
  {
    id: "puk",
    term_khmer: "ពុក",
    term_romanized: "Puk",
    pronunciation: "puk",
    category: "Parents' generation",
    relation_described:
      "Father, in everyday informal speech, contrasted with the more formal/literary word \"Ov\"/\"Aupuk\"",
    also_used_for_non_relatives:
      "Occasionally extended to a father-in-law, or a close older male figure treated in an almost-family way — not a general stranger-address term",
    usage_notes:
      "Used as both direct address and everyday reference to one's own father; the formal counterpart 'Ov'/'Aupuk' is reserved for writing or speaking to a monk, not daily conversation",
    region_or_family_variation:
      "Elder and Mother independently offer the same folk explanation for a third variant, 'Ba' — that it comes from French 'Papa' shortened over time — used by more educated or city families; both frame their own household as holding to the more traditional 'Puk.' Sister adds that even within one family, formality can already vary by sibling: her own father's family (Kampot) had some older siblings calling their own father the more formal 'euv' more often than 'puk.'",
    tags: ["father", "parents-generation", "region-variation"],
    photo_url: "/photos/puk.png",
    photo_caption:
      "",
    photo_credit: "",
    generations: {
      elder: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Calls her own father Puk, and her children called their father (her late husband) Puk too — but personally uses the more formal 'Ov' or written 'Aupuk' for writing or speaking to a monk. Notes some of her husband's countryside relatives say 'Ba' instead, which she guesses comes from French 'Papa' shortened, but says her own side of town holds to the more traditional 'Puk.'",
      },
      middle: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Calls her father Puk and sometimes extends it to her father-in-law, unchanged since childhood — but personally uses the more formal 'ov'/'ovpuk' when talking to officials about 'my parents.' Notes an uncle's family in Phnom Penh raising their kids to say the more modern-sounding 'Ba' instead.",
      },
      peer: {
        still_used: "Changed",
        alternate_term: "",
        note:
          "Calls her father Puk, not the 'too textbook' formal 'ov'/'euv' — but personally uses 'pa' almost interchangeably with Puk already, 'depending on my mood.' Notes her own father's family (Kampot) already had internal variation growing up: his older siblings called their father the more formal 'euv' more often than 'puk.'",
      },
    },
  },
];
