import React from "react";
import { MadeMiniroomStyled } from "./styled";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface MadeMiniroomProps {
  setfixMiniroom: (value: boolean) => void;
}

const MadeMiniroom: React.FC<MadeMiniroomProps> = ({ setfixMiniroom }) => {
  return (
    <MadeMiniroomStyled>
      <div className="MinimiSet_wrap">
        <div className="MadeMiniroom_titleWrap">
          <div className="MadeMiniroom_wrap_title Gulim">
            미니룸 수정 완료 부분
            <span onClick={() => setfixMiniroom(true)}>✏️</span>
          </div>
        </div>
      </div>
    </MadeMiniroomStyled>
  );
};

export default MadeMiniroom;
