import React from "react";
import { SettingBKStyled } from "./styled";
import BKbuy from "./BKbuy";

const SettingBK = () => {
  return (
    <SettingBKStyled>
      <div className="SettingBK_wrap">
        <div className="SettingBK_titleWrap">
          <div className="SettingBK_wrap_title Gulim">
            미니홈피 효과 설정하기
          </div>
          <div className="SettingBK_setBox">
            <h2 className="SettingBK_title Gulim">
              미니홈피 배경색을 꾸며보세요~!
            </h2>
            <div>
              <BKbuy />
            </div>
          </div>
        </div>
      </div>
    </SettingBKStyled>
  );
};

export default SettingBK;
