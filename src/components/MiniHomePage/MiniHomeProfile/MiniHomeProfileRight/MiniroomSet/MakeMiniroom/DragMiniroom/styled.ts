import styled from "styled-components";

export const DragMiniroomStyled = styled.div`
  width: 100%;
  height: 100%;
  .DragMiniroom_allWrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow-x: scroll;
  }
  .DragMiniroom_speechbubble_btnwrap {
    width: 500px;
    display: flex;
    justify-content: flex-end;
    button {
      width: 80px;
      text-align: center;
      font-size: 11px;
      background: linear-gradient(to bottom, #ffffff, #dddddd);
      border: 1px solid #000000;
      border-radius: 3px;
      padding: 6px 8px;
      cursor: pointer;
      margin-top: 5px;
    }
  }
  .DragMiniroom_miniroomtext {
    padding-top: 5px;
    display: flex;
    width: 90%;
    justify-content: flex-start;
    font-size: 8px;
    color: gray;
  }
`;
