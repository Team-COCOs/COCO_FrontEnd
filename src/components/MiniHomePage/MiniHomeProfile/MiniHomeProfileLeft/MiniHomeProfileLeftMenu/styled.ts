import styled from "styled-components";

export const MiniHomeProfileLeftMenuStyled = styled.div`
  padding-top: 20px;
  padding-left: 18px;
  font-size: 12px;
  .MiniHomeProfileLeftMenu_dotted_wrap {
    display: flex;
    height: 13px;
    margin-bottom: 10px;
    margin-top: 5px;
    padding-left: 5px;
    li {
      padding-left: 5px;
      padding-top: 5px;
    }
  }

  li {
    padding-left: 0px;
    position: relative;
    padding-top: 3px;
    padding-bottom: 5px;
    font-weight: bold;
    color: #4b4b4b;
  }
  li.has-children li {
    color: navy;
  }

  li.has-children li::before {
    content: "";
  }

  .dot-symbol {
    color: orange;
    font-size: 8px;
    padding-right: 5px;
  }
`;
