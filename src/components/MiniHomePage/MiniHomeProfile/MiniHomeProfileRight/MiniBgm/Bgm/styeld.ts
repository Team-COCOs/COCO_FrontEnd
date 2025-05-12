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

    .Bgm_tableHeader,
    .Bgm_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 8px 10px;
      font-size: 13px;
      border-bottom: 1px solid #e4e4e4;
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
  }

  .Bgm_footer {
    width: 100%;

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
