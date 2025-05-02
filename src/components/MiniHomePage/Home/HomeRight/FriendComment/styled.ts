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
      padding: 4px;
    }
  }

  .FriendComment_inputWrap button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
