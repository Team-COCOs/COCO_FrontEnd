import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      mainColor: string;
      lightColor: string;
      tabColor: string;
      bookColor: string;
      bookLineColor: string;
      bookPageColor: string;
      NavyColor: string;
    };
  }
}
