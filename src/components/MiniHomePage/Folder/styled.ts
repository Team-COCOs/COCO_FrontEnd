import styled from "styled-components";

export const FolderStyle = styled.div`
  &.Folder_wrap {
    .Folder_btns {
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-bottom: 20px;
    }

    .Folder_submit {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    button {
      width: 50px;
    }
  }
`;
