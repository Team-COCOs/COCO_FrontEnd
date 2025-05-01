import styled from "styled-components";

export const SignFormStyled = styled.div`
  &.Sign_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
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

        .Sign_div {
          display: flex;
          gap: 10px;
        }

        .Sign_input {
          width: 200px;
        }
      }
    }
  }
`;
