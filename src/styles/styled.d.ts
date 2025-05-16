// styled.d.ts
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
      NavyColor: string;
      blue: string;
      skin: {
        pink: {
          minihomepis: string;
          diary: string;
          tab: string;
        };
        black: {
          minihomepis: string;
          diary: string;
          tab: string;
        };
        green: {
          minihomepis: string;
          diary: string;
          tab: string;
        };
        blue: {
          minihomepis: string;
          diary: string;
          tab: string;
        };
        default: {
          minihomepis: string;
          diary: string;
          tab: string;
        };
      };
    };
  }
}
