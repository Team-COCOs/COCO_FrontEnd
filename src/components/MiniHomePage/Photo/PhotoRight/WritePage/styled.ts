import styled from "styled-components";

export const WritePageStyle = styled.div`
  &.WritePage_wrap {
    width: 100%;
    height: 98%;
    overflow-y: auto;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    @media (max-width: 768px) {
      padding: 10px;
    }

    .WritePage_title {
      display: flex;
      align-items: center;
      gap: 10px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .WritePage_none {
        display: none;
      }

      .WritePage_titleText {
        margin-top: 5px;
        width: 40px;
        font-size: 13px;
        font-weight: bold;

        @media (max-width: 768px) {
          width: 100%;
          text-align: center;
        }
      }

      input {
        width: 100%;
        height: 27px;
        margin-top: 6px;
        padding: 5px 10px;
        border: 1px solid rgb(161, 161, 161);

        @media (max-width: 1020px) {
          width: 90%;
        }

        @media (max-width: 890px) {
          width: 80%;
        }

        @media (max-width: 768px) {
          width: 98%;
        }

        &:active,
        &:focus {
          outline: none;
        }
      }

      .WritePage_dropDown {
        width: 20%;
        white-space: nowrap;
        text-overflow: ellipsis;

        @media (max-width: 1020px) {
          width: 25%;
        }

        @media (max-width: 768px) {
          width: 98%;
        }

        .WritePage_btn {
          width: 100%;
          height: 27px;
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-weight: bold;
          background: linear-gradient(to bottom, #ffffff, #dddddd);
          border: 1px solid rgb(161, 161, 161);
          border-radius: 3px;
          cursor: pointer;

          @media (max-width: 1180px) {
            font-size: 12px;
          }

          &:active {
            background: linear-gradient(to top, #ffffff, #dddddd);
          }

          .WritePage_plus {
            font-weight: bold;
            font-size: 15px;
            margin-top: 2px;
            color: ${({ theme }) => theme.colors.mainColor};
          }
        }
      }
    }

    .WritePage_line {
      width: 98%;
      margin: 5px auto 0 auto;
      height: 2px;
      background-color: rgb(232, 232, 232);
    }

    .WritePage_btns {
      width: 98%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        width: 40px;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background: linear-gradient(to bottom, #ffffff, #dddddd);
        border: 1px solid rgb(161, 161, 161);
        border-radius: 3px;
        cursor: pointer;

        &:active {
          background: linear-gradient(to top, #ffffff, #dddddd);
        }
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
