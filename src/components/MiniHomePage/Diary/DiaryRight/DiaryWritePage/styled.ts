import styled from "styled-components";

export const DiaryWritePageStyle = styled.div`
  height: 100%;

  &.DiaryWritePage_wrap {
    width: 100%;
    height: 100%;
  }
  .WritePage_wrap_SelectWrap {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
  }
  .WritePage_wrap_EditorWrap {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
  }
  .WritePage_wrap_SaveBtnWrap {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .WritePage_SaveBtn {
      margin-top: 10px;
      padding: 4px 5px;
      background-color: rgb(248, 248, 248);
      color: #4b4b4b;
      font-size: 11px;
      border: 1px solid #4b4b4b;
      border-radius: 2px;
      cursor: pointer;
      font-weight: bold;
    }
  }
`;
