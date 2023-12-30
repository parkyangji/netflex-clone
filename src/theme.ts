import { DefaultTheme } from "styled-components";

export const isPcCheck = {
  query: `(min-width : 1025px)`
}
export const isTabletCheck = {
  query: `(min-width : 769px) and (max-width : 1024px)`
}
export const isMobileCheck = {
  query: `(max-width : 768px)`
}

export const responsiveSize = {
  mobile : "768px",
  tablet : "1024px",
}

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
  mobile: `(max-width: ${responsiveSize.mobile})`,
  tablet: `(max-width: ${responsiveSize.tablet})`,
};