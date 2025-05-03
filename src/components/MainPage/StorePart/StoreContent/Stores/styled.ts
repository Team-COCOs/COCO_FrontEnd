import { styled } from "styled-components";

export const StoresStyle = styled.div`
  &.Stores_wrap {
    margin-top: 10px;
    .store-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .store-card {
      border: 1px solid #ccc;
      padding: 12px;
      text-align: center;
      border-radius: 8px;
      background: #fff;
    }

    .item-img {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    .item-name {
      font-size: 15px;
      margin: 8px 0 4px;
      font-weight: bold;
    }

    .item-price {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .btn-wrap button {
      padding: 2px 3px;
      border: none;
      background: rgb(128, 128, 128);
      color: white;
      font-weight: bold;
      border-radius: 3px;
      cursor: pointer;
    }
  }
`;
