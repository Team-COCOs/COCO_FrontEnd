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
  @media (min-width: 1281px) {
    &.CocoWorldPage_wrap {
      max-width: 1440px;
    }
  }
  @media (max-width: 769px) {
    &.CocoWorldPage_wrap {
      height: auto;
    }
  }
  .CocoWorldPage_container {
    width: 100%;
    height: 100%;
    display: flex;
    background-image: url("/background.jpg");
    background-size: cover;
    background-position: center;
  }
  @media (max-width: 769px) {
    .CocoWorldPage_container {
      justify-content: center;
      padding-top: 10px;
    }
  }

  // 책 전체
  .CocoWorldPage_book_wrap {
    width: 95%;
    height: 90%;
    display: flex;
    border-radius: 8px;

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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // 투데이 컴포 div
          .CocoWorldPage_bookLeft_todayWrap {
            width: 93%;
            height: 9%;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding-bottom: 4px;
          }
          @media (max-width: 769px) {
            .CocoWorldPage_bookLeft_todayWrap {
              padding-top: 20px;
            }
          }
          // 왼쪽 안쪽 다이어리 속지
          .CocoWorldPage_diary_left {
            width: 93%;
            height: 89%;
            background-color: #ffffff;
            border: 2px solid #c5c6c6;
            border-radius: 8px;
          }
        }
      }
      @media (max-width: 769px) {
        .CocoWorldPage_bookLeft_line {
          justify-content: center;
          border: 1.5px #fffcfe dashed;
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
          border-top-right-radius: 18px;
          border-bottom-right-radius: 18px;
          padding: 8px 0px;
          .CocoWorldPage_bookLeft_paper {
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            padding-bottom: 15px;
          }
        }
      }
    }

    @media (max-width: 769px) {
      .CocoWorldPage_book_left {
        width: 100%;
        justify-content: center;
        padding: 15px 0px;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
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
      // 다이어리 고리
      .CocoWorldPage_span1,
      .CocoWorldPage_span2,
      .CocoWorldPage_span3,
      .CocoWorldPage_span4 {
        z-index: 50;
        position: absolute;
        left: -13px;
        width: 28px;
        height: 8px;
        border: 2px solid #bbb;
        border-radius: 50px;
        background: linear-gradient(
          to right,
          rgb(189, 189, 189),
          rgb(249, 249, 249)
        ); /* 진한 → 연한 */
        margin-bottom: 10px;
      }
      /* 위치만 따로 지정 */
      .CocoWorldPage_span1 {
        top: 20%;
      }
      .CocoWorldPage_span2 {
        top: 25%;
      }
      .CocoWorldPage_span3 {
        top: 80%;
      }
      .CocoWorldPage_span4 {
        top: 85%;
      }
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
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          padding-left: 8px;
          // 미니홈피 이름 컴포 div
          .CocoWorldPage_bookRight_todayWrap {
            width: 98%;
            height: 9%;
            border-radius: 8px;
            display: flex;
            align-items: flex-end;
            padding-bottom: 2.5px;
            padding-left: 17px;
            position: relative;
          }
          // 왼쪽 안쪽 다이어리 속지
          .CocoWorldPage_diary_Right {
            width: 98%;
            height: 89%;
            background-color: #ffffff;
            border: 2px solid #c5c6c6;
            border-radius: 8px;
          }
        }
      }
    }
  }
  @media (max-width: 1440px) {
    .CocoWorldPage_book_wrap {
      .CocoWorldPage_book_right {
        // 다이어리 고리
        .CocoWorldPage_span1,
        .CocoWorldPage_span2,
        .CocoWorldPage_span3,
        .CocoWorldPage_span4 {
          left: -13px;
        }
        /* 위치만 따로 지정 */
        .CocoWorldPage_span1 {
          top: 20%;
        }
        .CocoWorldPage_span2 {
          top: 25%;
        }
        .CocoWorldPage_span3 {
          top: 80%;
        }
        .CocoWorldPage_span4 {
          top: 85%;
        }
      }
    }
  }
  @media (max-width: 1280px) {
    .CocoWorldPage_book_wrap {
      .CocoWorldPage_book_right {
        // 다이어리 고리
        .CocoWorldPage_span1,
        .CocoWorldPage_span2,
        .CocoWorldPage_span3,
        .CocoWorldPage_span4 {
          left: -12px;
        }
        /* 위치만 따로 지정 */
        .CocoWorldPage_span1 {
          top: 20%;
        }
        .CocoWorldPage_span2 {
          top: 25%;
        }
        .CocoWorldPage_span3 {
          top: 80%;
        }
        .CocoWorldPage_span4 {
          top: 85%;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .CocoWorldPage_book_wrap {
      .CocoWorldPage_book_right {
        // 다이어리 고리
        // 다이어리 고리
        .CocoWorldPage_span1,
        .CocoWorldPage_span2,
        .CocoWorldPage_span3,
        .CocoWorldPage_span4 {
          left: -12px;
        }
        /* 위치만 따로 지정 */
        .CocoWorldPage_span1 {
          /* top: 145px; */
          top: 20%;
        }
        .CocoWorldPage_span2 {
          /* top: 175px; */
          top: 25%;
        }
        .CocoWorldPage_span3 {
          /* top: 380px; */
          top: 80%;
        }
        .CocoWorldPage_span4 {
          /* top: 410px; */
          top: 85%;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .CocoWorldPage_book_wrap {
      .CocoWorldPage_book_right {
        // 다이어리 고리
        .CocoWorldPage_span1,
        .CocoWorldPage_span2,
        .CocoWorldPage_span3,
        .CocoWorldPage_span4 {
          left: -12px;
        }
        /* 위치만 따로 지정 */
        .CocoWorldPage_span1 {
          top: 20%;
        }
        .CocoWorldPage_span2 {
          top: 25%;
        }
        .CocoWorldPage_span3 {
          top: 80%;
        }
        .CocoWorldPage_span4 {
          top: 85%;
        }
      }
    }
  }

  @media (max-width: 769px) {
    .CocoWorldPage_book_wrap {
      flex-direction: column;
      .CocoWorldPage_book_right {
        left: 0px;
        width: 100%;
        justify-content: center;
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
        padding: 15px 0px;
        margin-bottom: 10px;
        /* 책 오른쪽 점선 */
        .CocoWorldPage_bookRight_line {
          width: 94%;
          height: 94%;
          border: 1.5px #fffcfe dashed;
          border-top-left-radius: 18px;
          border-bottom-left-radius: 18px;
          border-top-right-radius: 18px;
          border-bottom-right-radius: 18px;
          padding: 8px 0px;
          align-items: center;
          justify-content: center;
          // 책 종이
          .CocoWorldPage_bookRight_paper {
            width: 97%;
            border-radius: 15px;
            align-items: center;
            padding: 12px 15px;
          }
        }
        .CocoWorldPage_span1,
        .CocoWorldPage_span2,
        .CocoWorldPage_span3,
        .CocoWorldPage_span4 {
          display: none;
        }
      }
    }
  }
  // 왼쪽 전체
  .CocoWorldPage_left {
    width: 87%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 오른쪽 전체
  /* .CocoWorldPage_right {
    width: 13%;
    height: 100%;
    position: relative;
  } */
  // 홈 탭 - 오른쪽 부분에 relative 랑 absolute로 맞춤
  .CocoWorldPage_Tab_Wrap {
    position: relative;
    z-index: 10;
    height: 100%;
    width: 8%;
    right: 4.6%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 📱 반응형
  @media (max-width: 1024px) {
    .CocoWorldPage_book_wrap {
      width: 97%;
    }
    // 왼쪽 전체
    .CocoWorldPage_left {
      width: 83%;
    }
    .CocoWorldPage_Tab_Wrap {
      right: 4.9%;
    }
  }

  @media (max-width: 769px) {
    .CocoWorldPage_Tab_Wrap {
      position: absolute;
      width: 12%;
      right: 4.6%;
    }
  }
  @media (max-width: 480px) {
    .CocoWorldPage_Tab_Wrap {
      right: 4.7%;
    }
  }

  @media (max-width: 386px) {
    .CocoWorldPage_Tab_Wrap {
      right: 4.9%;
    }
  }
`;
