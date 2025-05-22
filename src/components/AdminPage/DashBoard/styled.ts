import styled from "styled-components";

export const DashBoardStyled = styled.div`
  width: 65%;
  .DashBoard_wrap {
    margin-bottom: 10px;
    h2 {
      padding-left: 2px;
      font-size: 13px;
      color: gray;
    }
  }
  .DashBoard_set_title {
    font-weight: bold;
    font-size: 25px;
  }
  .DashBoard_delete_btn {
    border: 1px solid ${({ theme }) => theme.colors.mainColor};
    padding: 8px 12px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bolder;
    background-color: white;
    color: ${({ theme }) => theme.colors.mainColor};
    &:hover {
      background-color: ${({ theme }) => theme.colors.mainColor};
      color: white;
    }
  }
`;
