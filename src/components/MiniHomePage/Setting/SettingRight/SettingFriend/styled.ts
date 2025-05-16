import styled from "styled-components";

export const SettingFriendStyle = styled.div`
  &.SettingFriend_wrap {
    width: 100%;

    .SettingFriend_header {
      color: #4b4b4b;
      font-size: 12px;
      font-weight: bolder;
      padding-bottom: 7px;
      border-bottom: 1.5px dotted #ddd;
      margin-bottom: 7px;

      .SettingFriend_title {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
      }
    }

    .SettingFriend_body {
      display: flex;
      justify-content: center;
      margin-top: 15px;

      .Friend_grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;
        width: 100%;
        max-width: 800px;

        .Friend_card {
          position: relative;
          background-color: rgb(255, 250, 240);
          border: 2px solid rgb(224, 214, 191);
          border-radius: 8px;
          padding: 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .Delete_btn {
            position: absolute;
            top: 6px;
            right: 10px;
            font-weight: bold;
            background: none;
            border: none;
            font-size: 16px;
            color: rgb(224, 214, 191);
            cursor: pointer;
            z-index: 1;

            &:hover {
              color: rgb(219, 189, 124);
            }
          }

          .Friend_img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
          }

          .Friend_text {
            text-align: center;

            .Friend_name {
              font-weight: bold;
              font-size: 13px;
              margin-bottom: 7px;
            }

            .Friend_naming {
              font-size: 11px;
              color: rgb(127, 127, 127);
            }
          }
        }
      }
    }
  }
`;
