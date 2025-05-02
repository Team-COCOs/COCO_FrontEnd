import styled from "styled-components";

export const DropdownStyle = styled.div`
  &.Dropdown_select {
    position: relative;
    width: 100%;
    margin-top: 7px;
    font-size: 13px;

    .Dropdown_default {
      width: 100%;
      padding: 3px 7px 2px;
      font-size: 13px;
      cursor: pointer;
      background-color: white;
      border: 1px solid #aaa;
      text-align: left;
      display: flex;
      justify-content: space-between;

      &:focus {
        outline: none;
      }

      .Dropdown_arrow {
        width: 10px;
        font-size: 16px;
        color: rgb(96, 96, 96);
      }
    }

    .Dropdown_options {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #aaa;
      border-top: none;
      list-style: none;
      z-index: 10;
      border-radius: 0;

      .Dropdown_option {
        padding: 5px;
        cursor: pointer;

        &:hover {
          background-color: #eee;
        }
      }
    }
  }
`;
