import { useState } from "react";
import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";
import HomeTodayTitle from "../../components/MiniHomePage/Home/HomeTodayTitle";
import DiaryTitle from "../../components/MiniHomePage/Home/DiaryTitle";
import HomeLeft from "../../components/MiniHomePage/Home/HomeLeft";
import HomeRight from "../../components/MiniHomePage/Home/HomeRight";
import HomeTab from "../../components/MiniHomePage/Home/HomeTab";
import HomeMusicRight from "@/components/MiniHomePage/Home/HomeMusicRight";

const CocoWorld = () => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<string>("Home");
  const router = useRouter();

  // 탭 클릭 시 상태 변경 함수
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <CocoWorldPageStyled className="CocoWorldPage_wrap">
      <div className="CocoWorldPage_container">
        <div className="CocoWorldPage_left">
          <div className="CocoWorldPage_book_wrap">
            {/* 책 왼쪽 */}
            <div className="CocoWorldPage_book_left">
              <div className="CocoWorldPage_bookLeft_line">
                <div className="CocoWorldPage_bookLeft_paper">
                  {/* 투데이 컴포넌트*/}
                  <div className="CocoWorldPage_bookLeft_todayWrap">
                    <HomeTodayTitle />
                  </div>
                  {/* 다이어리 왼쪽 컴포넌트 */}
                  <div className="CocoWorldPage_diary_left">
                    {activeTab === "Home" ? <HomeLeft /> : ""}
                  </div>
                </div>
              </div>
            </div>
            {/* 책 오른쪽 */}
            <div className="CocoWorldPage_book_right">
              <div className="CocoWorldPage_bookRight_line">
                <div className="CocoWorldPage_bookRight_paper">
                  {/* 미니홈피 이름 */}
                  <div className="CocoWorldPage_bookRight_todayWrap">
                    <DiaryTitle />
                  </div>
                  {/* 다이어리 오른쪽 컴포넌트 */}
                  <div className="CocoWorldPage_diary_Right">
                    {activeTab === "Home" ? (
                      <HomeRight
                        activeTab={activeTab}
                        onTabClick={handleTabClick}
                      />
                    ) : (
                      ""
                    )}
                    <HomeMusicRight />
                  </div>
                </div>
              </div>
            </div>
            {/* 미니홈피 탭 */}
            <div className="CocoWorldPage_Tab_Wrap">
              <HomeTab activeTab={activeTab} onTabClick={handleTabClick} />
            </div>
          </div>
        </div>
        {/* <div className="CocoWorldPage_right">
          <HomeMusicRight />
        </div> */}
      </div>
    </CocoWorldPageStyled>
  );
};

export default CocoWorld;
