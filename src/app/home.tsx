import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Places } from "@/components/Places/Places";
import { Categories } from "@/components/Categories/Categories";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { PlaceProps } from "@/components/Place/Place";
import { globalStyles } from "./global";
import { router } from "expo-router";
import { currentLocationMock } from "@/data/data";

interface LocationProps {
  latitude: number;
  longitude: number;
}

export type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

export default function HomePage() {
  const [category, setCategory] = useState("");
  const [currentLocation, setCurrentLocation] = useState<
    LocationProps | undefined
  >(currentLocationMock);
  const [markets, setMarkets] = useState<MarketsProps[]>([]);

  const getCurrentLocation = async () => {
    //! For real world scenario
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        return Alert.alert("Location", "Por favor, habilite sua localização");
      }
      const location = await Location.getCurrentPositionAsync();
      // setCurrentLocation({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories onSelect={setCategory} selected={category} />
      {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            identifier="current"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            image={require("@/assets/location.png")}
          />
          {markets.map((market) => (
            <Marker
              key={market.id}
              identifier={market.id}
              coordinate={{
                latitude: market.latitude,
                longitude: market.longitude,
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
                <View>
                  <Text style={globalStyles.tooltipTitle}>{market.name}</Text>
                  <Text style={globalStyles.tooltipDescription}>
                    {market.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <Places category={category} data={markets} setData={setMarkets} />
    </View>
  );
}
