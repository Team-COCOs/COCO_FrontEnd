import styled from "styled-components";

export const AdminPageStyled = styled.div`
  &.AdminPage_wrap {
    display: flex;
    flex-direction: column;
    width: 1280px;
    padding-top: 80px;
    /* 헤더 */
    .AdminPage_header {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      padding-left: 50px;
      font-size: 25px;
      font-weight: bold;
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);
      background-color: white;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 900;

      h2 {
        margin-left: 12px;
        font-size: 25px;
        cursor: pointer;
      }
    }
    // 헤더 로고
    .AdminPage_header_logo {
      display: flex;
      width: 55px;
      height: 55px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    /* 헤더 끝 */
    /* 본문 */
    .Admin_content_wrap {
      display: flex;
    }
    .Admin_content_left {
      width: 256px;
      position: fixed;
      left: 0;
      height: 100vh;
      z-index: 100;
    }
    .Admin_content_right {
      width: calc(100vw - 256px);
      padding: 25px 30px;
      margin-left: 256px;
    }
  }
`;
