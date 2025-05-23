// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import MinihomeLayout from "@/features/Minihome";
// 미니홈피 다이어리 컴포넌트
import DiaryLeft from "@/components/MiniHomePage/Diary/DiaryLeft";
import DiaryRight from "@/components/MiniHomePage/Diary/DiaryRight";

const MinihomePage = () => {
  // 탭 상태 관리
  const router = useRouter();
  const { id } = router.query;

  const [selectedDiaryMenu, setSelectediaryMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [diaryWrite, setDiaryWrite] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>다이어리 - COCOWORLD</title>
      </Head>
      <MinihomeLayout
        id={id as string}
        tapChildren={
          <DiaryLeft
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedDiaryMenu={selectedDiaryMenu}
            setSelectedDiaryMenu={setSelectediaryMenu}
            diaryWrite={diaryWrite}
            setDiaryWrite={setDiaryWrite}
          />
        }
        children={
          <DiaryRight
            selectedDiaryMenu={selectedDiaryMenu}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedDiaryMenu={setSelectediaryMenu}
            diaryWrite={diaryWrite}
            setDiaryWrite={setDiaryWrite}
          />
        }
      />
    </>
  );
};

export default MinihomePage;
