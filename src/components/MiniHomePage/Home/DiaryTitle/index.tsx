import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DiaryTitleStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

interface Props {
  setIsOpen: (value: boolean) => void;
}

type FriendStatus = "pending" | "accepted" | "rejected" | "none";

const DiaryTitle = ({ setIsOpen }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [friendStatus, setFriendStatus] = useState<FriendStatus>("none");

  useEffect(() => {
    if (!id || !user) return;

    const fetchFriendStatus = async () => {
      // 자기 자신의 페이지면 상태 확인도 안 함
      if (parseInt(id as string, 10) === user.id) return;

      try {
        const response = await axiosInstance.get(`/friends/status/${id}`, {
          withCredentials: true,
        });
        setFriendStatus(response.data.status || "none");
      } catch (error) {
        console.error("일촌 상태 확인 실패:", error);
        setFriendStatus("none");
      }
    };

    fetchFriendStatus();
  }, [id, user]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const isOwnPage = parseInt(id as string, 10) === user?.id;

  return (
    <DiaryTitleStyled>
      <div>
        <div className="DiaryTitle_wrap">
          <div className="DiaryTitle_number_title">코코월드님의 미니홈피</div>
          {!isOwnPage && friendStatus === "none" && (
            <div
              className="DiaryTitle_plus_friend dotumFont"
              onClick={handleClick}
            >
              + 일촌맺기
            </div>
          )}
        </div>
      </div>
    </DiaryTitleStyled>
  );
};
export default DiaryTitle;
