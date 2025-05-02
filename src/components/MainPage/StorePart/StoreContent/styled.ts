import { styled } from "styled-components";

export const StoreStyle = styled.div`
  &.Store_wrap {
    padding: 10px 5px;

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
  }
`;
