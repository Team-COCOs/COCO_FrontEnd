import React, { useEffect, useState } from "react";
import { SettingTabsStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import { useLanguage } from "@/context/LanguageContext";
import { useTabs } from "@/context/TabsContext";
import ShadowModal from "@/components/ShadowModal";

const tabOptions = ["diary", "visitor", "photo", "coco"];
const languageOptions = [
  { label: "한국어", value: "ko" },
  { label: "영어", value: "en" },
];

const SettingTabs = () => {
  const router = useRouter();
  const { id } = router.query;
  const { language, setLanguage } = useLanguage();
  const { userTabs, setUserTabs, fetchUserTabs } = useTabs();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // 탭 불러오기
  useEffect(() => {
    if (id && typeof id === "string") {
      fetchUserTabs(id);
    }
  }, [id]);

  // 탭 체크박스 변경
  const handleCheckboxChange = (tab: string) => {
    setUserTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
  };

  // 탭 설정 저장
  const handleTabSubmit = async () => {
    try {
      await axiosInstance.patch(`/useritems/set-tabs`, {
        tabs: userTabs,
      });
      setIsOpen(true);
      setMessage("탭 설정이 저장되었습니다.");
    } catch (error) {
      console.error("탭 설정 저장 실패:", error);
    }
  };

  // 언어 설정 저장
  const handleLanguageSubmit = async () => {
    try {
      await axiosInstance.patch(`/useritems/set-language`, {
        language,
      });
      setIsOpen(true);
      setMessage("언어 설정이 저장되었습니다.");
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
                    checked={tab === "coco" ? true : userTabs.includes(tab)}
                    onChange={() => handleCheckboxChange(tab)}
                    disabled={tab === "coco"}
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
      <ShadowModal
        type="success"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          router.push(`/home/${id}`);
        }}
        message={message}
      ></ShadowModal>
    </SettingTabsStyled>
  );
};

export default SettingTabs;
