import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    gap: 40,
  },
  tooltipTitle: {
    fontSize: 14,
    color: colors.gray[600],
    fontFamily: fontFamily.medium,
  },
  tooltipDescription: {
    fontSize: 12,
    color: colors.gray[600],
    fontFamily: fontFamily.regular,
  },
});
