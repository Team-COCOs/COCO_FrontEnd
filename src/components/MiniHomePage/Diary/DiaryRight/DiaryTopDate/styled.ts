import styled from "styled-components";

export const DiaryTopDateStyle = styled.div`
  position: relative;
  .DiaryTopDate_wrap {
    margin-top: 10px;
    margin-left: 5px;
    width: 100%;
    border: 1.5px solid #ddd;
    position: relative;
    height: 65px;
    background-color: white;
  }
  .DiaryTopDate_page_wrap {
    width: 100%;
    height: 100%;
    bottom: 3px;
    right: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    background-color: white;
    border: 1.5px solid #ddd;
    z-index: 2;
    padding: 10px 15px;
  }
  .DiaryTopDate_dateWrap {
    padding: 3px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .DiaryTopDate_dateMM {
      color: rgb(51, 161, 194);
      letter-spacing: 2px;
      font-size: 16px;
    }
    .DiaryTopDate_dateEE {
      font-size: 12px;
      color: #aaa;
      letter-spacing: 1px;
    }
  }
  .DiaryTopDate_diaryTitleText {
    font-size: 12px;
    font-weight: border;
  }
  .DiaryTopDate_diaryWriteBtn {
    background-color: rgb(248, 248, 248);
    border-radius: 5px;
    border: 1.5px solid #ddd;
    padding: 4px 6px;
    font-size: 10px;
    cursor: pointer;
  }
  /* 반응형 */
  @media (max-width: 830px) {
    .DiaryTopDate_dateWrap {
      .DiaryTopDate_dateMM {
        font-size: 15px;
      }

      .DiaryTopDate_dateEE {
        font-size: 10px;
      }
    }

    .DiaryTopDate_diaryTitleText {
      font-size: 11px;
    }

    .DiaryTopDate_diaryWriteBtn {
      padding: 3px 5px;
      font-size: 8px;
    }
  }
  @media (max-width: 769px) {
    .DiaryTopDate_dateWrap {
      .DiaryTopDate_dateMM {
        font-size: 16px;
      }

      .DiaryTopDate_dateEE {
        font-size: 10px;
      }
    }

    .DiaryTopDate_diaryTitleText {
      font-size: 11px;
    }

    .DiaryTopDate_diaryWriteBtn {
      font-size: 9.5px;
    }
  }
  @media (max-width: 600px) {
    .DiaryTopDate_dateWrap {
      .DiaryTopDate_dateMM {
        font-size: 13px;
      }
    }

    .DiaryTopDate_diaryTitleText {
      font-size: 8.5px;
    }

    .DiaryTopDate_diaryWriteBtn {
      font-size: 8px;
    }
  }
  @media (max-width: 480px) {
    .DiaryTopDate_dateWrap {
      .DiaryTopDate_dateMM {
        font-size: 12px;
      }
    }

    .DiaryTopDate_diaryTitleText {
      font-size: 7px;
    }

    .DiaryTopDate_diaryWriteBtn {
      font-size: 6.5px;
    }
  }
  @media (max-width: 420px) {
    .DiaryTopDate_page_wrap {
      padding: 3px 10px;
    }
    .DiaryTopDate_dateWrap {
      .DiaryTopDate_dateMM {
        font-size: 9px;
        width: 30px;
      }
      .DiaryTopDate_dateEE {
        font-size: 5px;
      }
    }

    .DiaryTopDate_diaryTitleText {
      font-size: 7px;
      padding: 0px 5px;
    }

    .DiaryTopDate_diaryWriteBtn {
      font-size: 5px;
    }
  }
`;
