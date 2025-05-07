import { useState, useEffect } from "react";
import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";
import HomeTodayTitle from "../../components/MiniHomePage/Home/HomeTodayTitle";
import DiaryTitle from "../../components/MiniHomePage/Home/DiaryTitle";
import HomeLeft from "../../components/MiniHomePage/Home/HomeLeft";
import HomeRight from "../../components/MiniHomePage/Home/HomeRight";
import HomeTab from "../../components/MiniHomePage/Home/HomeTab";
import HomeMusicRight from "@/components/MiniHomePage/Home/HomeMusicRight";
import FriendModal from "@/components/MiniHomePage/FriendModal";
import Loading from "@/components/Loading";

interface CocoWorldPageProps {
  id: string;
}

const CocoWorld: React.FC<CocoWorldPageProps> = ({ id }) => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<string>("Home");
  const router = useRouter();
  // 모달
  const [isOpen, setIsOpen] = useState(false);

  // 로딩
  const [isLoading, setIsLoading] = useState(false);

  // 탭 클릭 시 상태 변경 함수
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // 페이지가 처음 로드될 때 로딩 상태 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 예시로 2초 후 로딩 종료
    return () => clearTimeout(timer); // 타이머 정리
  }, []);

  return (
    <CocoWorldPageStyled className="CocoWorldPage_wrap">
      <div className="CocoWorldPage_container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                        {activeTab === "Home" ||
                        activeTab === "Coco" ||
                        activeTab === "Visitor" ? (
                          <HomeLeft />
                        ) : (
                          ""
                        )}
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
                        <DiaryTitle setIsOpen={setIsOpen} />
                        {/* 일촌 신청 모달 */}
                        <FriendModal
                          type="add"
                          isOpen={isOpen}
                          onClose={() => setIsOpen(false)}
                        />
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
          </>
        )}
        {/* <div className="CocoWorldPage_right">
          <HomeMusicRight />
        </div> */}
      </div>
    </CocoWorldPageStyled>
  );
};

export default CocoWorld;
