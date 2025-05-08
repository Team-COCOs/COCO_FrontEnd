import { useState, useEffect } from "react";
import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";
// 미니홈피 투데이
import HomeTodayTitle from "../../components/MiniHomePage/Home/HomeTodayTitle";
// 미니홈피 이름
import DiaryTitle from "../../components/MiniHomePage/Home/DiaryTitle";
// 미니홈피 홈 왼쪽 오른쪽 컴포넌트
import HomeLeft from "../../components/MiniHomePage/Home/HomeLeft";
import HomeRight from "../../components/MiniHomePage/Home/HomeRight";
// 미니홈피 탭
import HomeTab from "../../components/MiniHomePage/Home/HomeTab";
// 미니홈피 쥬크박스
import HomeMusicRight from "@/components/MiniHomePage/Home/HomeMusicRight";
// 미니홈피 프로필 컴포넌트
import MiniHomeProfileLeft from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileLeft";
import MiniHomeProfileRight from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileRight";
// 미니홈피 다이어리 컴포넌트
import DiaryLeft from "@/components/MiniHomePage/Diary/DiaryLeft";
import DiaryRight from "@/components/MiniHomePage/Diary/DiaryRight";
// 미니홈피 사진첩 컴포넌트
import PhotoLeft from "@/components/MiniHomePage/Photo/PhotoLeft";
import PhotoRight from "@/components/MiniHomePage/Photo/PhotoRight";
// 방명록 컴포넌트
import VisitorRight from "@/components/MiniHomePage/Visitor/VisitorRight";
// 코코 컴포넌트
import CocoRight from "@/components/MiniHomePage/Coco/CocoRight";
// 관리 사진첩 컴포넌트
import SettingLeft from "@/components/MiniHomePage/Setting/SettingLeft";
import SettingRight from "@/components/MiniHomePage/Setting/SettingRight";
// 일촌신청 모달
import FriendModal from "@/components/MiniHomePage/FriendModal";
// 로딩 중
import Loading from "@/components/Loading";
import axiosInstance from "@/lib/axios";

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
  // 일촌신청 이름
  const [requesterName, setRequesterName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  // 로그인 한 사람 ID
  // 탭 클릭 시 상태 변경 함수
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // 페이지가 처음 로드될 때 로딩 상태 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axiosInstance.get(`/friends/names/${id}`, {
          withCredentials: true,
        });
        setRequesterName(response.data.requesterName);
        setReceiverName(response.data.receiverName);
      } catch (error) {
        console.error("이름 정보 불러오기 실패:", error);
      }
    };

    if (isOpen && id) {
      fetchNames();
    }
  }, [isOpen, id]);

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
                        ) : activeTab === "Profile" ? (
                          <MiniHomeProfileLeft />
                        ) : activeTab === "Diary" ? (
                          <DiaryLeft />
                        ) : activeTab === "Photo" ? (
                          <PhotoLeft />
                        ) : activeTab === "Setting" ? (
                          <SettingLeft />
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
                          requesterName={requesterName}
                          receiverName={receiverName}
                          receiverUserId={id}
                        />
                      </div>
                      {/* 다이어리 오른쪽 컴포넌트 */}
                      <div className="CocoWorldPage_diary_Right">
                        {activeTab === "Home" ? (
                          <HomeRight
                            activeTab={activeTab}
                            onTabClick={handleTabClick}
                          />
                        ) : activeTab === "Profile" ? (
                          <MiniHomeProfileRight />
                        ) : activeTab === "Diary" ? (
                          <DiaryRight />
                        ) : activeTab === "Photo" ? (
                          <PhotoRight />
                        ) : activeTab === "Visitor" ? (
                          <VisitorRight />
                        ) : activeTab === "Coco" ? (
                          <CocoRight />
                        ) : activeTab === "Setting" ? (
                          <SettingRight />
                        ) : (
                          ""
                        )}
                        <HomeMusicRight />
                        <span className="CocoWorldPage_span1"></span>
                        <span className="CocoWorldPage_span2"></span>
                        <span className="CocoWorldPage_span3"></span>
                        <span className="CocoWorldPage_span4"></span>
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
