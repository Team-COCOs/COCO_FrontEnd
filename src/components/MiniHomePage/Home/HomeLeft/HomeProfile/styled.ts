import styled from "styled-components";

export const HomeProfileStyled = styled.div`
  /* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
  border-radius: 5px;
  width: 100%;
  height: 100%;

  .HomeProfile_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 5px;
    border-bottom: 1px solid #ddd;
    position: relative;
    /* Today is... */
    .HomeProfile_todayis {
      border: 1.5px #eee solid;
      padding: 3.5px 0px;
      font-size: 11.5px;
      font-weight: bold;

      span {
        color: ${({ theme }) => theme.colors.tabColor};
        font-size: 10px;
        font-weight: bold;
        margin: 0px 10px;
        letter-spacing: 2px;
      }
    }
    @media (max-width: 1024px) {
      .HomeProfile_todayis {
        font-size: 8.5px;
        gap: 10px;
        padding: 3.5px 5px;
        span {
          font-size: 9px;
          margin-left: 0px;
        }
      }
    }
    @media (max-width: 769px) {
      .HomeProfile_todayis {
        font-size: 13.5px;
        gap: 10px;
        padding: 10px 20px;
        span {
          font-size: 13px;
          margin-left: 0px;
        }
      }
    }

    .HomeProfile_imgWrap {
      box-sizing: border-box;
      width: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: ${({ theme }) => theme.colors.bookPageColor};
      img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover; // 꽉 차게, 비율 유지하면서 넘치는 부분 잘림
      }
    }
    .HomeProfile_textarea {
      font-size: 11.5px;
      color: navy;
      line-height: 1.6;
    }
    @media (max-width: 1024px) {
      .HomeProfile_textarea {
        font-size: 9.5px;
      }
    }
    @media (max-width: 769px) {
      .HomeProfile_textarea {
        font-size: 15px;
        height: 100px;
        padding: 10px 15px;
      }
    }
  }
  .HomeProfile_history {
    position: absolute;
    font-size: 7px;
    padding-bottom: 1px;
    bottom: 0px;

    span {
      font-size: 5px;
      color: ${({ theme }) => theme.colors.tabColor};
    }
  }
`;
