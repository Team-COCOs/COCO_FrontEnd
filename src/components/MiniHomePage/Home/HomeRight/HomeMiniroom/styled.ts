import styled from "styled-components";

export const HomeMiniroomStyled = styled.div`
  /* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .HomeMiniroom_wrap {
    display: flex;
    flex-direction: column;
    /* 글씨 */
    .HomeMiniroom_number {
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 11px;
      font-weight: bolder;
      padding-bottom: 3px;
    }

    .HomeMiniroom_imgWrap {
      width: 80%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      img {
        width: auto;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
