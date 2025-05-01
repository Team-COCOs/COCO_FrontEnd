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
  }
`;
