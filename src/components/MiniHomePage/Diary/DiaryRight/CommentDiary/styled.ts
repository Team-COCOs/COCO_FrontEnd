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

  /* 반응형 */
  @media (max-width: 1024px) {
    .CommentDiary_commentInput {
      width: 75%;
    }
  }
  @media (max-width: 769px) {
  }
  @media (max-width: 600px) {
    .CommentDiary_commentInput {
      width: 65%;
    }
  }
  @media (max-width: 480px) {
    .CommentDiary_commentInput {
      width: 60%;
    }
  }
  @media (max-width: 420px) {
    .CommentDiary_commentInput {
      width: 50%;
    }
  }
  @media (max-width: 380px) {
    .CommentDiary_commentLabel {
      font-size: 8px;
      padding-left: 5px;
    }
    .CommentDiary_commentInput {
      width: 85%;
    }
    .CommentDiary_commentBtn {
      font-size: 8px;
      margin-left: 5px;
    }
  }
`;
