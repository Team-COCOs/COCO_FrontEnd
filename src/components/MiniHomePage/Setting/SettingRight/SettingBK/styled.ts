import styled from "styled-components";

export const SettingBKStyled = styled.div`
  width: 100%;
  .SettingBK_wrap_title {
    color: #4b4b4b;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
    border-bottom: 1.5px dotted #ddd;
    margin-bottom: 7px;
  }
  .SettingBK_titleWrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }

  .SettingBK_ex_text {
    display: flex;
    justify-content: flex-end;
    color: #4b4b4b;
    font-size: 10px;
    padding-top: 7px;
    width: 100%;
  }
  .SettingBK_setBox {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  .SettingBK_title {
    color: #2686a3;
    font-size: 11px;
    font-weight: bolder;
    padding-bottom: 15px;
  }
  /* 버튼 */
  .SettingBK_btnWrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .SettingBK_savebtn {
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
  label {
    margin-bottom: 5px;
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
    font-size: 12px;
    color: #4b4b4b;
    font-weight: bolder;
  }
  input {
    margin-right: 5px;
    vertical-align: middle;
  }
`;
