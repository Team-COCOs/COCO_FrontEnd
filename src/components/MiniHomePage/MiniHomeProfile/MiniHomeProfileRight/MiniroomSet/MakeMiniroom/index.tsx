import React from "react";
import { MakeMiniroomStyled } from "./styled";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface MakeMiniroomProps {
  setfixMiniroom: (value: boolean) => void;
}

const MakeMiniroom: React.FC<MakeMiniroomProps> = ({ setfixMiniroom }) => {
  return (
    <MakeMiniroomStyled>
      <div className="MinimiSet_wrap">
        <div className="MakeMiniroom_titleWrap">
          <div className="MakeMiniroom_wrap_title Gulim">미니룸 수정하기</div>
          <div className="MakeMiniroom_saveBtn_wrap">
            <button className="MakeMiniroom_saveBtn Gulim">저장</button>
            <button
              className="MakeMiniroom_deleteBtn Gulim"
              onClick={() => setfixMiniroom(false)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </MakeMiniroomStyled>
  );
};

export default MakeMiniroom;
