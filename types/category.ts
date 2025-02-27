import { SFSymbol } from "expo-symbols";

export type Category = {
  id: string;
  name: string;
  bgColor: string;
  colors: string[];
  icon: SFSymbol;
  size: number;
};