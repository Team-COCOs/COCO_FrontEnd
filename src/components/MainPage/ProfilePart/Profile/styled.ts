import theme from "@/styles/theme";
import styled from "styled-components";

export const ProfileStyle = styled.div`
  &.Profile_wrap {
    margin-top: 10px;
    width: 100%;
    border: 3px solid rgb(222, 222, 222) !important;
    padding: 10px;

    .Profile_header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .Profile_name {
        font-size: 14px;
        font-weight: 500;
        color: rgb(136, 136, 136) !important;
      }

      .Profile_logout {
        background-color: white;
        padding: 0 1px;
        font-size: 13.5px;
        font-weight: 500;
        border: 1px solid rgb(166, 166, 166) !important;
        cursor: pointer;
      }
    }

    .Profile_line {
      width: 100%;
      height: 2px;
      background-color: rgb(222, 222, 222) !important;
      margin: 3px 0;
    }

    .Profile_userInfos {
      display: flex;
      width: 100%;
      gap: 10px;

      .Profile_userImgBack {
        width: 45%;
        height: 95px;
        background-color: rgb(233, 233, 233) !important;
        display: flex;
        align-items: center;
        justify-content: center;

        .Profile_userImg {
          position: relative;
          width: 55px;
          height: 65px;
        }

        .Profile_userImgPng {
          width: 43px;
        }
      }

      .Profile_userInfo {
        width: 55%;
        display: flex;
        flex-direction: column;
        gap: 3px;
        margin-top: 7px;
      }
    }

    .Profile_btn {
      width: 100%;
      margin-top: 7px;
      background: linear-gradient(
        to bottom,
        rgb(181, 181, 181) 0%,
        rgb(150, 150, 150) 100%
      ) !important;
      border: none;
      border-radius: 5px;
      color: white !important;
      font-size: 13.5px;
      font-weight: bold;
      padding: 7px 5px 8px 5px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6),
        inset 0 -1px 0 rgba(0, 0, 0, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.2) !important;
      cursor: pointer;
      text-align: center;
      gap: 5px;

      &:hover {
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1),
          inset 0 -1px 0 rgba(255, 255, 255, 0.6),
          1px 1px 2px rgba(0, 0, 0, 0.2) !important;
      }
    }

    .Profile_btn .arrow {
      font-size: 10px;
      font-weight: bold;
      color: white !important;
    }
  }
`;
