import { createContext } from "react";
import { ColorSchemeName } from "react-native";
import { Colors } from "../constants/Colors";

export interface ThemeContextType {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
  theme: typeof Colors.light; // since both light/dark share same shape
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);