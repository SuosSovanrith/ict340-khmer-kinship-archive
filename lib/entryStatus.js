// Human-readable labels for an entry's review/workflow status, in English and
// Khmer. Keyed by the `status` value stored on each entry row. The Khmer text
// is first-class content and must never be edited or "improved".
export const STATUS_TEXT = {
  pending: {
    en: "Waiting for review",
    km: "កំពុងរង់ចាំការពិនិត្យ",
  },
  published: {
    en: "Published",
    km: "បានផ្សព្វផ្សាយ",
  },
  returned: {
    en: "Returned: please edit it and save to send it again",
    km: "ត្រូវបានបញ្ជូនត្រឡប់វិញ៖ សូមកែប្រែ ហើយរក្សាទុកដើម្បីបញ្ជូនម្តងទៀត",
  },
};