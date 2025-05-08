import styled from "styled-components";

/* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
export const VisitorRightStyled = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .VisitorRight_wrap {
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
    .VisitorRight_component_wrap {
      width: 92%;
      height: 100%;
      padding-left: 10px;
    }
    @media (max-width: 1024px) {
      .VisitorRight_component_wrap {
        padding-left: 0px;
      }
    }
  }
`;
