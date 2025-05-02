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
    gap: 7px;
    /* Today is... */
    .HomeProfile_todayis {
      border: 1.5px #eee solid;
      padding: 5px 0px;
      font-size: 12px;
      font-weight: bold;

      span {
        color: ${({ theme }) => theme.colors.tabColor};
        font-size: 10px;
        font-weight: bold;
        margin: 0px 10px;
        letter-spacing: 2px;
      }
    }

    .HomeProfile_imgWrap {
      box-sizing: border-box;

      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden; // 이미지가 영역 밖으로 넘칠 경우 잘라냄
      background-color: ${({ theme }) => theme.colors.bookPageColor};
      img {
        width: 80px; // 수정 필요
        height: 80px; //  사이즈 수정 필요
        object-fit: cover; // 꽉 차게, 비율 유지하면서 넘치는 부분 잘림
      }
    }
  }
`;
