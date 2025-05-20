import theme from "@/styles/theme";
import styled from "styled-components";

export const LoginStyle = styled.div`
  &.Login_wrap {
    border: 3px solid rgb(233, 233, 233);
    padding: 10px;

    .Login_form {
      display: flex;
      align-items: center;
      gap: 10px;

      .Login_inputs {
        display: flex;
        flex-direction: column;
        gap: 3px;

        input {
          height: 32px;
          padding-left: 5px;
          border: none;
          background-color: rgb(236, 236, 236);
          width: 100%;

          &::placeholder {
            font-size: 12px;
            font-weight: bold;
            color: rgb(172, 172, 172);
          }

          &:hover,
          &:active,
          &:focus {
            outline: none;
          }
        }
      }

      button {
        width: 40%;
        height: 60px;
        background-color: #b0b0b0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.7),
          inset 0 -2px 4px rgba(0, 0, 0, 0.2);

        font-size: 15px;
        font-weight: bold;
        color: white;

        &:hover {
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2),
            inset 0 -2px 4px rgba(235, 235, 235, 0.7);
        }

        &:active,
        &:focus {
          outline: none;
        }
      }
    }

    .Login_saveEmail {
      display: flex;
      align-items: center;
      gap: 3px;
      margin-top: 5px;

      input {
        width: 15px;
        height: 15px;
        appearance: none; /* 기본 제거 */
        background-color: rgb(236, 236, 236);
        border: none;
        border-radius: 0;
        cursor: pointer;

        &:checked {
          appearance: auto; /* 기본 체크박스 */
          background-color: initial;
        }
      }

      .Login_emailFont {
        font-size: 12px;
        font-weight: bold;
      }
    }

    .Loing_line {
      height: 3px;
      width: 100%;
      background-color: ${theme.colors.mainColor};
      margin-top: 3px;
    }

    .Login_etc {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 5px;

      font-size: 12px;
      font-weight: bold;

      .Login_gray {
        width: 2px;
        height: 13px;
        background-color: rgb(234, 234, 234);
      }

      .Login_join,
      .Login_find span {
        cursor: pointer;
      }
    }
  }
`;
