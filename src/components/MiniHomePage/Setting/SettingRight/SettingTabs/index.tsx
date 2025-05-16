import React, { useEffect, useState } from "react";
import { SettingTabsStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

const tabOptions = ["diary", "visitor", "photo", "coco"];
const languageOptions = [
  { label: "한국어", value: "ko" },
  { label: "영어", value: "en" },
];

const SettingTabs = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const { language, setLanguage } = useLanguage();

  // 탭 기본 설정 불러오기
  useEffect(() => {
    if (!id) return;
    const fetchTabSettings = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/tabs/${id}`
        );
        setSelectedTabs(data);
        console.log(data, "tab 데이터 오는지");
      } catch (error) {
        console.error("설정 불러오기 실패:", error);
      }
    };
    fetchTabSettings();
  }, [id]);

  // 탭 체크박스 변경
  const handleCheckboxChange = (tab: string) => {
    setSelectedTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
  };

  // 탭 설정 저장
  const handleTabSubmit = async () => {
    try {
      await axiosInstance.patch(`/useritems/set-tabs`, {
        tabs: selectedTabs,
      });
      console.log(selectedTabs, "저장하는 탭 데이터");
      alert("탭 설정이 저장되었습니다.");
      router.push(`/home/${id}`);
    } catch (error) {
      console.error("탭 설정 저장 실패:", error);
    }
  };

  // 언어 불러오기
  // useEffect(() => {
  //   if (!id) return;
  //   const fetchLanguage = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/useritems/language/${id}`
  //       );
  //       setLanguage(response.data);
  //     } catch (error) {
  //       console.error("언어 설정 불러오기 실패:", error);
  //     }
  //   };
  //   fetchLanguage();
  // }, [id, setLanguage]);

  // 언어 설정 저장
  const handleLanguageSubmit = async () => {
    try {
      await axiosInstance.patch(`/useritems/set-language`, {
        language,
      });
      console.log(language, "저장하는 언어 설정 데이터");
      alert("언어 설정이 저장되었습니다.");
      router.push(`/home/${id}`);
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
                    onChange={(e) => setLanguage(e.target.value as "ko" | "en")}
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
