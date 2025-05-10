import styled from "styled-components";

export const MakeMiniroomStyled = styled.div`
  width: 100%;
  .MakeMiniroom_titleWrap {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }
  .MakeMiniroom_saveBtn_wrap {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .MakeMiniroom_saveBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(212, 238, 255);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
    &:hover {
      background-color: rgb(176, 222, 253);
    }
  }

  .MakeMiniroom_deleteBtn {
    margin-top: 10px;
    padding: 4px 5px;
    background-color: rgb(248, 248, 248);
    color: #4b4b4b;
    font-size: 11px;
    border: 1px solid #4b4b4b;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    width: 38px;
    &:hover {
      background-color: rgb(230, 230, 230);
    }
  }
`;
