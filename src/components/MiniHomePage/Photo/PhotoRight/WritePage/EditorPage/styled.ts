import styled from "styled-components";

export const EditorPageStyle = styled.div`
  &.EditorPage_wrap {
    border: 1.5px solid rgb(204, 204, 204);
    border-radius: 3px;

    .EditorPage_toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px;

      select,
      button {
        font-family: "Gulim";
        font-size: 14px;
        padding: 4px 8px;
        border: 1px solid #aaa;
        background-color: #f9f9f9;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #eee;
        }
      }
    }

    .EditorPage_area {
      min-height: 200px;
      border: 1px solid #ddd;
      padding: 12px;
      font-size: 14px;
      white-space: pre-wrap;
      outline: none;
    }
  }
`;
