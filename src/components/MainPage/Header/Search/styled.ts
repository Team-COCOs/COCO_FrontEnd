import { styled } from "styled-components";

export const SearchStyle = styled.div`
  &.Search_wrap {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 0 15px 20px;

    .Search_inputBack {
      width: 86%;
      height: 55px;
      border-radius: 50px;
      padding: 8px;
      background-color: ${({ theme }) => theme.colors.mainColor};

      .Search_input {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 50px;
        background-color: white;
        padding: 0 20px;

        .Search_select {
          width: 13%;
          color: ${({ theme }) => theme.colors.mainColor};
          font-weight: bold;
          font-size: 13.5px;
          margin-bottom: 2px;

          @media (max-width: 1240px) {
            font-size: 12px;
          }

          @media (max-width: 1200px) {
            font-size: 11px;
          }
        }

        input {
          width: 100%;
          height: 95%;
          border: none;
          font-size: 13px;

          &::placeholder {
            font-size: 13.5px;
            margin-top: 2px;
            color: rgb(177, 177, 177);
            font-weight: bold;
          }

          &:active,
          &:focus {
            outline: none;
          }
        }

        .Search_downBtn {
          border: 1px solid rgb(207, 207, 207);
          border-radius: 2px;
          padding: 5px;
          margin: 0 10px;
          display: flex;
          justify-content: center;
          cursor: pointer;

          .Search_triangle {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 6px solid rgb(225, 111, 4);
          }
        }
      }
    }

    .Search_btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 85px;
      height: 55px;
      margin-left: 2px;
      border-radius: 50px;
      background: linear-gradient(-10deg, rgb(215, 79, 1), rgb(255, 132, 49));
      padding: 13px;
      cursor: pointer;

      font-size: 15px;
      font-weight: bold;
      color: white;

      &:hover {
        background: linear-gradient(10deg, rgb(215, 79, 1), rgb(255, 132, 49));
      }
    }
  }
`;
