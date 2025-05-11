import styled from "styled-components";

export const PhotoLeftStyled = styled.div`
  &.PhotoLeft_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    overflow-y: scroll;

    .PhotoLeft_btn {
      width: 80%;
      margin: 0 auto;
    }

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
