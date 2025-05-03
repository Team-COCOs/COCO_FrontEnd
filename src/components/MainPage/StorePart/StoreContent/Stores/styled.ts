import { styled } from "styled-components";

export const StoresStyle = styled.div`
  &.Stores_wrap {
    margin-top: 15px;

    .Stores-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;

      .Stores_card {
        padding: 12px;
        text-align: center;
        margin-bottom: 70px;

        .Stores_itemImg {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }

        .Stores_mini {
          position: relative;
          width: 35%;
          height: 73%;
          margin: 0 auto;
        }

        .Stores_itemName {
          font-size: 15px;
          margin: 8px 0 4px;
          font-weight: bold;
        }

        .Stores_itemPrice {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .Stores_btnWrap button {
          padding: 1px 3px;
          border: none;
          background: rgb(155, 155, 155);
          color: white;
          font-weight: bold;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
`;
