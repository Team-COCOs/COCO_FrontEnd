import { styled } from "styled-components";

export const StorePartStyle = styled.div`
  &.StorePartStyle_wrap {
    display: flex;
    gap: 5px;
    width: 100%;
    margin-top: -7px;

    .StorePartStyle_left {
      width: 67%;
    }

    .StorePartStyle_right {
      width: 33%;
    }
  }
`;
