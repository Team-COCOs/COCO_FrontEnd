// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useState } from "react";

import MinihomeLayout from "@/features/Minihome";

// 미니홈피 사진첩 컴포넌트
import PhotoLeft from "@/components/MiniHomePage/Photo/PhotoLeft";
import PhotoRight from "@/components/MiniHomePage/Photo/PhotoRight";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // 공통 폴더/카테고리 선택 상태
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);

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
