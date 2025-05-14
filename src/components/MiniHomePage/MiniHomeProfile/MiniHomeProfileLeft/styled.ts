import styled from "styled-components";

export const MiniHomeProfileLeftStyled = styled.div`
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
      min-height: 60vh;
    }
  }
  .MiniHomeProfileLeft_titleWrap {
    padding: 20px 10px 10px 10px;
  }
  .MiniHomeProfileLeft_title {
    width: 100%;
    margin-left: 10px;
    color: rgb(120, 184, 183);
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .MiniHomeProfileLeft_line {
    width: 93%;
    height: 1px;
    margin: 7px auto 0px auto;
    margin-bottom: 10px;
    background-color: rgb(221, 221, 221);
  }
`;
