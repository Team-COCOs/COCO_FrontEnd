import styled from "styled-components";

export const SignFormStyled = styled.div`
  &.Sign_wrap {
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

      .Sign_line {
        width: 100%;
        height: 3px;
        background-color: rgb(130, 130, 130);
        margin: 5px 0;
      }

      .Sign_form {
        margin-top: 15px;
        width: 80%;
        gap: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .Sign_div {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;

          .mainFont {
            font-size: 14px;
            font-weight: bold;
          }

          .Sign_input {
            width: 170px;
            height: 40px;
          }

          .longInput {
            width: 70%;
          }

          .phoneInput {
            width: 66%;
          }

          label {
            width: 100px;
          }

          input {
            border-width: 3px 2px 1px 3px;
            border-style: solid;
            border-color: rgb(211, 211, 211);
            padding-left: 5px;
          }

          button {
            width: 85px;
            height: 40px;
            color: white;
            font-weight: bold;
            background-color: ${({ theme }) => theme.colors.mainColor};
          }

          .Sign-PhoneCheck {
            width: 140px;
          }
        }
      }
    }
  }
`;
