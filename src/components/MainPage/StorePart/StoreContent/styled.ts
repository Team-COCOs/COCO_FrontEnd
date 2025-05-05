import { styled } from "styled-components";

export const StoreStyle = styled.div`
  &.Store_wrap {
    padding: 15px 5px;

    .Store_header {
      display: flex;
      justify-content: space-between;
      padding: 0 7px;

      b {
        color: ${({ theme }) => theme.colors.mainColor};
      }

      .Store_products {
        display: flex;
        align-items: center;
        gap: 7px;

        .Store_tap {
          display: flex;
          align-items: center;
        }

        p {
          font-size: 13px;
          font-weight: bold;
          color: rgb(129, 129, 129);
          cursor: pointer;
        }

        span {
          color: rgb(218, 218, 218);
          font-weight: bold;
          font-size: 13px;
          margin: 0 3px;
        }

        .Store_active {
          color: ${({ theme }) => theme.colors.mainColor};
        }
      }
    }

    .Store_line {
      width: 100%;
      height: 2.5px;
      margin-top: 7px;
      background-color: rgb(164, 164, 164);
    }

    .Store_pagination {
      display: flex;
      text-align: center;

      button {
        font-size: 10.8px;
        font-weight: 900;
        color: ${({ theme }) => theme.colors.mainColor};
        background-color: white;
        margin: 0 5px;
        padding: 0 3px;
        cursor: pointer;
        border-width: 2px 1px 1.5px 2px;
        border-style: solid;
        border-color: rgb(211, 211, 211);

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
`;
