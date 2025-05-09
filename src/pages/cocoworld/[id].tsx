// pages/[id].tsx
import CocoWorldPage from "@/features/CocoWorld";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import axios from "axios";

const CocoWorld = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    // 방문자 수 카운트 API 요청
    const countVisit = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/visit`, {
          hostId: Number(id),
        });
      } catch (err) {
        console.error("방문자 수 기록 실패:", err);
      }
    };
    countVisit();
  }, [id]);

  // 아직 id가 없는 경우 (라우터 준비 중)
  if (!id || Array.isArray(id)) {
    return <Loading />;
  } else {
    return <CocoWorldPage id={id} />;
  }
};

export default CocoWorld;
