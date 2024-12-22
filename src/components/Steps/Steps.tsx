import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { Step } from "../Step/Step";
import { stepsData } from "@/data/data";

export function Steps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veja como funciona:</Text>
      <FlatList
        data={stepsData}
        renderItem={({ item }) => <Step {...item} />}
        keyExtractor={(item) => item.title}
        scrollEnabled={false}
      />
    </View>
  );
}
