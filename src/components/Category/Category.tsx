import { Text, Pressable } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/theme";
import { categoriesIcons } from "@/utils/categories-icons";
import { CategoryProps } from "@/types/types";

export function Category({
  name,
  id,
  isSelected = false,
  ...rest
}: CategoryProps) {
  const Icon = categoriesIcons[id];

  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  );
}
