import { useState, useEffect, ReactNode } from "react";
import { MinihomeStyle } from "./styled";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

import Cookies from "js-cookie";
import axios from "axios";
import axiosInstance from "@/lib/axios";
// 미니홈피 투데이
import HomeTodayTitle from "@/components/MiniHomePage/Home/HomeTodayTitle";
// 미니홈피 이름
import DiaryTitle from "@/components/MiniHomePage/Home/DiaryTitle";
// 미니홈피 탭
import HomeTab from "@/components/MiniHomePage/Home/HomeTab";
// 미니홈피 쥬크박스
import HomeMusicRight from "@/components/MiniHomePage/Home/HomeMusicRight";

// 일촌신청 모달
import FriendModal from "@/components/MiniHomePage/FriendModal";
// 로딩 중
import Loading from "@/components/Loading";

interface MinihomeLayoutProps {
  tapChildren: ReactNode;
  children: ReactNode;
  id: string;
}

const MinihomeLayout = ({ tapChildren, children, id }: MinihomeLayoutProps) => {
  const { user } = useAuth();
  const isOwner = String(user?.id) === id;
  const router = useRouter();
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<string>("home");
  // 모달
  const [isOpen, setIsOpen] = useState(false);
  // 로딩
  const [isLoading, setIsLoading] = useState(false);

  // 일촌신청 이름
  const [requesterName, setRequesterName] = useState("");
  const [receiverName, setReceiverName] = useState("");

  // 일촌신청 이미지 및 성별
  const [requesterImage, setRequesterImage] = useState("");
  const [requesterGender, setRequesterGender] = useState("");

  // 로그인 한 사람 ID
  // 탭 클릭 시 상태 변경 함수
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // 미니홈피 기본 배경(체크무늬) 상태 관리
  const [backGroundData, setBackGroundData] = useState<any>(null);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [diaryBackgroundColor, setDiaryBackgroundColor] = useState("");

  // 페이지가 처음 로드될 때 로딩 상태 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 배경 바꿔주기
  useEffect(() => {
    const fetchBackGround = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/minihomepis/${id}`
        );
        const data = response.data;
        const dataArray = Array.isArray(data) ? data : [data];
        // 배열로 만들기
        const matched = dataArray.find(
          (item: any) =>
            item.name &&
            (item.name.includes("pink") ||
              item.name.includes("black") ||
              item.name.includes("green"))
        );

        if (matched) {
          setBackgroundUrl(""); // 배경 이미지는 사용 안 함

          // 색상 조건 분기
          if (matched.name.includes("pink")) {
            setBackgroundColor("#e5c7dc"); // 분홍
          } else if (matched.name.includes("black")) {
            setBackgroundColor("black"); // 검정
          } else if (matched.name.includes("green")) {
            setBackgroundColor("#395f4a"); // 초록
          }
        } else {
          setBackgroundUrl("/images/default_bg.jpg");
          setBackgroundColor("");
        }
      } catch (e: any) {
        console.error("배경 조회 실패:", e);
        setBackgroundUrl("/images/default_bg.jpg");
        setBackgroundColor("");
      }
    };
    fetchBackGround();
  }, [id]);

  // 책 배경 (bk) 바꿔주기
  useEffect(() => {
    const fetchDiaryBackGround = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/useritems/bk/${id}`
        );
        const data = response.data;
        const dataArray = Array.isArray(data) ? data : [data];
        // 배열로 만들기
        const matched = dataArray.find(
          (item: any) =>
            item.name &&
            (item.name.includes("pink") ||
              item.name.includes("black") ||
              item.name.includes("green"))
        );

        if (matched) {
          // 색상 조건 분기
          if (matched.name.includes("pink")) {
            setDiaryBackgroundColor("#cfa2be"); // 분홍
          } else if (matched.name.includes("black")) {
            setDiaryBackgroundColor("black"); // 검정
          } else if (matched.name.includes("green")) {
            setDiaryBackgroundColor("#4a5245"); // 초록
          }
        } else {
          setDiaryBackgroundColor("#a6cfdb"); // 기본 다이어리 배경색
        }
      } catch (e: any) {
        console.error("다이어리 배경 조회 실패:", e);
        setDiaryBackgroundColor("#a6cfdb");
      }
    };
    fetchDiaryBackGround();
  }, [id]);

  // 이름
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axiosInstance.get(`/friends/names/${id}`, {
          withCredentials: true,
        });
        setRequesterName(response.data.requesterName);
        setReceiverName(response.data.receiverName);
        setRequesterImage(response.data.requesterImage);
        setRequesterGender(response.data.requesterGender);
      } catch (error) {
        console.error("이름 정보 불러오기 실패:", error);
      }
    };

    if (isOpen && id) {
      fetchNames();
    }
  }, [isOpen, id]);

  useEffect(() => {
    const countVisit = async () => {
      if (!id || Array.isArray(id)) return;

      try {
        const token = Cookies.get("accessToken");
        const url = `${process.env.NEXT_PUBLIC_API_URL}/visit/${
          token ? "auth" : "guest"
        }`;

        await axios.post(
          url,
          { hostId: Number(id) },
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              }
            : undefined
        );
      } catch (err: any) {
        console.error("방문자 수 기록 실패:", err);
        if (err.response?.status === 404) {
          alert("존재하지 않는 페이지입니다.");
          router.push("/");
        }
      }
    };

    countVisit();
  }, [id]);

  return (
    <MinihomeStyle className="Minihome_wrap">
      <div
        className="Minihome_container"
        style={{
          backgroundImage: backgroundColor ? "" : `url("/background.jpg")`,
          backgroundColor: backgroundColor || "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="Minihome_left">
            <div className="Minihome_book_wrap">
              {/* 왼쪽 */}
              <div
                className="Minihome_book_left"
                style={{
                  backgroundColor: diaryBackgroundColor || "#a6cfdb",
                }}
              >
                <div className="Minihome_bookLeft_line">
                  <div className="Minihome_bookLeft_paper">
                    <div className="Minihome_bookLeft_todayWrap">
                      <HomeTodayTitle />
                    </div>
                    <div className="Minihome_diary_left">{tapChildren}</div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 */}
              <div
                className="Minihome_book_right"
                style={{
                  backgroundColor: diaryBackgroundColor || "#a6cfdb",
                }}
              >
                <div className="Minihome_bookRight_line">
                  <div className="Minihome_bookRight_paper">
                    <div className="Minihome_bookRight_todayWrap">
                      {/* 미니홈피 이름, 모달 등 */}
                      <DiaryTitle setIsOpen={setIsOpen} />
                      {/* 일촌 신청 모달 */}
                      <FriendModal
                        type="add"
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        requesterName={requesterName}
                        receiverName={receiverName}
                        requesterImage={requesterImage}
                        requesterGender={requesterGender}
                        receiverUserId={id}
                      />
                    </div>
                    <div className="Minihome_diary_Right">
                      {children}
                      <HomeMusicRight />
                      <span className="Minihome_span1"></span>
                      <span className="Minihome_span2"></span>
                      <span className="Minihome_span3"></span>
                      <span className="Minihome_span4"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Minihome_Tab_Wrap">
                <HomeTab activeTab={activeTab} isOwner={isOwner} />
              </div>
            </div>
          </div>
        )}
      </div>
    </MinihomeStyle>
  );
};

export default MinihomeLayout;
