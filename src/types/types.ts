import { PressableProps } from "react-native";

export type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

export type CategoryProps = PressableProps & {
  name: string;
  id: string;
  isSelected?: boolean;
};

export interface Rule {
  id: string;
  description: string;
};

export interface PropsDetails {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: Rule[];
}

export interface PlaceProps {
  id: string;
  name: string;
  description: string;
  coupons: number;
  cover: string;
  address: string;
}
