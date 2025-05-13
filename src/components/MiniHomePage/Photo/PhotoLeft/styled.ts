import styled from "styled-components";

export const PhotoLeftStyled = styled.div`
  &.PhotoLeft_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    overflow-y: scroll;

    .PhotoLeft_title {
      margin-left: 10px;
      color: rgb(120, 184, 183);
      font-size: 18px;
      font-weight: bold;
    }

    .PhotoLeft_line {
      width: 95%;
      height: 2px;
      margin: 7px auto 0px auto;
      background-color: rgb(221, 221, 221);
    }

    .PhotoLeft_footer {
      margin-top: auto;

      .PhotoLeft_btn {
        text-align: left;
        font-size: 12px;
        display: flex;
        gap: 10px;
        align-items: center;
        position: relative;
        bottom: 5px;
        width: 95%;
        margin: 0 auto;
        padding: 3px 10px;
        background-color: white;
        border: 1px solid rgb(174, 174, 174);
        cursor: pointer;
      }
    }

    @media (max-width: 768px) {
      & {
        height: 80vh;
      }
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
`;
