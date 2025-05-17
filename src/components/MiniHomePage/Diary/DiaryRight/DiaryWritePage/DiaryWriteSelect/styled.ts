import styled from "styled-components";

export const DiaryWriteSelectStyle = styled.div`
  width: 100%;
  height: 100%;
  &.DiaryWriteSelect_wrap {
    width: 100%;
    height: 100%;
  }
  .DiaryWritePage_DiaryOptions_wrap {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  /* 날씨 버튼 */
  .DiaryWritePage_WeatherButton {
    background-color: transparent;
    border: none;
    font-size: 18px;
    padding: 3px;
  }
  .DiaryWritePage_WeatherButton.selected {
    background-color: rgb(229, 229, 229);
    border-radius: 5px;
  }
  .DiaryWritePage_WeatherSelector {
    span {
      font-size: 12px;
      padding-right: 5px;
      font-weight: bold;
    }
  }
  .DiaryWritePage_SelectWrapper {
    label {
      font-size: 12px;
      padding-right: 5px;
      font-weight: bold;
    }
  }
  .DiaryWritePage_SelectWrapper select {
    border: 1px solid #ccc;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 6px 30px 6px 10px; /* 오른쪽 여백 확보 */
    border-radius: 4px;
    background-color: white;
    font-size: 10px;
    cursor: pointer;
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px 16px;
  }
`;
