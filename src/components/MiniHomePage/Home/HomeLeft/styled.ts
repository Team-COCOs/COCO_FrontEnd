import styled from "styled-components";

export const HomeLeftStyled = styled.div`
  /* 왼쪽 컴포넌트 CSS 기본 틀 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 12px 25px;
  @media (max-width: 1024px) {
    padding: 12px 15px;
  }
  .HomeLeft_wrap {
    width: 100%;
    height: 100%;
    .HomeLeft_componentWrap {
      width: 100%;
      height: 100%;
    }
    .HomeLeft_HomeProfile {
      width: 100%;
      height: 82%;
    }
    .HomeLeft_HomeFriends {
      width: 100%;
      height: 18%;
    }
  }
`;
