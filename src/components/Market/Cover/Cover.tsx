import { ImageBackground, View } from "react-native";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import {Button} from "@/components/Button/Button";

type Props = {
  uri: string;
};

export function Cover({ uri }: Props) {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button
          icon={IconArrowLeft}
          iconSide="left"
          style={{ width: 40, height: 40 }}
          onPress={() => router.back()}
        />
      </View>
    </ImageBackground>
  );
}
