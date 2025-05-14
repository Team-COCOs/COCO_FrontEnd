// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

import MinihomeLayout from "@/features/Minihome";
import HomeLeft from "@/components/MiniHomePage/Home/HomeLeft";

// 방명록 컴포넌트
import VisitorRight from "@/components/MiniHomePage/Visitor/VisitorRight";

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

  if (!id || Array.isArray(id)) return <Loading />;

  return (
    <MinihomeLayout
      id={id as string}
      tapChildren={<HomeLeft />}
      children={<VisitorRight />}
    />
  );
};

export default MinihomePage;
