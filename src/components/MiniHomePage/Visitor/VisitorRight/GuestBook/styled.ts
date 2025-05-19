import styled from "styled-components";

export const GuestBookStyle = styled.div`
  &.GuestBook_wrap {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .Gulim {
      font-size: 11px;
    }

    .GuestBook_header {
      display: flex;
      justify-content: space-between;
      background-color: rgb(247, 247, 247);
      border-top: 2.5px solid rgb(223, 223, 223);
      padding: 5px 10px;

      .GuestBook_info {
        display: flex;
        align-items: center;
        gap: 10px;

        .GuestBook_num {
          font-size: 9px;
        }

        .GuestBook_name {
          cursor: pointer;
          font-size: 12px;
        }

        .GuestBook_date {
          font-size: 10px;
          color: rgb(161, 161, 161);
        }
      }

      .GuestBook_btns {
        display: flex;
        align-items: center;
        gap: 7px;
        color: rgb(126, 126, 126);

        div {
          cursor: pointer;
        }

        span {
          font-size: 9px;
          margin-bottom: 2px;
          color: rgb(161, 161, 161);
          text-align: center;
        }
      }
    }

    .GuestBook_body {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 20px;

      .GuestBook_left {
        display: flex;
        justify-content: center;
        width: 15%;

        img {
          width: 100%;
        }
      }

      .GuestBook_right {
        font-size: 13.5px;
        padding: 0px 40px;
      }
    }
  }
`;
