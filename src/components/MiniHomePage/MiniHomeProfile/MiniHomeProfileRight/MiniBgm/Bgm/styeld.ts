import styled from "styled-components";

export const BgmStyle = styled.div`
  width: 100%;
  border-radius: 12px;
  font-family: "Gulim", sans-serif;
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
      transition: background 0.2s;

      &:hover {
        background-color: rgb(245, 245, 245);
      }
    }

    .Bgm_column {
      flex: 1;
      text-align: center;
    }

    .Bgm_column.checkbox {
      flex: 0.5;
    }

    .Bgm_column.title {
      flex: 2;
      text-align: left;
      padding-left: 10px;
    }

    .Bgm_column.artist {
      flex: 1.5;
    }

    input[type="checkbox"] {
      transform: scale(1.1);
      accent-color: rgb(227, 227, 227);
      cursor: pointer;
    }
  }
`;
