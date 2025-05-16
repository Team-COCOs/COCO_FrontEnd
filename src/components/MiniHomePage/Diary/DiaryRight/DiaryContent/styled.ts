import styled from "styled-components";

export const DiaryContentStyle = styled.div`
  position: relative;
  .DiaryContent_wrap {
    margin-top: 10px;
    margin-left: 5px;
    width: 100%;
    border: 1.5px solid #eee;
    border-radius: 3px;
    position: relative;
    min-height: 250px;
    background-color: white;
  }

  .DiaryContent_dateWrap {
    padding: 3px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .DiaryContent_dateMM {
      color: ${({ theme }) => theme.colors.tabColor};
      letter-spacing: 2px;
      font-size: 16px;
    }
    .DiaryContent_dateEE {
      font-size: 12px;
      color: #aaa;
      letter-spacing: 1px;
    }
  }
  .DiaryContent_DotLine {
    display: block;
    border-bottom: 1.5px dashed #ddd;
    margin: 10px 0;
    height: 1.5px;
    width: 100%;
    margin-left: 5px;
  }
  /* 반응형 */
  @media (max-width: 830px) {
    .DiaryContent_dateWrap {
      .DiaryContent_dateMM {
        font-size: 15px;
      }

      .DiaryContent_dateEE {
        font-size: 10px;
      }
    }
  }
  @media (max-width: 769px) {
    .DiaryContent_dateWrap {
      .DiaryContent_dateMM {
        font-size: 16px;
      }

      .DiaryContent_dateEE {
        font-size: 10px;
      }
    }
  }
  @media (max-width: 600px) {
    .DiaryContent_dateWrap {
      .DiaryContent_dateMM {
        font-size: 13px;
      }
    }
  }
  @media (max-width: 480px) {
    .DiaryContent_dateWrap {
      .DiaryContent_dateMM {
        font-size: 12px;
      }
    }
  }
  @media (max-width: 420px) {
    .DiaryContent_page_wrap {
      padding: 3px 10px;
    }
    .DiaryContent_dateWrap {
      .DiaryContent_dateMM {
        font-size: 9px;
        width: 30px;
      }
      .DiaryContent_dateEE {
        font-size: 5px;
      }
    }
  }
`;
