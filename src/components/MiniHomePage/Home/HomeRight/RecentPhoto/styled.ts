import styled from "styled-components";

export const RecentPhotoStyled = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding-top: 8px;
  .RecentPhoto_wrap {
    .RecentPhoto_new {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .RecentPhoto_title {
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 11px;
      font-weight: bolder;
      padding-bottom: 3px;
    }
    .RecentPhoto_new_photo {
      border-top: 1.5px #eee solid;
      width: 48%;
    }
    .RecentPhoto_new_alltab {
      border-top: 1.5px dotted #ddd;
      font-size: 12px;

      color: #4d4d4d;
      width: 48%;
      display: grid;
      letter-spacing: 1px;
      grid-template-columns: repeat(2, 1fr);
      .RecentPhoto_new_tabs {
        display: flex;
        border-bottom: 1.5px dotted #ddd;
        padding: 5px 2px;

        span {
          color: ${({ theme }) => theme.colors.NavyColor};
          padding-left: 3px;
          font-size: 9px;
          align-self: flex-end;
          padding-left: 5px;
          font-weight: 600;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .RecentPhoto_new_alert {
          font-size: 7px;
          font-weight: bold;
          color: white;
          background-color: ${({ theme }) => theme.colors.mainColor};
          padding: 2px 3px;
          border-radius: 3px;
          margin-left: 5px;
          animation: blink 1s infinite;
        }
      }
    }
  }
`;
