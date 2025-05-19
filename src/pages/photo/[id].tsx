// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import MinihomeLayout from "@/features/Minihome";

// 미니홈피 사진첩 컴포넌트
import PhotoLeft from "@/components/MiniHomePage/Photo/PhotoLeft";
import PhotoRight from "@/components/MiniHomePage/Photo/PhotoRight";
import WritePage from "@/components/MiniHomePage/Photo/PhotoRight/WritePage";
import { PhotoData } from "@/utils/Write/interface";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [write, setWrite] = useState(false);
  const [editData, setEditData] = useState<PhotoData | null>(null);

  // 공통 폴더/카테고리 선택 상태
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);

  return (
    <>
      <Head>
        <title>사진첩 - COCOWORLD</title>
      </Head>
      <MinihomeLayout
        id={id as string}
        tapChildren={
          <PhotoLeft
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setWrite={setWrite}
          />
        }
        children={
          write ? (
            <WritePage editData={editData} />
          ) : (
            <PhotoRight
              selectedMenu={selectedMenu}
              setWrite={setWrite}
              setEditData={setEditData}
            />
          )
        }
      />
    </>
  );
};

export default MinihomePage;
