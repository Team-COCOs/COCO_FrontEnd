import styled from "styled-components";

export const CocoWorldPageStyled = styled.div`
  // 전체
  &.CocoWorldPage_wrap {
    display: flex;
    flex-direction: column;
    max-width: 1280px;
    height: 100vh;
    margin: 0 auto;
    /* background-color: ${({ theme }) => theme.colors.mainColor}; */
  }
  .CocoWorldPage_container {
    width: 100%;
    height: 100%;
    display: flex;
    background-image: url("/backgroundImg.png");
    background-size: cover;
    background-position: center;
  }
  // 왼쪽 전체
  .CocoWorldPage_left {
    width: 83%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 오른쪽 전체
  .CocoWorldPage_right {
    width: 17%;
    height: 100%;
  }
  // 책 전체
  .CocoWorldPage_book_wrap {
    width: 95%;
    height: 90%;
    background-color: blue;
  }
`;
