import React, { useEffect, useState } from "react";
import { SettingTabsStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const tabOptions = ["diary", "visitor", "photo", "coco"];
const languageOptions = [
  { label: "한국어", value: "ko" },
  { label: "영어", value: "en" },
];

const SettingTabs = () => {
  const { query } = useRouter();
  const { id } = query;

  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("ko");

  // 기존 설정 불러오기
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // const { data } = await axiosInstance.get(`/user/settings/${id}`);
        // if (data.tabs) setSelectedTabs(data.tabs);
        // if (data.language) setLanguage(data.language);
      } catch (error) {
        console.error("설정 불러오기 실패:", error);
      }
    };

    if (id) fetchSettings();
  }, [id]);

  // 탭 체크박스 변경
  const handleCheckboxChange = (tab: string) => {
    setSelectedTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
  };

  // 언어 라디오 변경
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };

  // 탭 설정 저장
  const handleTabSubmit = async () => {
    try {
      // await axiosInstance.post(`/user/settings/tabs/${id}`, {
      //   tabs: selectedTabs,
      // });
      alert("탭 설정이 저장되었습니다.");
    } catch (error) {
      console.error("탭 설정 저장 실패:", error);
    }
  };

  // 언어 설정 저장
  const handleLanguageSubmit = async () => {
    try {
      // await axiosInstance.post(`/user/settings/language/${id}`, {
      //   language,
      // });
      alert("언어 설정이 저장되었습니다.");
    } catch (error) {
      console.error("언어 설정 저장 실패:", error);
    }
  };

  return (
    <SettingTabsStyled>
      <div className="SettingTabs_wrap">
        <div className="SettingTabs_titleWrap">
          <div className="SettingTabs_wrap_title Gulim">메뉴 탭 설정하기</div>
          <div className="SettingTabs_setBox">
            <h2 className="SettingTabs_title Gulim">🔸탭 설정하기</h2>
            <div>
              {tabOptions.map((tab) => (
                <label key={tab} className="Gulim">
                  <input
                    type="checkbox"
                    checked={selectedTabs.includes(tab)}
                    onChange={() => handleCheckboxChange(tab)}
                  />
                  {tab}
                </label>
              ))}
            </div>
            <div className="SettingTabs_btnWrap">
              <button onClick={handleTabSubmit} className="SettingTabs_savebtn">
                저장
              </button>
            </div>
          </div>
          <div className="SettingTabs_setBox">
            <h2 className="SettingTabs_title Gulim">🔸언어 설정하기</h2>
            <div>
              {languageOptions.map(({ label, value }) => (
                <label key={value} className="Gulim">
                  <input
                    type="radio"
                    value={value}
                    checked={language === value}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="SettingTabs_btnWrap">
              <button
                onClick={handleLanguageSubmit}
                className="SettingTabs_savebtn"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </SettingTabsStyled>
  );
};

export default SettingTabs;
