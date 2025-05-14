import styled from "styled-components";

export const SettingLeftStyled = styled.div`
  .SettingLeft_wrap {
    min-height: 80vh;

    @media (max-width: 768px) {
      min-height: 70vh;
    }
  }
  .SettingLeft_titleWrap {
    padding: 20px 10px 10px 10px;
  }
  .SettingLeft_title {
    width: 100%;
    margin-left: 10px;
    color: rgb(120, 184, 183);
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .SettingLeft_line {
    width: 93%;
    height: 1px;
    margin: 7px auto 0px auto;
    margin-bottom: 10px;
    background-color: rgb(221, 221, 221);
  }
`;
