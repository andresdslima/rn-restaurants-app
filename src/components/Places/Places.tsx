import { useEffect, useRef } from "react";
import { Alert, Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import { Place } from "../Place/Place";
import { api } from "@/services/api";
import { router } from "expo-router";
import { MarketsProps } from "@/types/types";

type PlacesProps = {
  category: string;
  data: MarketsProps[];
  setData: (data: MarketsProps[]) => void;
};

export function Places({ category, data, setData }: PlacesProps) {
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: height - 128,
  };

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }

      const { data: markets } = await api.get("/markets/category/" + category);
      setData(markets);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possível carregar os locais.");
    }
  }

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
