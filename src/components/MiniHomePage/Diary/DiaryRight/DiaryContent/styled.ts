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
    padding: 5px 5px;
    margin-bottom: 10px;
    color: #aaa;
    font-weight: bold;
    letter-spacing: 1px;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  /* 반응형 */
  @media (max-width: 830px) {
    .DiaryContent_dateWrap {
    }
  }
  @media (max-width: 769px) {
    .DiaryContent_dateWrap {
    }
  }
  @media (max-width: 600px) {
    .DiaryContent_dateWrap {
    }
  }
  @media (max-width: 480px) {
    .DiaryContent_dateWrap {
    }
  }
  @media (max-width: 420px) {
    .DiaryContent_page_wrap {
      padding: 3px 10px;
    }
    .DiaryContent_dateWrap {
    }
  }
`;
