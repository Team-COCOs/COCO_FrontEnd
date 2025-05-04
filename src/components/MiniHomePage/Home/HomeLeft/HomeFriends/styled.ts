import styled from "styled-components";

export const HomeFriendsStyled = styled.div`
  /* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .HomeFriends_wrap {
    display: flex;
    flex-direction: column;
    padding-top: 7px;
    /* 글씨 */

    /* 일촌 파도타기 */
    select {
      padding: 5px 6px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      font-family: "Gulim", sans-serif;
      font-size: 12px;
      color: #333333;
      appearance: none; /* 브라우저 기본 화살표 제거 */
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='10' viewBox='0 0 24 24' width='10' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
      background-repeat: no-repeat;
      background-position: right 6px center;
      background-size: 10px;
      cursor: pointer;
      min-width: 120px;
    }

    select:focus {
      outline: none;
      border-color: #666;
      background-color: #ffffff;
    }
    option {
      border-radius: none !important;
    }
  }
  @media (max-width: 1024px) {
    .HomeFriends_wrap {
      select {
        min-width: 0px;
        font-size: 10px;
      }
    }
  }
  /* @media (max-width: 1024px) {
    .HomeFriends_wrap {
      padding-top: 25px;
    }
  } */

  /* 미니홈피 주인 이름 */
  .HomeFriends_namebox {
    display: flex;
    align-items: flex-end;
    padding-bottom: 3px;
    .HomeFriends_name {
      font-size: 12px;
      font-weight: bolder;
    }
    .HomeFriends_gender {
      font-size: 11.5px;
      color: #4b4b4b;
      vertical-align: bottom;
      padding: 0px 3px;
    }
  }
  // 이메일
  .HomeFriends_email {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.mainColor};
    margin-bottom: 5px;
  }
  @media (max-width: 1024px) {
    .HomeFriends_email {
      font-size: 8px;
    }
  }
`;
