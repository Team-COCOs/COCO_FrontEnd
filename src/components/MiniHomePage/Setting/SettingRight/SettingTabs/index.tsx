import React from "react";
import { SettingTabsStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SettingTabs = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <SettingTabsStyled>
      <div className="MinimiSet_wrap">
        <div className="SettingTabs_titleWrap">
          <div className="SettingTabs_ex_text pixelFont">메뉴</div>
        </div>
      </div>
    </SettingTabsStyled>
  );
};

export default SettingTabs;
