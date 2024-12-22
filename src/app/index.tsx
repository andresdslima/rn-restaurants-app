import { View, SafeAreaView } from "react-native";
import { globalStyles } from "./global";
import { Welcome } from "@/components/Welcome/Welcome";
import { Steps } from "@/components/Steps/Steps";
import { Button } from "@/components/Button/Button";
import { router } from "expo-router";

export default function Index() {
  return (
    // <SafeAreaView>
    <View style={globalStyles.container}>
      <Welcome />
      <Steps />
      <Button text="Começar" onPress={() => router.navigate("/login")} />
    </View>
  );
}
