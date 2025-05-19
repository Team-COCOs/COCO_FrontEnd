import styled from "styled-components";

export const DiaryCommentsStyle = styled.div`
  .DiaryComments_wrap {
    width: 100%;
  }
  .DiaryComments_mapwrap {
    font-size: 11px;
  }
  .DiaryComments_author {
    color: navy;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
  }

  .DiaryComments_content {
    color: #4b4b4b;
    font-size: 11.5px;
    letter-spacing: 1px;
  }

  /* .DiaryComments_childarrow {
    padding-top: 5px;
  } */

  .DiaryComments_date {
    color: #bbb;
    font-size: 8px;
    letter-spacing: 2px;
    font-weight: bold;
    padding-left: 5px;
  }
  .DiaryComments_parentComment {
    padding: 3px;
    img {
      width: 10px;
      margin-left: 5px;
      padding-top: 10px;
      cursor: pointer;
    }
  }
  .DiaryComments_childrenComment {
    padding: 3px 0px 3px 55px;
  }
  .DiaryComments_childarrow {
    color: gray;
  }
  .DiaryComments_comment_deletebtn {
    color: #aaa;
    padding-left: 5px;
    padding-top: 3px;
    cursor: pointer;
  }

  .DiaryComments_inputWrap {
    margin: 10px 0px;
  }
  .DiaryComments_commentLabel {
    font-size: 11px;
    font-weight: bold;
    width: 5%;
  }
  .DiaryComments_commentInput {
    padding: 0px 5px;
    margin: 0px 5px;
    width: 65%;
  }
  /* 버튼 */
  .DiaryComments_commentBtn {
    padding: 2px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 10px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
  }
  /* 반응형 */
  @media (max-width: 1024px) {
  }
  @media (max-width: 769px) {
  }
  @media (max-width: 600px) {
  }
  @media (max-width: 480px) {
  }
  @media (max-width: 420px) {
  }
  @media (max-width: 380px) {
  }
`;
