import styled from "styled-components";

export const FindStyle = styled.div`
  background-color: white;
  color: black;

  &.Find_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    height: 100vh;
    margin: 0 auto;
    padding: 30px 20px;
    gap: 20px;

    .Find_text {
      font-size: 17px;
      margin-bottom: -15px;
      color: ${({ theme }) => theme.colors.mainColor};
    }

    .Find_line {
      width: 100%;
      height: 3px;
      background-color: rgb(130, 130, 130);
      margin: 10px 0;
      flex-grow: 0;
      flex-shrink: 0;
    }

    .Find_compros {
      width: 100%;
      display: flex;
      gap: 5px;

      @media (max-width: 768px) {
        & {
          flex-direction: column;
          justify-content: center;
        }

        .Find_centerLine {
          height: 1.5px !important;
          width: 100% !important;
          margin: 30px 0;
        }

        .InfoFind_wrap {
          margin-top: 10px !important;
          width: 100% !important;
        }

        .InfoFind_div {
          justify-content: center;
        }

        button {
          width: 50% !important;
        }

        .mainFont {
          font-size: 13px !important;
        }
      }

      .Find_centerLine {
        width: 1.5px;
        height: 350px;
        margin-right: 10px;
        background-color: rgb(230, 230, 230);
      }

      .InfoFind_wrap {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 49%;
        padding: 0 10px;
        margin-top: 35px;

        .InfoFind_header {
          font-size: 17px;
          font-weight: bold;
          color: rgb(118, 118, 118);
        }

        .IdFind_container {
          margin-top: 55px !important;

          @media (max-width: 768px) {
            & {
              margin-top: 10px !important;
            }
          }
        }

        .InfoFind_container {
          position: relative;
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;

          .InfoFind_div {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;

            .mainFont {
              font-size: 14px;
              font-weight: bold;
              width: 120px;
            }

            input {
              border-width: 3px 2px 1px 3px;
              border-style: solid;
              border-color: rgb(211, 211, 211);
              padding-left: 10px;
              width: 67%;
              height: 40px;

              &:focus,
              &:active {
                outline: none;
              }
            }
          }

          button {
            width: 100px;
            height: 40px;
            color: white;
            font-weight: bold;
            margin: 0 auto;
            background-color: ${({ theme }) => theme.colors.mainColor};
            box-shadow: inset 0 2px 4px rgb(255, 219, 183),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2);
            border: 1px solid #000000;
            cursor: pointer;

            &:hover {
              box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2),
                inset 0 -2px 4px rgb(255, 219, 183);
            }
          }

          .IdFind_btn {
            margin-top: 25px;
          }

          .InfoFind_errorDiv {
            position: relative;
            width: 100%;

            .InfoFind_error {
              position: absolute;
              font-size: 11px;
              margin-left: 133px;
              color: ${({ theme }) => theme.colors.mainColor};
            }

            .IdFind_result {
              margin-top: 5px;
            }
          }
        }
      }
    }
  }
`;
