import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export const currentLocationMock = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export const credentialsMock = {
  email: "email@email.com",
  password: "123123",
};

export const stepsData = [
  {
    title: "Encontre estabelecimentos",
    description: "Veja locais perto de você que são parceiros Nearby",
    icon: IconMapPin,
  },
  {
    title: "Ative o cupom com QR Code",
    description: "Escaneie o código no estabelecimento para usar o benefício",
    icon: IconQrcode,
  },
  {
    title: "Garanta vantagens perto de você",
    description:
      "Ative cupons onde estiver, em diferentes tipos de estabelecimento",
    icon: IconTicket,
  },
];
