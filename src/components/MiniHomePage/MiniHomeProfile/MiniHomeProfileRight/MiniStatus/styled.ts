import styled from "styled-components";

export const MiniStatusStyle = styled.div`
  &.MiniStatus_wrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;

    .MiniStatus_title {
      color: #4b4b4b;
      font-size: 12px;
      font-weight: bolder;
      padding-bottom: 7px;
      border-bottom: 1.5px dotted #ddd;
      margin-bottom: 7px;
    }

    .MiniStatus_top {
      display: flex;
      gap: 10px;

      .MiniStatus_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 50%;

        .MiniStatus_img {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .MiniStatus_upload {
          width: 90px;
          text-align: center;
          font-size: 13px;
          border: 1px solid rgb(186, 186, 186);
          padding: 4px 8px;
          cursor: pointer;

          label {
            cursor: pointer;
          }

          .MiniStatus_input {
            display: none;
          }
        }
      }
    }
  }
`;
