// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "@/components/Loading";

import MinihomeLayout from "@/features/Minihome";
import HomeLeft from "@/components/MiniHomePage/Home/HomeLeft";
import HomeRight from "@/components/MiniHomePage/Home/HomeRight";

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
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const MinihomePage = () => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<string>("Home");
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();
  const isOwner = String(user?.id) === id;
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
  // 프로필 메뉴 탭 관리
  const [profileSelectedMenu, setProfileSelectedMenu] = useState<{
    type?: string;
    title: string;
  } | null>(null);
  // 프로필 미니룸 꾸미기 탭 관리
  const [fixMiniroom, setfixMiniroom] = useState<boolean>(false);

  // 관리 메뉴 탭 관리
  const [settingSelectedMenu, setSettingSelectedMenu] = useState<{
    type?: string;
    title: string;
  } | null>(null);

  // 공통 폴더/카테고리 선택 상태
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const [selectedDiaryMenu, setSelectediaryMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);

  // 페이지가 처음 로드될 때 로딩 상태 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 탭 바뀔때 프로필 내부 초기화
  useEffect(() => {
    if (activeTab !== "Profile") {
      setProfileSelectedMenu(null);
    }
  }, [activeTab]);

  // 탭 바뀔때 관리 내부 초기화
  useEffect(() => {
    if (activeTab !== "Setting") {
      setSettingSelectedMenu(null);
    }
  }, [activeTab]);

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

  if (!id || Array.isArray(id)) return <Loading />;

  return (
    <MinihomeLayout
      id={id as string}
      tapChildren={
        <PhotoLeft
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      }
      children={<PhotoRight selectedMenu={selectedMenu} />}
    />
  );
};

export default MinihomePage;
