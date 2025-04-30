import styled from "styled-components";

export const LoginStyle = styled.div`
  &.Login_wrap {
    border: 3px solid rgb(219, 219, 219);
    padding: 10px;

    .Login_form {
      display: flex;
      align-items: center;
      gap: 7px;

      .Login_inputs {
        display: flex;
        flex-direction: column;
        gap: 3px;

        input {
          height: 30px;
          padding-left: 5px;
          border: none;
          background-color: rgb(236, 236, 236);
          width: 100%;

          &:hover,
          &:active,
          &:focus {
            outline: none;
          }
        }
      }

      button {
        width: 40%;
        height: 55px;
      }
    }
  }
`;
