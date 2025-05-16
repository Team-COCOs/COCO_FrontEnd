import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    mainColor: "#f87013",
    lightColor: "#fff4e6",
    tabColor: "#2686a3", // 오른쪽 탭
    bookColor: "#a6cfdb", // book 초록색 테두리 배경
    bookLineColor: "#8898a1", // book line color 흰색 dashed
    bookPageColor: "#f0f0f0", // book 페이지 컬러
    NavyColor: "#000080",
    blue: "#697dff",

    skin: {
      pink: {
        minihomepis: "#e5c7dc",
        diary: "#cfa2be",
        tab: "#ffadbf",
      },
      black: {
        minihomepis: "black",
        diary: "black",
        tab: "black",
      },
      green: {
        minihomepis: "#395f4a",
        diary: "#4a5245",
        tab: "", // ❌ 기본색 사용
      },
      blue: {
        minihomepis: "", // ❌ JPG 배경
        diary: "", // ❌ 기본색 사용
        tab: "#697dff",
      },
      default: {
        minihomepis: "", // JPG or transparent
        diary: "#a6cfdb",
        tab: "#395f4a",
      },
    },
  },
};

// book 배경 후보 민트색 : background-color: #56bfdc;
// book 테두리 민트 : #8898a1; #f0f0f0
// book 바느질 느낌 : #fffcfe;
export default theme;
