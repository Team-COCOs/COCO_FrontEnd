import styled from "styled-components";

export const ProfileInfoStyle = styled.div`
  &.Profile_infos.Profile_clickable {
    cursor: default;
  }
  &.Profile_infos {
    position: relative;
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
      font-weight: bold;
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
`;
