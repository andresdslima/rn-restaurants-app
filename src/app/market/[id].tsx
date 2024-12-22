import { useEffect, useState, useRef } from "react";
import {
  View,
  Alert,
  Modal,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";
import {Button} from "@/components/Button/Button";
import {Loading} from "@/components/Loading/Loading";
import { Cover } from "@/components/Market/Cover/Cover";
import { Coupon } from "@/components/Market/Coupon/Coupon";
import { Details, PropsDetails } from "@/components/Market/Details/Details";
import { api } from "@/services/api";
import { colors } from "@/styles/theme";

type DataProps = PropsDetails & {
  cover: string;
};

export default function MarketDetailsPage() {
  const [data, setData] = useState<DataProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();
  const qrLock = useRef(false);
  console.log(params.id); //! For qr code

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Câmera", "Por favor, habilite o uso da câmera");
      }
      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Câmera", "Não foi possível utilizar a câmera");
    }
  }

  async function getCoupon(marketId: string) {
    try {
      setCouponIsFetching(true);
      const { data } = await api.patch("/coupons/" + marketId);
      if (marketId !== params.id) {
        return Alert.alert("Cupom", "Cupom inválido");
      }
      Alert.alert("Cupom", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Não foi possível utilizar o cupom");
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(marketId: string) {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(marketId) },
      ]
    );
  }

  function handleRefresh() {
    setIsLoading(true);
    fetchMarket();
    setTimeout(() => setIsLoading(false), 500);
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[colors.green.base]}
          />
        }
      >
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button text="Ler QR Code" onPress={handleOpenCamera} />
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data: marketId }) => {
            if (marketId && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(marketId), 500);
            }
          }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            text="Voltar"
            isLoading={couponIsFetching}
            onPress={() => !couponIsFetching && setIsVisibleCameraModal(false)}
            // onPress={() => setIsVisibleCameraModal(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
