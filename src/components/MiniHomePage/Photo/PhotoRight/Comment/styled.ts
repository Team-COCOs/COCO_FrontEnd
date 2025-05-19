import styled from "styled-components";

export const CommentStyle = styled.div`
  &.Comment_wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    padding: 10px 15px;
    background-color: rgb(241, 241, 241);
    margin-top: 10px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 12px;
    width: 100%;

    .handFont {
      font-size: 13px;
      color: rgb(80, 80, 80);
      padding: 5px;

      @media (max-width: 768px) {
        & {
          font-size: 11px;
        }
      }

      @media (max-width: 530px) {
        & {
          font-size: 10px;
        }
      }

      @media (max-width: 430px) {
        & {
          font-size: 9px;
        }
      }
    }

    .Comment_parent,
    .Comment_child {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: bold;
      margin-bottom: 3px;

      .Comment_icon {
        position: relative;
        width: 11px;
        height: 11px;
        cursor: pointer;
        margin: 3px 0 0 5px;
      }

      .Comment_Author {
        color: rgb(46, 105, 188);
        cursor: pointer;
      }

      .Comment_date {
        font-size: 10px;
        font-weight: 600;
        color: rgb(185, 185, 185);
        margin: 2px 0 0 5px;
      }
    }

    .Comment_parent {
      align-items: flex-start;
      flex-direction: column;

      .Comment_infos {
        display: flex;
        gap: 3px;
      }
    }

    .Comment_child {
      margin-left: 20px;
    }

    .Comment_input,
    .Comment_childInput {
      display: flex;
      align-items: center;
      margin-top: 5px;
      gap: 5px;
      width: 100%;

      p {
        width: 35px;
        font-size: 10px;
      }

      input {
        width: 100%;
        height: 23px;
        padding: 2px 5px;
        font-size: 12px;
        border-radius: 5px;
        border: 1.5px solid #ddd;

        @media (max-width: 650px) {
          & {
            max-width: 70%;
          }
        }

        @media (max-width: 530px) {
          & {
            max-width: 60%;
          }
        }

        @media (max-width: 430px) {
          & {
            max-width: 50%;
          }
        }

        &:active,
        &:focus {
          outline: none;
        }
      }

      button {
        width: 45px;
        height: 23px;
        background-color: rgb(248, 248, 248);
        border-radius: 5px;
        border: 1.5px solid #ddd;
        padding: 4px 8px;
        font-size: 10px;
        cursor: pointer;

        &:focus,
        &:active {
          outline: none;
        }
      }
    }

    .Comment_childInput {
      padding-left: 20px;

      .Comment_closeIcon {
        width: 10px;
        cursor: pointer;
        color: rgb(157, 157, 157);
      }
    }
  }
`;
