// All bilingual interface text in one place: English first, Khmer second.
// Display only. Database values (category strings, still_used values) stay
// English; CATEGORY_KEYS / STATUS_KEYS map those values to a label key.
// Use bi(key, vars) for plain strings (messages, <option> text, confirm()),
// and <Bi k="key" /> (components/Bi.js) when the text sits inside JSX.
// Placeholders like {max} are filled from the vars object.

export const UI_TEXT = {
  // --- contribute form: field labels ---
  termKhmer: { en: "TERM IN KHMER", km: "ពាក្យជាភាសាខ្មែរ" },
  romanized: { en: "ROMANIZED", km: "ជាអក្សរឡាតាំង" },
  pronunciation: { en: "PRONUNCIATION", km: "ការប្រកប" },
  category: { en: "CATEGORY", km: "ប្រភេទ" },
  relationDescribed: { en: "RELATION DESCRIBED", km: "ការពន្យល់ទំនាក់ទំនង" },
  alsoUsedForNonRelatives: { en: "ALSO USED FOR NON-RELATIVES", km: "ប្រើសម្រាប់មនុស្សមិនមែនជាសាច់ញាតិ" },
  usageNotes: { en: "USAGE NOTES", km: "ការប្រើប្រាស់" },
  regionOrFamilyVariation: { en: "REGION OR FAMILY VARIATION", km: "ភាពខុសគ្នាតាមតំបន់ ឬគ្រួសារ" },
  photo: { en: "PHOTO", km: "រូបថត" },
  photoCaption: { en: "PHOTO CAPTION", km: "ចំណងជើងរូបថត" },
  photoCredit: { en: "PHOTO CREDIT", km: "ប្រភពរូបថត" },
  stillUsed: { en: "STILL USED", km: "នៅប្រើ" },
  note: { en: "NOTE", km: "កំណត់ចំណាំ" },
  alternateTerm: { en: "ALTERNATE TERM", km: "ពាក្យជំនួស" },

  // --- contribute form: hints, sections, placeholders, buttons ---
  hintOptionalMax: { en: "(optional, max {max})", km: "(ស្រេចចិត្ត, អតិបរមា {max})" },
  hintPhotoKeepCurrent: {
    en: "(optional, keep current unless you pick a new one)",
    km: "(ស្រេចចិត្ត រក្សារូបបច្ចុប្បន្ន លុះត្រាតែអ្នកជ្រើសរើសរូបថ្មី)",
  },
  photoPolicy: {
    en: "JPEG, PNG, or WebP, max 5 MB. Never an identifiable portrait — this archive's policy is a photo of the word's handwriting by default.",
    km: "JPEG, PNG ឬ WebP ទំហំអតិបរមា 5 MB។ មិនត្រូវប្រើរូបថតមុខមនុស្សដែលអាចស្គាល់បានទេ — គោលការណ៍របស់បណ្ណសារនេះគឺប្រើរូបថតនៃអក្សរដៃរបស់ពាក្យនេះជាលំនាំដើម។",
  },
  sectionGenerations: { en: "How this word changes across generations", km: "របៀបដែលពាក្យនេះប្រែប្រួលតាមជំនាន់" },
  sectionPhoto: { en: "Photo", km: "រូបថត" },
  sectionTags: { en: "Tags", km: "ស្លាក" },
  chooseCategoryPlaceholder: { en: "Choose a category…", km: "ជ្រើសរើសប្រភេទ…" },
  choosePlaceholder: { en: "Choose…", km: "ជ្រើសរើស…" },
  saveEntry: { en: "Save entry", km: "រក្សាទុកអត្ថបទ" },
  saveChanges: { en: "Save changes", km: "រក្សាទុកការកែប្រែ" },
  saving: { en: "Saving…", km: "កំពុងរក្សាទុក…" },
  edit: { en: "Edit", km: "កែប្រែ" },
  delete: { en: "Delete", km: "លុប" },
  deleting: { en: "Deleting…", km: "កំពុងលុប…" },

  // --- cohort labels (form only; entry cards keep GENERATION_LABELS) ---
  cohortElder: { en: "Grandparent-age", km: "វ័យជីដូនជីតា" },
  cohortMiddle: { en: "Parent-age", km: "វ័យឪពុកម្តាយ" },
  cohortPeer: { en: "Your generation", km: "ជំនាន់របស់អ្នក" },

  // --- still_used display labels (values stay English) ---
  statusSame: { en: "Same", km: "នៅដដែល" },
  statusChanged: { en: "Changed", km: "បានផ្លាស់ប្តូរ" },
  statusReplaced: { en: "Replaced", km: "ត្រូវបានជំនួស" },
  statusUnused: { en: "Unused", km: "លែងប្រើ" },

  // --- category display labels (values stay English) ---
  catGrandparents: { en: "Grandparents' generation", km: "ជំនាន់ជីដូនជីតា" },
  catParents: { en: "Parents' generation", km: "ជំនាន់ឪពុកម្តាយ" },
  catSame: { en: "Same generation", km: "ជំនាន់ដូចគ្នា" },
  catChildren: { en: "Children's & grandchildren's generation", km: "ជំនាន់កូន និងចៅ" },
  catNonRelative: { en: "Non-relative honorific", km: "ពាក្យគោរពសម្រាប់អ្នកមិនមែនសាច់ញាតិ" },

  // --- validation and failure messages ---
  required: { en: "Required", km: "ត្រូវបំពេញ" },
  needsLetter: { en: "Needs at least one letter", km: "ត្រូវមានអក្សរយ៉ាងហោចណាស់មួយតួ" },
  rangeChars: { en: "{min}–{max} characters", km: "{min}–{max} តួអក្សរ" },
  maxChars: { en: "Max {max} characters", km: "អតិបរមា {max} តួអក្សរ" },
  maxTags: { en: "Max 8 tags", km: "ស្លាកអតិបរមា 8" },
  tagLength: { en: "Each tag is 1–32 characters", km: "ស្លាកនីមួយៗត្រូវមាន 1–32 តួអក្សរ" },
  tagsUnique: { en: "Tags must be unique", km: "ស្លាកមិនត្រូវស្ទួនគ្នាទេ" },
  chooseCategory: { en: "Choose a category", km: "សូមជ្រើសរើសប្រភេទ" },
  chooseStatus: { en: "Choose a status", km: "សូមជ្រើសរើសស្ថានភាព" },
  photoRequired: { en: "A photo is required", km: "ត្រូវការរូបថត" },
  photoType: { en: "Only JPEG, PNG, or WebP", km: "អនុញ្ញាតតែ JPEG, PNG ឬ WebP" },
  photoMax: { en: "Max 5 MB", km: "ទំហំអតិបរមា 5 MB" },
  pleaseLogin: { en: "Please log in to contribute.", km: "សូមចូលគណនីដើម្បីចូលរួមចំណែក។" },
  saveFailed: {
    en: "Could not save your entry. Please try again.",
    km: "មិនអាចរក្សាទុកអត្ថបទរបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។",
  },
  notSaved: { en: "That change wasn't saved", km: "ការផ្លាស់ប្តូរនេះមិនត្រូវបានរក្សាទុកទេ" },
  deleteConfirm: {
    en: "Delete \"{term}\" from the archive? This can't be undone.",
    km: "លុប \"{term}\" ចេញពីបណ្ណសារឬ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
  },

  // --- contribute page ---
  contributeTitle: { en: "Contribute a term", km: "ចូលរួមបន្ថែមពាក្យ" },
  contributeIntro: {
    en: "Add a kinship term you have gathered from a real conversation. Every entry is yours — curated by {curator}.",
    km: "បន្ថែមពាក្យហៅសាច់ញាតិដែលអ្នកប្រមូលបានពីការសន្ទនាជាក់ស្តែង។ រាល់អត្ថបទជារបស់អ្នក — រៀបចំដោយ {curator}។",
  },
  loginToContribute: { en: "Log in to contribute", km: "ចូលគណនីដើម្បីចូលរួមចំណែក" },
  loginToContributeBody: {
    en: "Only signed-in contributors can add an entry to {collection}.",
    km: "មានតែអ្នកចូលរួមដែលបានចូលគណនីប៉ុណ្ណោះដែលអាចបន្ថែមអត្ថបទទៅក្នុង {collection}។",
  },
  logIn: { en: "Log in", km: "ចូលគណនី" },
  signUp: { en: "Sign up", km: "ចុះឈ្មោះ" },

  // --- login / signup / username ---
  email: { en: "EMAIL", km: "អ៊ីមែល" },
  password: { en: "PASSWORD", km: "ពាក្យសម្ងាត់" },
  username: { en: "USERNAME", km: "ឈ្មោះអ្នកប្រើ" },
  signingIn: { en: "Signing in…", km: "កំពុងចូល…" },
  creatingAccount: { en: "Creating account…", km: "កំពុងបង្កើតគណនី…" },
  noAccount: { en: "No account?", km: "មិនទាន់មានគណនី?" },
  haveAccount: { en: "Already have an account?", km: "មានគណនីរួចហើយ?" },
  signupIntro: {
    en: "Create an account so you can contribute your own kinship terms.",
    km: "បង្កើតគណនី ដើម្បីអាចចូលរួមបន្ថែមពាក្យហៅសាច់ញាតិរបស់អ្នក។",
  },
  invalidLogin: { en: "Invalid email or password", km: "អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ" },
  createAccountFailed: { en: "Could not create your account.", km: "មិនអាចបង្កើតគណនីរបស់អ្នកបានទេ។" },
  usernameTaken: { en: "That username is taken", km: "ឈ្មោះអ្នកប្រើនេះមានគេប្រើរួចហើយ" },
  usernameReserved: { en: "That username is reserved", km: "ឈ្មោះអ្នកប្រើនេះត្រូវបានបម្រុងទុក" },
  enterUsername: { en: "Enter a username", km: "សូមបញ្ចូលឈ្មោះអ្នកប្រើ" },
  usernameLength: { en: "Use 2 to 40 characters", km: "ប្រើ 2 ដល់ 40 តួអក្សរ" },
  usernameChars: {
    en: "Use letters or digits with only single . _ ' - between them",
    km: "ប្រើអក្សរ ឬលេខ ដោយអាចមានសញ្ញា . _ ' - មួយតួប៉ុណ្ណោះនៅចន្លោះ",
  },
  usernameCheckFailed: {
    en: "Could not check that username. Please try again.",
    km: "មិនអាចពិនិត្យឈ្មោះអ្នកប្រើនេះបានទេ។ សូមព្យាយាមម្តងទៀត។",
  },
  usernameSaveFailed: {
    en: "Could not save your username. Please try again.",
    km: "មិនអាចរក្សាទុកឈ្មោះអ្នកប្រើរបស់អ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។",
  },
  usernameHint: {
    en: "Letters in any script (including Khmer), digits, and . _ ' - ; 2 to 40 characters · shown publicly beside your entries.",
    km: "អក្សរនៃភាសាណាក៏បាន (រួមទាំងខ្មែរ) លេខ និង . _ ' - ; 2 ដល់ 40 តួអក្សរ · បង្ហាញជាសាធារណៈនៅក្បែរអត្ថបទរបស់អ្នក។",
  },

  // --- my entries and back links ---
  myEntries: { en: "My entries", km: "អត្ថបទរបស់ខ្ញុំ" },
  noEntriesTitle: { en: "No entries yet", km: "មិនទាន់មានអត្ថបទ" },
  noEntriesBody: {
    en: "You haven't contributed any terms to the archive. Add your first one and it will appear here.",
    km: "អ្នកមិនទាន់បានបន្ថែមពាក្យណាមួយទៅក្នុងបណ្ណសារទេ។ បន្ថែមពាក្យដំបូងរបស់អ្នក ហើយវានឹងបង្ហាញនៅទីនេះ។",
  },
  loadEntriesFailed: { en: "Could not load your entries.", km: "មិនអាចផ្ទុកអត្ថបទរបស់អ្នកបានទេ។" },
  backHome: { en: "Home", km: "ទំព័រដើម" },
  backEntries: { en: "Entries", km: "អត្ថបទ" },
};

// Exact database values -> label key. Keys here must match the CHECK constraints.
export const CATEGORY_KEYS = {
  "Grandparents' generation": "catGrandparents",
  "Parents' generation": "catParents",
  "Same generation": "catSame",
  "Children's & grandchildren's generation": "catChildren",
  "Non-relative honorific": "catNonRelative",
};

export const STATUS_KEYS = {
  Same: "statusSame",
  Changed: "statusChanged",
  Replaced: "statusReplaced",
  Unused: "statusUnused",
};

export const COHORT_KEYS = {
  elder: "cohortElder",
  middle: "cohortMiddle",
  peer: "cohortPeer",
};

export function fill(text, vars) {
  return String(text).replace(/\{(\w+)\}/g, (match, name) =>
    vars && name in vars ? String(vars[name]) : match
  );
}

// "English · Khmer" as one plain string. An unknown key returns the key itself
// so a typo shows up on screen instead of crashing the page.
export function bi(key, vars) {
  const t = UI_TEXT[key];
  if (!t) return key;
  return `${fill(t.en, vars)} · ${fill(t.km, vars)}`;
}

// Label for a database value (category or still_used); falls back to the raw
// value if it is not in the map.
export function labelFor(map, value, vars) {
  const key = map[value];
  return key ? bi(key, vars) : value;
}
