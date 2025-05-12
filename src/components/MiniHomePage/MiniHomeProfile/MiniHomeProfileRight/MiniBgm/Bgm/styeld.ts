import styled from "styled-components";

export const BgmStyle = styled.div`
  width: 100%;
  border-radius: 12px;
  color: #333;

  .Bgm_table {
    width: 100%;

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
`;
