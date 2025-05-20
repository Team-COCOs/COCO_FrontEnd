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
      align-items: center;
      width: 100%;
    }
    .RecentPhoto_title {
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 11px;
      font-weight: bolder;
      padding-bottom: 3px;
    }
    .RecentPhoto_new_phototitle {
      font-size: 12px;
      padding: 5px 2px;
      color: #4b4b4b;
      span {
        background-color: rgb(255, 129, 129);
        border-radius: 3px;
        font-size: 11px;
        padding: 2px 3px;
        color: white;
        font-weight: bold;
      }
    }
    .RecentPhoto_new_emptyphoto {
      font-size: 10px;
      color: rgb(147, 147, 147);
      /* font-weight: bold; */
      text-align: left;
      width: 48%;
      border-top: 1.5px #eee solid;
      border-bottom: 1.5px #eee solid;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 100%;
        line-height: 1.3;
        padding: 5px 2px;
      }
    }
    .RecentPhoto_new_photo {
      border-top: 1.5px #eee solid;
      width: 48%;
      border-bottom: 1.5px #eee solid;
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
        cursor: pointer;
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
        @media (max-width: 1024px) {
          span {
            font-size: 7px;
          }
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
    @media (max-width: 1024px) {
      .RecentPhoto_new_alltab {
        font-size: 10px;
      }
      .RecentPhoto_new_phototitle {
        font-size: 10px;
      }
      .RecentPhoto_new_phototitle {
        span {
          font-size: 8px;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    .RecentPhoto_wrap .RecentPhoto_new_photo {
      width: 41%;
    }
    .RecentPhoto_wrap .RecentPhoto_new_alltab {
      width: 57%;
    }
    .RecentPhoto_wrap .RecentPhoto_new_emptyphoto {
      width: 41%;
    }
  }
  @media (max-width: 789px) {
    .RecentPhoto_wrap .RecentPhoto_new_photo {
      width: 38%;
    }
    .RecentPhoto_wrap .RecentPhoto_new_alltab {
      width: 58%;
    }
    .RecentPhoto_wrap .RecentPhoto_new_emptyphoto {
      width: 38%;
    }
    .RecentPhoto_wrap .RecentPhoto_new_emptyphoto span {
      font-size: 8.5px;
    }
  }
  @media (max-width: 480px) {
    .RecentPhoto_wrap {
      .RecentPhoto_new {
        display: block;
      }

      .RecentPhoto_new_emptyphoto {
        width: 100%;
        border-bottom: none;
      }
      .RecentPhoto_new_photo {
        width: 100%;
        border-bottom: none;
      }
      .RecentPhoto_new_alltab {
        width: 100%;
      }
    }
  }
`;
