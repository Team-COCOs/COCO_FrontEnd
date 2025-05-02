import styled from "styled-components";

export const RecentPhotoStyled = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .RecentPhoto_wrap {
    .RecentPhoto_new {
      display: flex;
      width: 100%;
    }
    .RecentPhoto_title {
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 12px;
      font-weight: bolder;
    }
    .RecentPhoto_new_photo {
      width: 50%;
    }
    .RecentPhoto_new_alltab {
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      font-size: 12px;

      color: #333333;
      width: 50%;
      font-weight: 300;
      display: grid;
      letter-spacing: 1px;
      grid-template-columns: repeat(2, 1fr);
      .RecentPhoto_new_tabs {
        display: flex;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 5px 2px;
        span {
          color: ${({ theme }) => theme.colors.NavyColor};
          padding-left: 3px;
          font-size: 9px;
          align-self: flex-end;
          padding-left: 5px;
        }
      }
    }
  }
`;
