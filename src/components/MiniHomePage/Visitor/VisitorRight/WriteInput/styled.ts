import styled from "styled-components";

export const WriteInputStyle = styled.div`
  &.WtireInput_wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    background-color: rgb(247, 247, 247);
    border-top: 2.5px solid rgb(223, 223, 223);
    border-bottom: 2.5px solid rgb(223, 223, 223);
    padding: 10px 20px;

    .WriteInput_left {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .WriteInput_img {
        width: 100px;
        height: 100%;
        margin-bottom: 15px;
      }

      .WriteInput_homeImg {
        width: 90%;
        height: 90%;
      }

      .WriteInput_profile {
        display: flex;
        gap: 5px;
        align-items: center;
        position: relative;

        .Gulim {
          font-size: 13px;
          text-align: center;
          font-weight: bold;
          margin-top: 5px;
        }

        .WriteInput_choice {
          position: absolute;
          left: 50px;
          top: 2px;
          font-size: 11px;
          width: 50px;
          color: ${({ theme }) => theme.colors.mainColor};
          cursor: pointer;

          span {
            position: absolute;
            font-size: 8px;
            left: -3px;
            bottom: 4px;
          }
        }

        .WriteInput_dropdown {
          position: absolute;
          top: 20px;
          left: 45px;
          width: 50px;
          background-color: white;
          border: 1px solid rgb(170, 170, 170);
          font-size: 12px;
          padding: 5px;

          .WriteInput_line {
            border-bottom: 1px dotted rgb(195, 195, 195);
            margin: 5px 0;
          }

          div {
            cursor: pointer;
          }
        }
      }
    }

    .WriteInput_right {
      display: flex;
      flex-direction: column;
      align-items: end;
      gap: 10px;
      width: 70%;
      margin-left: 10px;

      textarea {
        resize: none;
        border: 1px solid rgb(183, 183, 183);
        width: 100%;
        height: 160px;
        padding: 10px;

        &:focus,
        &:active {
          outline: none;
        }
      }

      button {
        width: 35px;
        padding: 2px;
        background-color: rgb(243, 243, 243);
        border: 1px solid rgb(131, 131, 131);
        border-radius: 5px;
        cursor: pointer;

        &:focus,
        &:active {
          outline: none;
        }
      }
    }
  }
`;
