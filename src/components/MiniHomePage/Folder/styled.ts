import styled from "styled-components";

export const FolderStyle = styled.div`
  &.Folder_wrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    height: 100%;

    .Folder_text {
      font-size: 13px;
      margin-left: 7px;
    }

    .Folder_btns {
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-bottom: 10px;
      padding-right: 5px;

      .Folder_editingBtn {
        width: 60px;
      }

      button {
        width: 35px;
        background: linear-gradient(to bottom, #ffffff, #dddddd);
        border: 1px solid #000000;
        cursor: pointer;
        padding: 3px;
        font-size: 12px;

        &:active {
          background: linear-gradient(to top, #ffffff, #dddddd);
        }
      }
    }

    .Folder_submit {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    input {
      height: 20px;
      width: 80%;
    }

    .Folder_footer {
      margin-top: auto;

      .Folder_submit {
        display: flex;
        justify-content: flex-start;
        text-align: left;
        font-size: 12px;
        display: flex;
        gap: 10px;
        align-items: center;
        position: relative;
        bottom: 5px;
        width: 95%;
        margin: 0 auto;
        padding: 3px 10px;
        background: linear-gradient(to bottom, #ffffff, #dddddd);
        border: 1px solid rgb(174, 174, 174);
        cursor: pointer;
      }
    }
  }
`;
