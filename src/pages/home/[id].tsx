// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import MinihomeLayout from "@/features/Minihome";
import HomeLeft from "@/components/MiniHomePage/Home/HomeLeft";
import HomeRight from "@/components/MiniHomePage/Home/HomeRight";

const MinihomePage = () => {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<string>("Home");
  const router = useRouter();
  const { id } = router.query;

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

  // 탭 바뀔때 프로필 내부 초기화
  useEffect(() => {
    if (activeTab !== "profile") {
      setProfileSelectedMenu(null);
    }
  }, [activeTab]);

  // 탭 바뀔때 관리 내부 초기화
  useEffect(() => {
    if (activeTab !== "setting") {
      setSettingSelectedMenu(null);
    }
  }, [activeTab]);

  return (
    <>
      <Head>
        <title>미니홈피 - COCOWORLD</title>
      </Head>
      <MinihomeLayout
        id={id as string}
        tapChildren={<HomeLeft />}
        children={
          <HomeRight activeTab={activeTab} onTabClick={handleTabClick} />
        }
      />
    </>
  );
};

export default MinihomePage;
