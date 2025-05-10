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
            미니룸
            <span onClick={() => setfixMiniroom(true)}>✏️</span>
          </div>
          <div className="MadeMiniroom_imgWrap">
            <img alt={"miniroom img"} src={"/miniroom/miniroom17.png"} />
          </div>
          <div className="MadeMiniroom_ex_text pixelFont">
            미니룸을 꾸며보세요~!
          </div>
        </div>
      </div>
    </MadeMiniroomStyled>
  );
};

export default MadeMiniroom;
