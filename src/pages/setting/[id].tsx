// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "@/components/Loading";

import MinihomeLayout from "@/features/Minihome";
import SettingLeft from "@/components/MiniHomePage/Setting/SettingLeft";
import SettingRight from "@/components/MiniHomePage/Setting/SettingRight";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();
  const isOwner = String(user?.id) === id;

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [requesterName, setRequesterName] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const [settingSelectedMenu, setSettingSelectedMenu] = useState<{
    type?: string;
    title: string;
  } | null>(null);

  // 로딩 타이머 (초기 화면용)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 모달 열릴 때 이름 가져오기
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

  // 방문자 기록
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
                headers: { Authorization: `Bearer ${token}` },
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
    <MinihomeLayout
      id={id as string}
      tapChildren={
        <SettingLeft setSettingSelectedMenu={setSettingSelectedMenu} />
      }
      children={<SettingRight settingSelectedMenu={settingSelectedMenu} />}
    />
  );
};

export default MinihomePage;
