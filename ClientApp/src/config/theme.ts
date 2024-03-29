import { createLightTheme, createDarkTheme, tokens } from '@fluentui/react-components';

const theme = {
    "10": "#5e3d00",
    "20": "#754c00",
    "30": "#8c5b00",
    "40": "#a36a00",
    "50": "#ba7800",
    "60": "#d18700",
    "70": "#e89600",
    "80": "#ffa500",
    "90": "#ffad17",
    "100": "#ffb52e",
    "110": "#ffbd45",
    "120": "#ffc55c",
    "130": "#ffce73",
    "140": "#ffd68a",
    "150": "#ffdea1",
    "160": "#ffe6b8"
  }
  
  export const customLightTheme = createLightTheme(theme);
  export const customDarkTheme = createDarkTheme(theme);
  
  
export const chartColors = [
  tokens.colorBrandForeground1,
  tokens.colorPaletteLightGreenBackground3,
  tokens.colorPaletteTealBorderActive,
  tokens.colorPaletteBlueForeground2,
  tokens.colorPaletteNavyBorderActive,
  tokens.colorPaletteRedBackground3,
  tokens.colorPalettePumpkinForeground2,
  tokens.colorPaletteBerryBackground3,
  tokens.colorPaletteGoldBorderActive,
]