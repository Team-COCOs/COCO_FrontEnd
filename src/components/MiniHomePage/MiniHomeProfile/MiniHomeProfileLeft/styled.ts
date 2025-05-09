import styled from "styled-components";

export const MiniHomeProfileLeftStyled = styled.div`
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
  width: 100%;
  height: 100%;
  .MiniHomeProfileLeft_wrap {
    width: 100%;
    height: 100%;
  }
  .MiniHomeProfileLeft_componentWrap {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 769px) {
    .MiniHomeProfileLeft_wrap {
      min-height: 80vh;
    }
  }
`;
