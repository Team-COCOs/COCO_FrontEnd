import styled from "styled-components";

export const MiniHomeProfileLeftMenuStyled = styled.div`
  li {
    padding-left: 5px;
  }

  .none-children::before {
    content: "▪️";
    position: absolute;
    left: 0;
    color: orange;
    font-size: 20px;
  }
`;
