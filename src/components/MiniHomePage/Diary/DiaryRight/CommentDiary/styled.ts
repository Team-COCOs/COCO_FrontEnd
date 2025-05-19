import styled from "styled-components";

export const CommentDiaryStyle = styled.div`
  .CommentDiary_wrap {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 100%;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
    padding: 10px 15px;
  }
  .CommentDiary_inputWrap {
    margin: 10px 0px;
  }
  .CommentDiary_commentLabel {
    font-size: 11px;
    font-weight: bold;
    width: 5%;
  }
  .CommentDiary_commentInput {
    padding: 0px 5px;
    margin: 0px 5px;
    width: 80%;
  }
  /* 버튼 */
  .CommentDiary_commentBtn {
    padding: 2px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 10px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
  }

  /* 댓글 css */
  .DiaryComments_wrap {
    width: 100%;
  }
  .DiaryComments_mapwrap {
    font-size: 11px;
  }
  .DiaryComments_author {
    color: rgb(10, 69, 152);
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
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
    padding-bottom: 5px;
    img {
      width: 10px;
      margin-left: 5px;
      padding-top: 3px;
      cursor: pointer;
    }
  }
  .DiaryComments_childrenComment {
    padding: 8px 0px 3px 30px;
  }
  .DiaryComments_childrenComment_wrap {
    padding: 3px 0px 3px 30px;
    margin-top: 5px;
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
    width: 78%;
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
    .CommentDiary_commentInput {
      width: 75%;
    }
    .DiaryComments_commentInput {
      width: 73%;
    }
  }

  @media (max-width: 600px) {
    .CommentDiary_commentInput {
      width: 62%;
    }
    .DiaryComments_commentInput {
      width: 58%;
    }
  }
  @media (max-width: 480px) {
    .CommentDiary_commentInput {
      width: 54%;
    }
    .DiaryComments_commentInput {
      width: 52%;
    }
    .DiaryComments_childrenComment {
      padding: 3px 0px 3px 25px;
    }
  }
  @media (max-width: 420px) {
    .CommentDiary_commentInput {
      width: 80%;
    }
    .DiaryComments_commentInput {
      width: 80%;
    }
    .DiaryComments_author {
      font-size: 9px;
    }
    .DiaryComments_content {
      font-size: 9px;
    }
    .DiaryComments_childrenComment {
      padding: 3px 0px 3px 0px;
    }
  }
  @media (max-width: 380px) {
    .CommentDiary_commentLabel {
      font-size: 8px;
      padding-left: 5px;
    }

    .CommentDiary_commentBtn {
      font-size: 8px;
      margin-left: 5px;
    }
    .CommentDiary_commentInput {
      width: 80%;
    }
    .DiaryComments_commentInput {
      width: 80%;
    }
    .DiaryComments_author {
      font-size: 8px;
    }
    .DiaryComments_content {
      font-size: 8px;
    }
    .DiaryComments_date {
      font-size: 7px;
    }
    .DiaryComments_childrenComment_wrap {
      padding: 3px 0px 3px 15px;
    }
    .DiaryComments_commentLabel {
      font-size: 8px;
      padding-left: 5px;
    }
    .DiaryComments_commentBtn {
      margin-left: 5px;
      margin-top: 5px;
    }
    .DiaryComments_commentInput {
      margin-top: 5px;
    }
  }
`;
