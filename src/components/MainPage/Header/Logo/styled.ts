import { styled } from "styled-components";

export const LogoStyle = styled.div`
  &.Logo_wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;

    .Logo_topText {
      font-size: 13.5px;
      font-weight: bold;
      color: rgb(123, 123, 123);
    }

    .Logo_img {
      position: relative;
      width: 120px;
      height: 120px;
    }

    .logoFont {
      font-size: 28px;
      margin-top: -8px;
    }
  }

  /* 회원가입 로고 */
  &.Logo_sign {
    display: flex;
    align-items: center;
    gap: 5px;

    .Sign_img {
      position: relative;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
    .Sign_logoFont {
      font-size: 23px;
      cursor: pointer;
    }

    .Sign_font {
      font-size: 19px;
      margin-left: 5px;
    }
  }
`;
