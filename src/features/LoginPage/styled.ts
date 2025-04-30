import styled from "styled-components";

export const LoginStyled = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .loginForm-container1 {
    width: 80%;
  }

  .loginForm-container {
    width: 520px;
    padding: 40px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .loginForm-idDiv {
    margin-bottom: 20px;
    width: 100%;
    position: relative;
  }
  .loginForm-seePw {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }

  .loginForm-textDiv {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  .loginForm-container input {
    border: none !important;
    border-bottom: 1px solid #555 !important;
    border-radius: 0 !important;
    background: transparent;
    transition: none !important;
  }

  .loginForm-container input:hover,
  .loginForm-container input:focus {
    border-bottom: 1px solid #777 !important;
    box-shadow: none !important;
    outline: none !important;
  }

  button {
    width: 100%;
    border: none !important;
    font-weight: bold;
    background-color: rgb(220, 221, 221);
    box-shadow: none !important;
    height: 44px;
    transition: background-color 0.3s ease !important;
  }

  .loginForm-findDiv {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 16px 0;
    font-size: 14px;
    width: 100%;

    span {
      cursor: pointer;
      transition: color 0.2s;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 24px 0;
    width: 100%;

    hr {
      flex: 1;
      height: 1px;
      background-color: #444;
      border: none;
    }
  }

  .loginForm-socialDiv {
    display: flex;
    justify-content: center;
    gap: 45px;
    margin-top: 4px;
    width: 100%;
  }

  .loginform-socialbtn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
