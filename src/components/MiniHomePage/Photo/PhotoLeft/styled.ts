import styled from "styled-components";

export const PhotoLeftStyled = styled.div`
  &.PhotoLeft_wrap {
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    overflow-y: scroll;

    @media (max-width: 768px) {
      & {
        min-height: 80vh;
      }
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;
