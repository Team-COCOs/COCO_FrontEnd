import styled from "styled-components";

export const DiaryWriteEditorStyle = styled.div`
  &.DiaryWriteEditor_wrap {
    width: 98%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    border: 1.5px solid rgb(204, 204, 204);
    border-radius: 3px;

    .DiaryWriteEditor_toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 5px 7px;
      background-color: rgb(249, 249, 249);

      select {
        width: 70px;
        max-width: auto;
      }

      select,
      button {
        font-size: 14px;
        border: 1px solid #aaa;
        background-color: rgb(249, 249, 249);
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #eee;
        }

        &:active,
        &:focus {
          outline: none;
        }
      }

      .DiaryWriteEditor_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;

        .DiaryWriteEditor_bold {
          font-weight: bold;
        }

        .DiaryWriteEditor_italic {
          font-style: italic;
          font-weight: bold;
          margin-right: 2px;
        }

        .DiaryWriteEditor_underline {
          font-weight: bold;
          text-decoration: underline;
        }

        img {
          width: 17px;
          height: 17px;
        }
      }
    }

    .DiaryWriteEditor_area {
      min-height: 200px;
      border: 1px solid #ddd;
      padding: 12px;
      font-size: 14px;
      white-space: pre-wrap;
      outline: none;
    }

    .DiaryWriteEditor_isPublic {
      display: flex;
      align-items: center;
      justify-content: right;
      background-color: rgb(249, 249, 249);
      padding: 5px 8px;

      p {
        font-size: 12px;
        font-weight: bold;
        width: 60px;
      }

      .Dropdown_select {
        margin-top: 0;
        width: 90px;
        margin-left: -3px;
      }
    }
  }
`;
