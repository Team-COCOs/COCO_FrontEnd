import React, { useEffect, useState } from "react";
import { SettingBKStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const SettingBK = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <SettingBKStyled>
      <div className="SettingBK_wrap">
        <div className="SettingBK_titleWrap">
          <div className="SettingBK_wrap_title Gulim">
            미니홈피 효과 설정하기
          </div>
          <div className="SettingBK_setBox">
            <h2 className="SettingBK_title Gulim">🔸배경색 꾸미기</h2>
            <div></div>
            <div className="SettingBK_btnWrap">
              <button className="SettingBK_savebtn">저장</button>
            </div>
          </div>
        </div>
      </div>
    </SettingBKStyled>
  );
};

export default SettingBK;
