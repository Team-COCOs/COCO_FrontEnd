import styled from "styled-components";

export const DiaryCommentsStyle = styled.div`
  .DiaryComments_wrap {
    width: 100%;
  }
  .DiaryComments_mapwrap {
    font-size: 11px;
    img {
      width: 10px;
      margin-left: 5px;
      padding-top: 5px;
      cursor: pointer;
    }
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

  .DiaryComments_date {
    color: #bbb;
    font-size: 8px;
    letter-spacing: 2px;
    font-weight: bold;
    padding-left: 5px;
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
