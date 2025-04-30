import { styled } from "styled-components";

export const HeaderStyle = styled.div`
  &.Header_wrap {
    display: flex;
    align-items: center;
    width: 100%;

    .Header_logo {
      display: flex;
      justify-content: center;
      width: 20%;
    }

    .Header_search {
      width: 80%;
    }
  }
`;
