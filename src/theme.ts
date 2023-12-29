import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
  mobile: `(max-width : 767px)`,
  tablet: `(min-width : 768px) and (max-width : 1023px)`,
  pc: `(min-width : 1024px)`,
};