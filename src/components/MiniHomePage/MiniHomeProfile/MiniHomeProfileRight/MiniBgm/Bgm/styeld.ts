import styled from "styled-components";

export const BgmStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 12px;

  .Bgm_table {
    width: 100%;
    flex-grow: 1;
    overflow-x: auto;

    .Bgm_tableHeader,
    .Bgm_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 8px 10px;
      font-size: 13px;
      border-bottom: 1px solid #e4e4e4;

      @media (max-width: 768px) {
        & {
          min-width: 600px;
        }
      }
    }

    .Bgm_tableHeader {
      background-color: rgb(241, 241, 241);
      font-weight: bold;
      border-top: 2px solid rgb(232, 232, 232);
      border-bottom: 2px solid rgb(232, 232, 232);
    }

    .Bgm_item {
      background-color: rgb(255, 255, 255);

      &:hover {
        background-color: rgb(245, 245, 245);
      }
    }

    .Bgm_column {
      flex: 0.7;
      text-align: center;

      &.checkbox {
        flex: 0.3;
        display: inline-flex;
        align-items: center;
        cursor: pointer;

        input {
          display: none;
        }

        .custom-checkbox {
          width: 16px;
          height: 16px;
          border: 2px solid #ccc;
          border-radius: 3px;
          font-size: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: transparent;
        }

        input:checked + .custom-checkbox {
          background-color: rgb(242, 242, 242);
          color: #00c853;
        }
      }
    }

    .Bgm_column.title {
      flex: 2;
      text-align: left;
      padding-left: 10px;
    }

    .Bgm_column.artist {
      flex: 1.5;
      text-align: left;
    }

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

    /* 버튼 수정 중 */
    &::-webkit-scrollbar-button:horizontal {
      display: none;
    }
  }

  .Bgm_footer {
    width: 100%;

    @media (max-width: 768px) {
      margin-top: 20px;
    }

    .Bgm_pageNation {
      display: flex;
      gap: 7px;
      justify-content: center;
      align-items: center;

      button {
        all: unset;
        background-color: white;
        border-top: none;
        border-bottom: none;
        border-left: 2px solid rgb(231, 231, 231);
        border-right: 2px solid rgb(231, 231, 231);
        padding: 0 5px;
        color: rgb(157, 157, 157);
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;

        &.active {
          color: ${({ theme }) => theme.colors.mainColor};
        }
      }
    }
  }
`;
