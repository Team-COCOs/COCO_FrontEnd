import styled from "styled-components";

export const SignFormStyled = styled.div`
  &.Sign_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;
    padding: 30px 20px;
    gap: 20px;

    .Sign_container {
      width: 100%;
      display: flex;
      flex-direction: column;

      .Sign_text {
        font-size: 17px;
        color: ${({ theme }) => theme.colors.mainColor};
      }

      .Sign_line {
        width: 100%;
        height: 2px;
        background-color: gray;
      }
    }
  }
`;
