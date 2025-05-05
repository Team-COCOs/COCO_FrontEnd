import { styled } from "styled-components";

export const SearchUserStyle = styled.div`
  &.SearchUser_wrap {
    width: 100%;
    padding: 5px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .SearchUser_result {
      align-self: flex-start;
    }

    ul {
      list-style: none;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .SearchUser_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        border-bottom: 1px solid rgb(221, 221, 221);
        padding: 15px;

        .SearchUser_userInfo {
          display: flex;
          align-items: center;
          gap: 15px;

          .SearchUser_image {
            position: relative;
            width: 45px;
            height: 55px;
            margin: 0 15px;
          }

          .SearchUser_info {
            display: flex;
            flex-direction: column;

            .SearchUser_name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
            }

            .SearchUser_sub {
              font-size: 14px;
              color: #666;
            }
          }
        }

        &:hover {
          background-color: #f9f9f9;
        }

        span {
          color: rgb(175, 175, 175);
          font-size: 12px;
          font-weight: bold;

          .SearchUser_link {
            margin-left: 5px;
            font-size: 10px;
          }
        }
      }
    }

    .SearchUser_none {
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .SearchUser_img {
        position: relative;
        width: 200px;
        height: 170px;
        margin: auto;
      }

      .SearchUser_text {
        width: 80%;
        font-size: 20px;
        font-weight: bold;
        white-space: nowrap;
        text-align: center;
        background-color: rgb(228, 228, 228);
        border-radius: 5px;
        padding: 50px 10px;
        margin-top: -11px;
      }
    }
  }
`;
