import styled from "styled-components";

export const DiaryLeftStyled = styled.div`
  &.DiaryLeft_wrap {
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

    .PhotoLeft_btns {
      width: 100%;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-bottom: 20px;
    }

    .PhotoLeft_submit {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    button {
      width: 50px;
    }
  }
`;
