import styled from "styled-components";

export const WritePageStyle = styled.div`
  &.WritePage_wrap {
    width: 100%;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    .WritePage_title {
      display: flex;
      align-items: center;
      gap: 10px;

      .WritePage_none {
        display: none;
      }

      .WritePage_titleText {
        margin-top: 5px;
        width: 40px;
        font-size: 13px;
        font-weight: bold;
      }

      input {
        width: 100%;
        height: 27px;
        margin-top: 6px;
        padding: 5px 10px;
        border: 1px solid rgb(161, 161, 161);

        &:active,
        &:focus {
          outline: none;
        }
      }

      .WritePage_dropDown {
        width: 20%;

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

          &:active {
            background: linear-gradient(to top, #ffffff, #dddddd);
          }

          .WritePage_plus {
            font-weight: bold;
            font-size: 15px;
            color: ${({ theme }) => theme.colors.mainColor};
          }
        }
      }
    }
  }
`;
