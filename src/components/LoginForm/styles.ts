import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    marginBottom: 28,
  }
});
