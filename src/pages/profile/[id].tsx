// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import MinihomeLayout from "@/features/Minihome";

// 미니홈피 프로필 컴포넌트
import MiniHomeProfileLeft from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileLeft";
import MiniHomeProfileRight from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileRight";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 프로필 메뉴 탭 관리
  const [profileSelectedMenu, setProfileSelectedMenu] = useState<{
    type?: string;
    title: string;
  } | null>(null);

  // 프로필 미니룸 꾸미기 탭 관리
  const [fixMiniroom, setfixMiniroom] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>프로필 - COCOWORLD</title>
      </Head>
      <MinihomeLayout
        id={id as string}
        tapChildren={
          <MiniHomeProfileLeft
            setProfileSelectedMenu={setProfileSelectedMenu}
            fixMiniroom={fixMiniroom}
            setfixMiniroom={setfixMiniroom}
          />
        }
        children={
          <MiniHomeProfileRight
            profileSelectedMenu={profileSelectedMenu}
            fixMiniroom={fixMiniroom}
            setfixMiniroom={setfixMiniroom}
          />
        }
      />
    </>
  );
};

export default MinihomePage;
