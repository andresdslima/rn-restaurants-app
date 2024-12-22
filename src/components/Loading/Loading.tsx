import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

interface LoadingProps {
  size?: "small" | "large";
}

export function Loading({ size = "small" }: LoadingProps) {
  return (
    <ActivityIndicator
      size={size}
      color={colors.green.base}
      style={styles.container}
    />
  );
}
