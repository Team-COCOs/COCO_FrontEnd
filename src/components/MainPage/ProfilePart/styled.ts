import styled from "styled-components";

export const ProfilePartStyle = styled.div`
  &.ProfilePart_wrap {
    .ProfilePart_eventHeader {
      margin: 15px 0 10px 0;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ProfilePart_text {
        font-size: 14px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.mainColor};
      }
    }

    .ProfilePart_line {
      width: 100%;
      height: 1.5px;
      background-color: rgb(233, 233, 233);
      margin: 3px 0;
    }

    .ProfilePart_eventImg {
      border: 3px solid rgb(233, 233, 233);
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .ProfilePart_Texts {
      padding: 0 9px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-top: 7px;
    }

    .ProfilePart_addText {
      font-size: 13px;
      font-weight: bold;
      color: rgb(125, 125, 125);
      cursor: pointer;
    }
  }
`;
