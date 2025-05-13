import styled from "styled-components";

export const SettingTabsStyled = styled.div`
  width: 100%;
  .SettingTabs_wrap_title {
    color: #4b4b4b;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
    border-bottom: 1.5px dotted #ddd;
    margin-bottom: 7px;
  }
  .SettingTabs_titleWrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }

  .SettingTabs_ex_text {
    display: flex;
    justify-content: flex-end;
    color: #4b4b4b;
    font-size: 10px;
    padding-top: 7px;
    width: 100%;
  }
  .SettingTabs_setBox {
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  .SettingTabs_title {
    color: black;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
  }
  /* 버튼 */
  .SettingTabs_btnWrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .SettingTabs_savebtn {
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
