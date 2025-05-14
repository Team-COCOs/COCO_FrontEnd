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
    font-size: 13px;

    .Comment_parent,
    .Comment_child {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 3px;

      .Comment_icon {
        position: relative;
        width: 11px;
        height: 11px;
        cursor: pointer;
        margin: 3px 0 0 5px;
      }
    }

    .Comment_child {
      margin-left: 20px;
    }

    .Comment_input {
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
      }
    }
  }
`;
