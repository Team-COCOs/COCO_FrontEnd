import styled from "styled-components";

export const SignFormStyled = styled.div`
  background-color: white;
  color: black;

  .Sign_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    height: 100vh;
    margin: 0 auto;
    padding: 30px 20px;
    gap: 20px;

    .Sign_text {
      font-size: 17px;
      margin-bottom: -15px;
      color: ${({ theme }) => theme.colors.mainColor};
    }

    .Sign_container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30px;

      .Sign_line {
        width: 100%;
        height: 3px;
        background-color: rgb(130, 130, 130);
        margin: 5px 0;
      }

      .Sign_form {
        margin-top: 15px;
        width: 80%;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .Sign_errorDiv {
          position: relative;
          width: 100%;
        }

        .Sign_center {
          display: flex;
          justify-content: center;
        }

        .Sign_div {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;

          .Sign_birthDiv,
          .Sign_birthRadio {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          @media (max-width: 965px) {
            & {
              flex-direction: column;
              text-align: center;

              .Sign_birthDiv {
                flex-direction: column;
                margin: 10px;

                label {
                  margin-bottom: 10px;
                }
              }

              .Sign_birthRadio {
                justify-content: center;
                margin: 10px 0;
              }

              .Sign_checkBtn {
                width: 30% !important;

                @media (max-width: 655px) {
                  & {
                    width: 70% !important;
                  }
                }
              }

              .longInput,
              .phoneInput {
                width: 70% !important;
                margin-bottom: 10px;
              }
            }
          }

          .mainFont {
            font-size: 14px;
            font-weight: bold;
          }

          .Sign_input {
            width: 170px;
            height: 40px;

            @media (max-width: 655px) {
              & {
                width: 150px;
              }
            }

            @media (max-width: 550px) {
              & {
                width: 130px;
              }
            }

            @media (max-width: 475px) {
              & {
                width: 100px;
              }
            }
          }

          .Sign_inputs {
            display: flex;
            align-items: center;
            gap: 10px;

            @media (max-width: 655px) {
              & {
                gap: 3px !important;
              }
            }
          }

          .longInput {
            width: 72%;

            @media (max-width: 655px) {
              & {
                width: 100% !important;
              }
            }
          }

          .phoneInput {
            width: 66%;

            @media (max-width: 655px) {
              & {
                width: 100% !important;
              }
            }
          }

          label {
            width: 100px;
          }

          input,
          select {
            border-width: 3px 2px 1px 3px;
            border-style: solid;
            border-color: rgb(211, 211, 211);
            padding-left: 10px;

            &:focus,
            &:active {
              outline: none;
            }
          }

          input[type="radio"] {
            appearance: none;
            -webkit-appearance: none;
            background-color: white;
            border: 2px solid #888;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            position: relative;
            cursor: pointer;
            box-shadow: inset 1px 1px 1px #aaa;

            &:checked::before {
              content: "";
              position: absolute;
              top: 2.5px;
              left: 2.5px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: ${({ theme }) => theme.colors.mainColor};
              box-shadow: inset 1px 1px 1px #aaa;
            }
          }

          .Sign_radioBtn {
            margin-left: 20px;
          }

          button {
            width: 85px;
            height: 40px;
            color: white;
            font-weight: bold;
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

          .Sign-PhoneCheck {
            width: 140px;

            &:disabled {
              cursor: not-allowed;
              pointer-events: none;
            }

            @media (max-width: 655px) {
              & {
                width: 70% !important;
              }
            }
          }

          .radioWidth {
            width: 30px;
          }
        }
        .Sign_error {
          position: absolute;
          font-size: 12px;
          width: 100%;
          text-align: center;
          color: red;

          @media (max-width: 450px) {
            font-size: 10px;
          }

          @media (max-width: 390px) {
            font-size: 9px;
          }
        }
      }
    }
  }
`;
