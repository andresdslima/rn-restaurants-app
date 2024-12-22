import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { styles } from "./styles";
import { colors } from "@/styles/theme";

type ButtonProps = TouchableOpacityProps & {
  text?: string;
  icon?: React.ComponentType<TablerIconProps>;
  iconSide?: "left" | "right";
  isLoading?: boolean;
};

export function Button({
  text,
  icon: Icon,
  iconSide,
  children,
  style,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        <>
          {Icon && iconSide === "left" && (
            <Icon size={24} color={colors.gray[100]} />
          )}
          {text && <Text style={styles.title}>{text}</Text>}
          {Icon && iconSide === "right" && (
            <Icon size={24} color={colors.gray[100]} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

// function Title({ children }: TextProps) {
//   return <Text style={s.title}>{children}</Text>;
// }

// type IconProps = {
//   icon: React.ComponentType<TablerIconProps>;
// };

// function Icon({ icon: Icon }: IconProps) {
//   return <Icon size={24} color={colors.gray[100]} />;
// }

// Button.Title = Title;
// Button.Icon = Icon;

// export { Button };
// Example: <Button> <Button.Title>Começar</Button.Title> <Button.Icon icon={IconPlus} /> </Button>
