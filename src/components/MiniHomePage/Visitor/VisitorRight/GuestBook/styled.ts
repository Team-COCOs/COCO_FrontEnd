import styled from "styled-components";

export const GuestBookStyle = styled.div`
  &.GuestBook_wrap {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .GuestBook_div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .GuestBook_empty {
      p {
        text-align: center;
        font-size: 11.5px;
        font-weight: bold;
        color: #4b4b4b;
      }
    }

    .GuestBook_header {
      display: flex;
      justify-content: space-between;
      background-color: rgb(247, 247, 247);
      border-top: 2.5px solid rgb(223, 223, 223);
      padding: 5px 10px;

      @media (max-width: 470px) {
        flex-direction: column;
        gap: 5px;
      }

      .GuestBook_info {
        display: flex;
        align-items: center;
        gap: 10px;

        @media (max-width: 470px) {
          flex-direction: column;
          align-items: start;
          gap: 5px;
        }

        .GuestBook_num {
          font-size: 9px;
        }

        .GuestBook_name {
          cursor: pointer;
          font-size: 11px;
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
        font-size: 9px;
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
      padding: 10px 0px 10px 30px;

      @media (max-width: 470px) {
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 10px;
      }

      .GuestBook_left {
        display: flex;
        justify-content: center;
        width: 15%;

        .GuestBook_gif {
          width: 100%;
        }

        img {
          width: 43px;
        }
      }

      .GuestBook_right {
        font-size: 12px;
        padding-left: 40px;

        @media (max-width: 900px) {
          padding-left: 20px;
        }

        @media (max-width: 470px) {
          padding-left: 0px;
          text-align: center;
        }
      }
    }
  }
`;
