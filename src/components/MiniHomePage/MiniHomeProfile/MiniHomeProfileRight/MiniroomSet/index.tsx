import React, { useState } from "react";
import { MiniroomSetStyled } from "./styled";
import MakeMiniroom from "./MakeMiniroom";
import MadeMiniroom from "./MadeMiniroom";

interface MiniroomSetProps {
  fixMiniroom: boolean;
  setfixMiniroom: (value: boolean) => void;
}

const MiniroomSet: React.FC<MiniroomSetProps> = ({
  fixMiniroom,
  setfixMiniroom,
}) => {
  return (
    <MiniroomSetStyled>
      <div className="MinimiSet_wrap">
        <div className="MiniroomSet_titleWrap">
          <div className="MiniroomSet_wrap_title Gulim">미니룸 꾸미기</div>
          {fixMiniroom ? (
            <MakeMiniroom setfixMiniroom={setfixMiniroom} />
          ) : (
            <MadeMiniroom setfixMiniroom={setfixMiniroom} />
          )}
        </div>
      </div>
    </MiniroomSetStyled>
  );
};

export default MiniroomSet;
