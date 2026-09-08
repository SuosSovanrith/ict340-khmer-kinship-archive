// EntryList Styles - Shared design tokens for the search input + empty state.
import { colors, fonts } from "../lib/theme.js";

export const styles = {
  searchWrap: { marginBottom: 32 },
  searchInput: {
    width: "100%",
    padding: "14px 16px",
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    fontFamily: fonts.sans,
    outline: "none",
  },
  emptyState: {
    padding: "56px 24px",
    textAlign: "center",
    borderTop: `1px solid ${colors.border}`,
  },
  emptyTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    fontWeight: 700,
    color: colors.gold,
    margin: "0 0 12px",
  },
  emptyBody: {
    fontSize: 15,
    lineHeight: 1.6,
    color: colors.muted,
    maxWidth: 560,
    margin: "0 auto",
  },
};
