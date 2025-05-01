import { styled } from "styled-components";

export const TodayMiniStyle = styled.div`
  &.TodayMiniStyle_wrap {
    margin-top: 7px;

    .TodayMini_border {
      width: 100%;
      height: 210px;
      border: 3px solid rgb(233, 233, 233);
      padding: 10px;

      .mainColor {
        color: ${({ theme }) => theme.colors.mainColor};
      }

      .TodayMini_line {
        width: 100%;
        height: 2px;
        margin-top: 5px;
        background-color: ${({ theme }) => theme.colors.mainColor};
      }

      .Today_rank {
        list-style: none;
        padding: 0;
        margin: 0;

        .rank_item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 4px 0;
          padding: 4px 8px;
          border-radius: 4px;

          .rank_num {
            background: #d8d8d8;
            color: ${({ theme }) => theme.colors.mainColor};
            width: 18px;
            height: 18px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
            margin-right: 8px;
          }

          .rank_name {
            flex: 1;
            font-size: 14px;
          }

          .rank_count {
            font-size: 13px;
            color: ${({ theme }) => theme.colors.mainColor};
          }

          &.active .rank_num {
            background: ${({ theme }) => theme.colors.mainColor};
            color: white;
          }

          &.active {
            background: #f1f1f1;
          }
        }
      }
    }
  }
`;
