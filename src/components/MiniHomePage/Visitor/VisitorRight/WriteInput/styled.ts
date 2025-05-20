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

    @media (max-width: 540px) {
      padding: 10px;
    }

    .WriteInput_left {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      .WriteInput_img {
        width: 80px;
        height: 100%;
        margin-bottom: 15px;
      }

      .WriteInput_man {
        width: 50px !important;
        margin-bottom: 5px !important;
      }

      .WriteInput_png {
        width: 75px !important;
        margin-bottom: 5px !important;
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
          font-size: 12px;
          text-align: center;
          font-weight: bold;
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
        height: 120px;
        padding: 10px;

        &:focus,
        &:active {
          outline: none;
        }
      }

      .WriteInput_btns {
        display: flex;
        align-items: center;
        gap: 10px;

        @media (max-width: 500px) {
          & {
            flex-direction: column;
            align-items: end;
          }
        }

        .WriteInput_boxBtn {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        span {
          font-size: 10px;
        }

        button {
          width: 30px;
          font-size: 10px;
          padding: 2px;
          background-color: rgb(243, 243, 243);
          border: 1px solid rgb(131, 131, 131);
          border-radius: 3px;
          cursor: pointer;

          &:focus,
          &:active {
            outline: none;
          }
        }
      }
    }
  }
`;
