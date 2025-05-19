import styled from "styled-components";

/* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
export const VisitorRightStyled = styled.div`
  &.VisitorRight_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 98%;
    height: 95%;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;

    .VisitorRight_header {
      width: 92%;

      .Gulim {
        font-size: 10px;
        font-weight: bold;
      }

      .VisitorRight_headerFlex {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        .VisitorRight_management {
          width: 90%;
          height: 20px;
          padding: 5px;
          color: rgb(119, 119, 119);

          &:active,
          &:focus {
            outline: none;
          }
        }

        p {
          color: rgb(119, 119, 119);
        }

        .VisitorRight_headerIcon {
          width: 15px;
          height: 15px;
        }
      }

      .VisitorRight_headerBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 2px solid rgb(230, 230, 230);
        padding: 8px 15px;
        border-radius: 5px;

        .VisitorRight_headerBtn {
          background-color: rgb(165, 165, 165);
          color: white;
          border: none;
          width: 35px;
          border-radius: 5px;
          font-size: 10px;
          padding: 3px;
          cursor: pointer;

          &:active,
          &:focus {
            outline: none;
          }
        }
      }
    }

    .VisitorRight_profile,
    .VisitorRight_guestBook {
      padding: 0 25px;
      width: 100%;
    }

    @media (max-width: 1024px) {
      .VisitorRight_component_wrap {
        padding-left: 0px;
      }
    }

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
  }
`;
