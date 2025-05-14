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
    font-weight: bold;
    font-size: 13px;

    .handFont {
      font-size: 15px;
      color: rgb(80, 80, 80);
      padding: 5px;
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
      }

      input {
        width: 100%;
        height: 23px;
        padding: 2px 5px;
        font-size: 12px;

        &:active,
        &:focus {
          outline: none;
        }
      }

      button {
        padding: 1px 3px;
        width: 40px;
        height: 23px;
        font-size: 12px;
        border: 1px solid rgb(84, 84, 84);
        color: rgb(61, 61, 61);
        border-radius: 3px;
        cursor: pointer;

        &:active {
          background: linear-gradient(to top, #ffffff, #dddddd);
        }

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
