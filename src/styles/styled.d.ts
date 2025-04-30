import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      pointPurple: string;
      softPurple: string;
      mainPurple: string;
      accentPurple: string;
      accentHoverPurple: string;
      backgroundGray: string;
      inputPurple: string;
      mainColor: string;
    };
  }
}
