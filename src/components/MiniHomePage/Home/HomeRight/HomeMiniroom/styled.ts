import styled from "styled-components";

export const HomeMiniroomStyled = styled.div`
  /* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .HomeMiniroom_wrap {
    display: flex;
    flex-direction: column;
    padding-top: 7px;
    /* 글씨 */
    .HomeMiniroom_number {
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 11px;
      font-weight: bolder;
      padding-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "Gulim", sans-serif;
      width: 100%;
      span {
        font-size: 12px;
        font-weight: bolder;
      }
    }
    .HomeMiniroom_imgWrap {
      width: 100%;
      aspect-ratio: 2/1;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    @media (max-width: 480px) {
      .HomeMiniroom_imgWrap {
        height: auto;
      }
    }
  }
`;
