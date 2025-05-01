import { styled } from "styled-components";

export const MainTopContainerStyle = styled.div`
  &.MainTopContainer_wrap {
    display: flex;
    gap: 5px;
    width: 100%;
    margin-top: -7px;

    .MainTopContainer_left {
      width: 67%;
    }

    .MainTopContainer_right {
      width: 33%;
    }
  }
`;
