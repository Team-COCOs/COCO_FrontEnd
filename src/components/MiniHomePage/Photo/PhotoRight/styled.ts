import styled from "styled-components";

/* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
export const PhotoRightStyled = styled.div`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .PhotoRight_wrap {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 98%;
    height: 95%;
    white-space: normal;
    overflow-y: auto;
    overflow-x: hidden;

    .PhotoRight_header {
      width: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 10px;

      .PhotoRight_btn {
        padding: 3px;
        width: 75px;
        font-size: 12px;
        background: linear-gradient(to bottom, #ffffff, #dddddd);
        border: 1px solid #000000;
        border-radius: 3px;
        cursor: pointer;

        &:active {
          background: linear-gradient(to top, #ffffff, #dddddd);
        }
      }
    }

    .PhotoRight_content {
      width: 95%;
      padding: 10px;
      margin: 0 auto;

      .PhotoRight_title {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        padding: 7px;
        font-size: 13.5px;
        font-weight: bold;
        background-color: rgb(241, 241, 241);
        border-top: 1.5px solid rgb(209, 209, 209);
      }

      .PhotoRight_infos {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        font-weight: bold;
        margin-top: 5px;

        .PhotoRight_user {
          color: rgb(46, 105, 188);
          cursor: pointer;
        }

        .PhotoRight_info {
          display: flex;
          gap: 15px;
          font-size: 13px;
          align-items: center;

          .PhotoRight_font {
            font-size: 12px;
            margin-top: 2px;
          }
        }
      }
    }

    .PhotoRight_imgBox {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      height: 100%;
      max-height: 350px;
      padding: 0 15px;
      margin: 10px 0;

      .PhotoRight_img {
        position: relative;
        width: 100%;
        height: 350px;
      }

      @media (max-width: 768px) {
        & {
          width: 100%;
          height: 350px;

          .PhotoRight_img {
            max-height: 350px;
          }
        }
      }
    }

    .PhotoRight_isPublic {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px;
      font-size: 13px;
      font-weight: bold;
      color: rgb(169, 169, 169);

      .PhotoRight_line {
        font-size: 10px;
        font-weight: 100;
        margin: 0 2px;
      }
    }

    /* 스크롤바 커스텀 */
    &::-webkit-scrollbar {
      width: 16px;
      background-color: #f0f0f0;
    }

    &::-webkit-scrollbar-track {
      background-color: rgb(237, 237, 237);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(215, 215, 215);
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: rgb(206, 206, 206);
    }

    &::-webkit-scrollbar-button {
      background-color: #e0e0e0;
      height: 16px;
      display: block;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><polygon points='5,2 2,6 8,6' fill='%23666'/></svg>");
      background-repeat: no-repeat;
      background-position: center;
    }

    &::-webkit-scrollbar-button:single-button:vertical:decrement {
      height: 16px;
      background-color: #e0e0e0;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><polygon points='5,2 2,6 8,6' fill='%23ffffff'/></svg>");
      background-repeat: no-repeat;
      background-position: center;
      border-bottom: 1px solid rgb(255, 255, 255);
    }

    /* 스크롤바 버튼 아래쪽 (▼) */
    &::-webkit-scrollbar-button:single-button:vertical:increment {
      height: 16px;
      background-color: #e0e0e0;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><polygon points='5,8 2,4 8,4' fill='%23ffffff'/></svg>");
      background-repeat: no-repeat;
      background-position: center;
      border-top: 1px solid rgb(255, 255, 255);
    }

    /* 나머지 버튼 제거 */
    &::-webkit-scrollbar-button:vertical:start:increment,
    &::-webkit-scrollbar-button:vertical:end:decrement {
      display: none;
    }
  }
`;
