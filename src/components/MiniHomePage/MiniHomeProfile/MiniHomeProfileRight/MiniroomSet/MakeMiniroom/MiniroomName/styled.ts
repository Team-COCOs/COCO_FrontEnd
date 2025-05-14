import styled from "styled-components";

export const MiniroomNameStyled = styled.div`
  width: 100%;
  height: 100%;

  /* 버튼 */
  .MiniroomNamesaveBtn_wrap {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .MiniroomNamesaveBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(212, 238, 255);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
    &:hover {
      background-color: rgb(176, 222, 253);
    }
  }

  .MiniroomNamedeleteBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
    &:hover {
      background-color: rgb(230, 230, 230);
    }
  }

  /* 미니룸 이름 수정 */
  .MiniroomNamefix_input {
    height: 22px;
    padding: 2px 5px;
    font-size: 10px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    outline: none;
    width: 160px;
    font-family: Gulim, sans-serif;
    box-sizing: border-box;
    vertical-align: middle;
  }
  .MiniroomNamefix_box {
    margin: 10px 0px;
  }
  /* 버튼 */
  .MiniroomName_saveBtn {
    margin-left: 8px;
    padding: 4px 5px;
    background-color: rgb(212, 238, 255);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
  }
  .MiniroomNamewrap_title {
    p {
      span {
        font-size: 9px;
        color: #aaa;
      }
    }
  }
`;
