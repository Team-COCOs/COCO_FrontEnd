import theme from "@/styles/theme";
import styled from "styled-components";

export const ProfileStyle = styled.div`
  &.Profile_wrap {
    margin-top: 10px;
    width: 100%;
    border: 3px solid rgb(222, 222, 222);
    padding: 10px;

    .Profile_header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .Profile_name {
        font-size: 14px;
        font-weight: 500;
        color: rgb(136, 136, 136);
      }

      .Profile_logout {
        background-color: white;
        padding: 0 1px;
        font-size: 13.5px;
        font-weight: 500;
        border: 1px solid rgb(166, 166, 166);
        cursor: pointer;
      }
    }

    .Profile_line {
      width: 100%;
      height: 2px;
      background-color: rgb(222, 222, 222);
      margin: 3px 0;
    }

    .Profile_userInfos {
      display: flex;
      width: 100%;
      gap: 10px;

      .Profile_userImgBack {
        width: 45%;
        height: 95px;
        background-color: rgb(233, 233, 233);
        display: flex;
        align-items: center;
        justify-content: center;

        .Profile_userImg {
          position: relative;
          width: 55px;
          height: 65px;
        }
      }

      .Profile_userInfo {
        width: 55%;
        display: flex;
        flex-direction: column;
        gap: 3px;
        margin-top: 3px;

        .Profile_infos {
          display: flex;
          align-items: center;
          cursor: pointer;

          .Profile_infoText {
            width: 100px;
          }

          span {
            font-size: 12px;
            width: 100px;
          }

          .Profile_newText {
            color: ${({ theme }) => theme.colors.mainColor};
            display: flex;
            align-items: center;

            .Profile_dororiImg {
              position: relative;
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }

          .Profile_new {
            font-size: 9px;
            font-weight: bold;
            color: white;
            background-color: ${({ theme }) => theme.colors.mainColor};
            padding: 0 3px;
            border-radius: 3px;
            margin-left: 5px;
          }
        }
      }
    }
  }
`;
