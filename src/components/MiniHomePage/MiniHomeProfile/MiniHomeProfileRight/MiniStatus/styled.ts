import styled from "styled-components";

export const MiniStatusStyle = styled.div`
  &.MiniStatus_wrap {
    height: 100%;
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
      padding: 10px 0px;

      .MiniStatus_left,
      .MiniStatus_right {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        width: 50%;

        .MiniStatus_img {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .MiniStatus_upload {
          width: 90px;
          text-align: center;
          font-size: 12px;
          background: linear-gradient(to bottom, #ffffff, #dddddd);
          border: 1px solid #000000;
          border-radius: 3px;
          padding: 4px 8px;
          cursor: pointer;

          &:active {
            background: linear-gradient(to top, #ffffff, #dddddd);
          }

          label {
            cursor: pointer;
          }

          .MiniStatus_input {
            display: none;
          }
        }
      }

      .MiniStatus_right {
        padding: 10px;

        .MiniStatus_state {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 25px;
          border: 1px solid rgb(201, 201, 201);
          padding: 10px;
          margin-top: 10px;

          .MiniStatus_select {
            width: 150px;
            padding: 5px;

            &:active,
            &:focus {
              outline: none;
            }
          }
        }

        .MiniStatus_introduce {
          width: 100%;
          margin-top: -5px;

          span {
            font-size: 14px;
          }

          textarea {
            margin-top: 5px;
            width: 100%;
            height: 138px;
            border: 1px solid rgb(201, 201, 201);
            padding: 10px;
            resize: none;

            &:active,
            &:focus {
              outline: none;
            }
          }
        }
      }

      @media (max-width: 768px) {
        & {
          flex-direction: column;

          .MiniStatus_left,
          .MiniStatus_right {
            width: 100%;
          }
        }
      }
    }

    .MiniStatus_bottom {
      width: 100%;
      padding: 10px;

      .MiniStatus_name {
        display: flex;
        flex-direction: column;
        gap: 10px;

        span {
          font-size: 14px;
        }

        input {
          width: 100%;
          height: 30px;
          padding: 10px;
          border: 1px solid rgb(201, 201, 201);

          &:active,
          &:focus {
            outline: none;
          }
        }
      }
    }

    .MiniStatus_footer {
      display: flex;
      justify-content: flex-end;
      margin-top: auto;
      width: 100%;
      padding: 10px;

      .MiniStatus_btn {
        padding: 3px;
        width: 40px;
        font-size: 13px;
        background: linear-gradient(to bottom, #ffffff, #dddddd);
        border: 1px solid #000000;
        border-radius: 3px;

        &:active {
          background: linear-gradient(to top, #ffffff, #dddddd);
        }
      }
    }
  }
`;
