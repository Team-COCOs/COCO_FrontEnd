import styled from "styled-components";

export const FriendCommentStyled = styled.div`
  /* 오른쪽 컴포넌트 기본 CSS 이부분 사용 */
  border-radius: 5px;
  width: 100%;
  height: 100%;
  .FriendComment_wrap {
    .FriendComment_title {
      border-bottom: 1.5px #ddd solid;
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 11px;
      padding-bottom: 5px;
      padding-top: 7px;
      font-weight: bold;
      span {
        font-weight: lighter;
        padding-left: 15px;
        color: #4b4b4b;
        font-size: 11px;
      }
    }
  }
  .FriendComment_commentWrap {
    margin-top: 5px;
    padding: 10px 15px;
    width: 100%;
    background-color: #eee;
    border: 1px solid #ddd;
  }
  /* 일촌평 디자인 input */
  .FriendComment_inputWrap {
    display: flex;
    align-items: center;
    gap: 3px;
    span {
      width: 15%;
      color: ${({ theme }) => theme.colors.tabColor};
      font-size: 12px;
    }
    input {
      width: 75%;
      padding: 3px 6px;
      font-size: 12px;
      font-family: "Gulim", "Dotum", sans-serif;
      background-color: #fefefe;
      border: 1px solid #aaa;
      box-shadow: inset 1px 1px 1px #ddd;
      color: #333;
      outline: none;
    }
    button {
      padding: 4px 3px;
      background-color: #ffffff;
      border: 1px solid #999999;
      font-family: "Gulim", "Dotum", sans-serif;
      font-size: 11px;
      color: black;
      font-weight: bolder;
      cursor: pointer;
      box-shadow: 1.5px 2px 0px #ccc;
      transition: all 0.2s;
    }

    button:hover {
      background-color: #f0f0f0;
    }
  }

  .FriendComment_displayWrap {
    font-size: 12.5px;
    color: #4b4b4b;
    border-bottom: 1px solid #ccc;
    padding: 8px 0px;
  }
  .FriendComment_name_navytext {
    color: rgb(44, 44, 161);
    font-size: 12.5px;
    font-weight: bolder;
  }
  .FriendComment_datetext {
    font-size: 10px;
    color: gray;
    text-align: center;
  }
  // 반응형
  @media (max-width: 1024px) {
    .FriendComment_inputWrap {
      span {
        width: 10%;
        font-size: 9px;
      }
      input {
        padding: 5px 2px;
        font-size: 9.5px;
      }
      button {
        padding: 4px 2px;
      }
    }
  }
  @media (max-width: 769px) {
    .FriendComment_inputWrap {
      span {
        width: 11.5%;
        font-size: 11px;
      }
      input {
        padding: 6px 5px;
        font-size: 10px;
      }
      button {
        padding: 6px 2px;
      }
    }
  }
  @media (max-width: 480px) {
    .FriendComment_commentWrap {
      padding: 6px 5px;
    }
    .FriendComment_inputWrap {
      gap: 5px;
      span {
        font-size: 9px;
        width: 10%;
      }
      input {
        padding: 6px 3px;
        font-size: 9px;
      }
      button {
        padding: 6px 1px;
        font-size: 8px;
      }
    }
    .FriendComment_wrap .FriendComment_title span {
      font-size: 9px;
    }
  }

  @media (max-width: 386px) {
    .FriendComment_commentWrap {
      padding: 6px 5px;
    }
    .FriendComment_inputWrap {
      gap: 3px;
      span {
        font-size: 8px;
      }
      input {
        font-size: 7px;
      }
      button {
        font-size: 7px;
      }
    }
  }

  .FriendComment_inputWrap button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
