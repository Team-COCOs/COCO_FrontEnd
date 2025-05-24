import styled from "styled-components";

export const SettingMyInfoStyle = styled.div`
  &.SettingMyInfo_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .SettingMyInfo_delete {
      font-size: 9.5px;
      margin: 0 0 5px 5px;
      text-decoration: underline;
      text-underline-offset: 2px;
      color: rgb(175, 175, 175) !important;
      cursor: pointer;
    }

    .SettingMyInfo_header {
      color: #4b4b4b !important;
      font-size: 12px;
      font-weight: bolder;
      padding-bottom: 7px;
      border-bottom: 1.5px dotted #ddd !important;
      margin-bottom: 7px;

      .SettingMyInfo_title {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
      }
    }

    .SettingMyInfo_body {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .SettingMyInfo_myBase {
        padding: 10px 15px;
        font-size: 11px;
        border-top: 1.5px solid rgb(177, 177, 177) !important;
        border-bottom: 1.5px solid rgb(194, 194, 194) !important;
        background-color: rgb(249, 249, 249) !important;

        @media (max-width: 1003px) {
          font-size: 10px;
        }

        @media (max-width: 890px) {
          font-size: 9px;
        }

        .SettingMyInfo_myBaseText {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-top: 7px;
          gap: 5px;
          color: rgb(62, 209, 235) !important;
          font-weight: bold;
          cursor: pointer;

          .SettingMyInfo_myBaseIcon {
            color: ${({ theme }) => theme.colors.mainColor} !important;
            font-size: 6px;
          }
        }
      }

      .SettingMyInfo_subTitle {
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 12px;

        @media (max-width: 520px) {
          flex-direction: column;
          align-items: start;
          justify-content: center;
          font-size: 12px;
        }

        .SettingMyInfo_iconText {
          color: black;
          font-size: 11px;
          font-weight: bolder;
          padding-bottom: 7px;
          padding-top: 7px;
        }

        .SettingMyInfo_subText {
          font-size: 9px;
          color: rgb(142, 142, 142) !important;
          margin-left: 5px;

          @media (max-width: 520px) {
            font-size: 8px;
          }
        }
      }

      .SettingMyInfo_password {
        display: flex;
        flex-direction: column;
        border-top: 1.5px solid rgb(177, 177, 177) !important;
        border-bottom: 1.5px solid rgb(194, 194, 194) !important;
        background-color: rgb(249, 249, 249) !important;

        .SettingMyInfo_textBox {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 15px;
          width: 100%;
          position: relative;

          @media (max-width: 588px) {
            flex-direction: column;
          }

          .SettingMyInfo_text {
            width: 20%;
            display: flex;
            font-size: 12px;
            justify-content: center;

            @media (max-width: 1003px) {
              width: 25%;
              font-size: 11px;
            }

            @media (max-width: 588px) {
              width: 100%;
            }
          }

          input {
            width: 75%;
            height: 25px;
            padding: 5px;
            margin: 5px 0;

            &:focus,
            &:active {
              outline: none;
            }

            @media (max-width: 588px) {
              width: 90%;
              margin-bottom: 15px;
            }
          }

          .SettingMyInfo_error {
            width: 100%;
            position: absolute;
            bottom: 3px;
            text-align: center;
            color: rgb(255, 105, 105) !important;
            font-size: 12px;

            @media (max-width: 580px) {
              font-size: 9px;
            }
          }
        }

        .SettingMyInfo_underLine {
          width: 100%;
          height: 1px;
          border-bottom: 1px dotted rgb(167, 167, 167) !important;
        }
      }

      .SettingMyInfo_btns {
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        button {
          padding: 4px 5px;
          background-color: rgb(248, 248, 248) !important;
          color: #4b4b4b !important;
          font-size: 11px;
          border: 1px solid #4b4b4b !important;
          border-radius: 2px;
          cursor: pointer;
          font-weight: bold;

          &:disabled {
            cursor: not-allowed;
          }
        }
      }
    }
  }
`;
