// pages/[id].tsx
import CocoWorldPage from "@/features/CocoWorld";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CocoWorld = () => {
  const router = useRouter();
  const { id } = router.query;

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

  // 아직 id가 없는 경우 (라우터 준비 중)
  if (!id || Array.isArray(id)) {
    return <Loading />;
  } else {
    return <CocoWorldPage id={id} />;
  }
};

export default CocoWorld;
