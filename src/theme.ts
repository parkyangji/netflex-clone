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
  mobile: `(max-width: ${responsiveSize.mobile})`,
  tablet: `(max-width: ${responsiveSize.tablet})`,
};