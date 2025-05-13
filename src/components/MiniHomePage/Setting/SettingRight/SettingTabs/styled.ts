import styled from "styled-components";

export const SettingTabsStyled = styled.div`
  width: 100%;
  .SettingTabs_wrap_title {
    color: #2686a3;
    font-size: 12px;
    font-weight: bolder;
    padding-bottom: 7px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    span {
      cursor: pointer;
      padding-left: 5px;
      font-size: 11px;
    }
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
`;
