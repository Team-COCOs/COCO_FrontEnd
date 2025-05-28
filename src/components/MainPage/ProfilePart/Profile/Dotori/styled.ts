import styled from "styled-components";

export const DotoriStyle = styled.div`
  &.Profile_infos {
    display: flex;
    align-items: center;
    margin: 3px 0 0 -2px;

    .Profile_newText {
      color: ${({ theme }) => theme.colors.mainColor};
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: bold;

      .Profile_dororiImg {
        position: relative;
        width: 15px;
        height: 17px;
        margin-right: 5px;
      }

      span {
        margin-top: 2px;
      }

      button {
        border: 1px solid rgb(190, 190, 190);
        background-color: rgb(243, 243, 243);
        font-size: 12px;
        padding: 0 2px;
        cursor: pointer;
        margin-left: 15px;
      }
    }
  }
`;
