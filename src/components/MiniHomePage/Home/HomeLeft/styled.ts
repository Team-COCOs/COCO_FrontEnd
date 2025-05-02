import styled from "styled-components";

export const HomeLeftStyled = styled.div`
  /* 왼쪽 컴포넌트 CSS 기본 틀 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 12px 25px;
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
      padding-bottom: 10px;
    }
    .HomeLeft_HomeFriends {
      width: 100%;
      height: 18%;
    }
  }
`;
