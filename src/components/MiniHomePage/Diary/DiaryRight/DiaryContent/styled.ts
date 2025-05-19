import styled from "styled-components";

export const DiaryContentStyle = styled.div`
  position: relative;
  .DiaryContent_wrap {
    margin-top: 10px;
    margin-left: 5px;
    width: 100%;
    border: 1.3px solid #ddd;
    border-radius: 2px;
    position: relative;
    min-height: 250px;
    background-color: white;
    padding: 0px 25px;
  }

  .DiaryContent_dateWrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 21px 0px;
    font-size: 11px;
    font-weight: bolder;
    letter-spacing: 1px;
    color: rgb(51, 161, 194);
  }
  .DiaryContent_update_date {
    color: #ddd;
    padding-left: 5px;
    font-weight: 400;
  }

  .DiaryContent_weather {
    padding-left: 5px;
    font-size: 15px;
  }
  .DiaryContent_now {
    color: #aaa;
  }
  .DiaryContent_DotLine {
    display: block;
    border-bottom: 1.5px dashed #ddd;
    margin: 10px 0;
    height: 1.5px;
    width: 100%;
    margin-left: 5px;
  }
  .DiaryContent_contentText {
    font-size: 12px;
    min-height: 100px;
    padding-bottom: 10px;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  .DiaryContent_Secret {
    display: flex;
    align-items: center;
    font-size: 11px;
    min-height: 20px;
    padding: 8px 5px;
    margin-bottom: 10px;
    color: #aaa;
    font-weight: bold;
    letter-spacing: 1px;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  /* 페이지 위아래 버튼 */
  .DiaryContent_btns {
    border-radius: 5px;

    button {
      border: 1.5px solid rgb(219, 219, 219);
      color: ${({ theme }) => theme.colors.mainColor};
      background-color: rgb(251, 251, 251);
      padding: 4px 5px;
      font-size: 8px;
      border-radius: 3px;
      margin-left: 3px;
      cursor: pointer;
    }
  }
  .DiaryContent_bottom_wrap {
    display: flex;
    justify-content: space-between;
  }
  .DiaryContent_allbtn {
    border: 1.5px solid rgb(195, 195, 195);
    background-color: rgb(251, 251, 251);
    color: #4b4b4b;
    padding: 2px 5px;
    font-size: 10px;
    border-radius: 3px;
    margin-left: 3px;
    font-weight: bold;
    cursor: pointer;
  }
  .DiaryContent_findbtn {
    border: 1px solid rgb(195, 195, 195);
    background-color: rgb(251, 251, 251);
    color: #4b4b4b;
    padding: 3px 5px;
    font-size: 10px;
    border-radius: 3px;
    margin-left: 3px;
    font-weight: bold;
    cursor: pointer;
  }
  .DiaryContent_fixDeletebtn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${({ theme }) => theme.colors.mainColor};
    margin-top: 15px;
    padding-right: 12px;
    span {
      font-size: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 2px;
    }
    button {
      background-color: transparent;
      border: none;
      color: ${({ theme }) => theme.colors.mainColor};
      font-size: 11px;
      cursor: pointer;
    }
  }

  /* 다이어리 내용 검색 */
  .DiaryContent_findwrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
  } /* 셀렉트 박스 */
  .DiaryContent_select {
    border: 1px solid rgb(195, 195, 195);
    background-color: rgb(251, 251, 251);
    color: #4b4b4b;
    padding: 4.5px 6px;
    font-size: 10px;
    font-weight: bold;
    margin-right: 5px;
    cursor: pointer;
  }

  /* 검색 인풋 */
  .DiaryContent_findInput {
    border: 1px solid rgb(195, 195, 195);
    background-color: rgb(251, 251, 251);
    color: #4b4b4b;
    padding: 3px 6px;
    font-size: 12px;
    width: 120px;
  }

  .DiaryContent_dotori_imgWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 50vh;
    font-size: 12px;
    font-weight: bold;
    color: #4b4b4b;
    img {
      width: 35%;
      object-fit: contain;
    }
  }
  /* 반응형 */
  @media (max-width: 480px) {
    .DiaryContent_dotori_imgWrap {
      font-size: 8.5px;
    }
    .DiaryContent_Secret {
      font-size: 8px;
    }
  }
  @media (max-width: 420px) {
    .DiaryContent_page_wrap {
      padding: 3px 10px;
    }
  }
`;
