import { styled } from "styled-components";

export const DynamicFolderStyled = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0 !important;
  }

  li {
    list-style: none;
    margin-left: 0 !important;
    padding-left: 0 !important;
  }

  padding-top: 10px;
  padding-left: 7px;
  font-size: 12px;

  .DynamicFolder_dotted_wrap {
    display: flex;
    height: 13px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding-left: 5px;

    .DynamicFolder_menu {
      border-left: 2px dotted #bbb;
      border-bottom: 2px dotted #bbb;
      padding: 0 4px;
    }

    li {
      padding-left: 5px;
      padding-top: 5px;
    }
  }

  li {
    padding-left: 0px;
    position: relative;
    padding-top: 3px;
    font-weight: bold;
    color: #4b4b4b;
  }

  li.has-children li {
    color: navy;
  }

  li.has-children li::before {
    content: "";
  }

  .DynamicFolder_texts {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .dot-symbol {
    color: orange;
    font-size: 12px;
    padding-right: 5px;
  }

  .DynamicFolder_menu_cursor {
    cursor: pointer;
    font-size: 11px;
  }
`;
