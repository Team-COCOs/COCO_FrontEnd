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
          <div className="MakeMiniroom_wrap_title Gulim">미니룸 수정</div>
          <button>저장</button>
          <button onClick={() => setfixMiniroom(false)}>취소</button>
        </div>
      </div>
    </MakeMiniroomStyled>
  );
};

export default MakeMiniroom;
