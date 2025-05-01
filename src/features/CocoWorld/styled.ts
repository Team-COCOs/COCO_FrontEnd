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
    background-image: url("background/minihome_background.png");
    background-size: cover;
    background-position: center;
  }

  // 책 전체
  .CocoWorldPage_book_wrap {
    width: 95%;
    height: 90%;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    // 책 왼쪽
    .CocoWorldPage_book_left {
      // 선
      border-left: 2px solid ${({ theme }) => theme.colors.bookLineColor};
      border-top: 2px solid ${({ theme }) => theme.colors.bookLineColor};
      border-bottom: 2px solid ${({ theme }) => theme.colors.bookLineColor};
      width: 30%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 18px;
      border-bottom-right-radius: 18px;
      background-color: ${({ theme }) => theme.colors.bookColor};
      display: flex;
      justify-content: flex-end;
      align-items: center;

      // 책 왼쪽 점선
      .CocoWorldPage_bookLeft_line {
        width: 94%;
        height: 94%;
        border-left: 1.5px #fffcfe dashed;
        border-top: 1.5px #fffcfe dashed;
        border-bottom: 1.5px #fffcfe dashed;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        // 책 종이 왼쪽
        .CocoWorldPage_bookLeft_paper {
          background-color: ${({ theme }) => theme.colors.bookPageColor};
          width: 97%;
          height: 97%;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }
    }
    // 책 오른쪽
    .CocoWorldPage_book_right {
      // 선
      border-right: 2px solid ${({ theme }) => theme.colors.bookLineColor};
      border-top: 2px solid ${({ theme }) => theme.colors.bookLineColor};
      border-bottom: 2px solid ${({ theme }) => theme.colors.bookLineColor};
      position: relative;
      left: -3.5px;
      width: 70%;
      border-top-left-radius: 18px;
      border-bottom-left-radius: 18px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: ${({ theme }) => theme.colors.bookColor};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* 책 오른쪽 점선 */
      .CocoWorldPage_bookRight_line {
        width: 97.5%;
        height: 94%;
        border-right: 1.5px #fffcfe dashed;
        border-top: 1.5px #fffcfe dashed;
        border-bottom: 1.5px #fffcfe dashed;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        // 책 종이
        .CocoWorldPage_bookRight_paper {
          background-color: ${({ theme }) => theme.colors.bookPageColor};
          width: 99%;
          height: 97%;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
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
`;
