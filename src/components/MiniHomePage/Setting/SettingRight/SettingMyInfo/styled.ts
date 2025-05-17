import styled from "styled-components";

export const SettingMyInfoStyle = styled.div`
  &.SettingMyInfo_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .SettingMyInfo_header {
      color: #4b4b4b;
      font-size: 12px;
      font-weight: bolder;
      padding-bottom: 7px;
      border-bottom: 1.5px dotted #ddd;
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
        font-size: 13px;
        border-top: 1.5px solid rgb(177, 177, 177);
        border-bottom: 1.5px solid rgb(194, 194, 194);
        background-color: rgb(249, 249, 249);

        @media (max-width: 1003px) {
          font-size: 11px;
        }

        @media (max-width: 890px) {
          font-size: 10px;
        }

        .SettingMyInfo_myBaseText {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          color: rgb(62, 209, 235);
          font-weight: bold;
          cursor: pointer;

          .SettingMyInfo_myBaseIcon {
            color: ${({ theme }) => theme.colors.mainColor};
            font-size: 6px;
          }
        }
      }

      .SettingMyInfo_subTitle {
        display: flex;
        gap: 5px;
        align-items: center;
        font-size: 13.5px;

        @media (max-width: 520px) {
          flex-direction: column;
          align-items: start;
          justify-content: center;
          font-size: 13px;
        }

        .SettingMyInfo_iconText {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .SettingMyInfo_icon {
          font-size: 5px;
        }

        .SettingMyInfo_subText {
          font-size: 11px;
          color: rgb(142, 142, 142);
          margin-left: 5px;

          @media (max-width: 520px) {
            font-size: 10px;
          }
        }
      }

      .SettingMyInfo_password {
        display: flex;
        flex-direction: column;
        border-top: 1.5px solid rgb(177, 177, 177);
        border-bottom: 1.5px solid rgb(194, 194, 194);
        background-color: rgb(249, 249, 249);

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
            font-size: 13px;
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
            }
          }

          .SettingMyInfo_error {
            width: 100%;
            position: absolute;
            bottom: 3px;
            text-align: center;
            color: rgb(255, 105, 105);
            font-size: 12px;

            @media (max-width: 430px) {
              font-size: 10px;
            }

            @media (max-width: 370px) {
              font-size: 9px;
            }
          }
        }

        .SettingMyInfo_underLine {
          width: 100%;
          height: 1px;
          border-bottom: 1px dotted rgb(167, 167, 167);
        }
      }

      .SettingMyInfo_btns {
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;

        button {
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
    }
  }
`;
