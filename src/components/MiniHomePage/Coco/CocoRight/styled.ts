import styled from "styled-components";

/* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
export const CocoRightStyled = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .CocoRight_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 95%;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    overflow-y: auto;
    overflow-x: hidden;
    /* 스크롤바 커스텀 */
    &::-webkit-scrollbar {
      width: 16px;
      background-color: #f0f0f0;
    }

    &::-webkit-scrollbar-track {
      background-color: rgb(237, 237, 237);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(215, 215, 215);
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: rgb(206, 206, 206);
    }

    &::-webkit-scrollbar-button {
      background-color: #e0e0e0;
      height: 16px;
      display: block;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><polygon points='5,2 2,6 8,6' fill='%23666'/></svg>");
      background-repeat: no-repeat;
      background-position: center;
    }

    &::-webkit-scrollbar-button:single-button:vertical:decrement {
      height: 16px;
      background-color: #e0e0e0;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><polygon points='5,2 2,6 8,6' fill='%23ffffff'/></svg>");
      background-repeat: no-repeat;
      background-position: center;
      border-bottom: 1px solid rgb(255, 255, 255);
    }

    /* 스크롤바 버튼 아래쪽 (▼) */
    &::-webkit-scrollbar-button:single-button:vertical:increment {
      height: 16px;
      background-color: #e0e0e0;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><polygon points='5,8 2,4 8,4' fill='%23ffffff'/></svg>");
      background-repeat: no-repeat;
      background-position: center;
      border-top: 1px solid rgb(255, 255, 255);
    }

    /* 나머지 버튼 제거 */
    &::-webkit-scrollbar-button:vertical:start:increment,
    &::-webkit-scrollbar-button:vertical:end:decrement {
      display: none;
    }

    .CocoRight_component_spanWrap {
      display: flex;
      flex-direction: column;
      padding: 20px;
      background: linear-gradient(to right, #e0f4ff, #f5fbff);
      border: 1px solid #d0e7f7;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
      color: #1e2d3e;
      max-width: 480px;
      margin: 20px auto;
    }

    .CocoRight_component_spanWrap span {
      padding: 12px 20px;
      margin-top: 10px;
      background-color: #ffffff;
      border-radius: 12px;
      border: 1px solid #e0ecf3;
      font-size: 15px;
      line-height: 1.6;
      color: #374151;
      font-family: "Inter", sans-serif;
    }

    .CocoRight_imgWrap {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .CocoRight_imgWrap img {
      width: 100px;
      height: 100px;
      border-radius: 12px;
      object-fit: cover;
    }

    .CocoRight_titleText {
      font-size: 20px;
      font-weight: 600;
      color: #0078d4;
      letter-spacing: 2.5px;
    }
    /* 반응형 스타일 */
    @media (max-width: 768px) {
      .CocoRight_component_spanWrap {
        padding: 16px;
        margin: 10px auto;
      }

      .CocoRight_imgWrap {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .CocoRight_imgWrap img {
        width: 80px;
        height: 80px;
      }

      .CocoRight_titleText {
        font-size: 18px;
        letter-spacing: 1px;
      }

      .CocoRight_component_spanWrap span {
        font-size: 14px;
        padding: 10px 16px;
      }
    }

    @media (max-width: 480px) {
      .CocoRight_component_spanWrap {
        padding: 12px;
      }

      .CocoRight_imgWrap img {
        width: 60px;
        height: 60px;
      }

      .CocoRight_titleText {
        font-size: 16px;
      }

      .CocoRight_component_spanWrap span {
        font-size: 13px;
        padding: 8px 12px;
      }
    }
  }
`;
