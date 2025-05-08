import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DiaryTitleStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import axios from "axios";

interface Props {
  setIsOpen: (value: boolean) => void;
}

const DiaryTitle = ({ setIsOpen }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [friendStatus, setFriendStatus] = useState<{
    areFriends: boolean;
    received: boolean;
    requested: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFriendStatus = async () => {
      try {
        // 현재 로그인된 사용자의 일촌 상태 확인
        const response = await axiosInstance.get(`/friends/status/${id}`);

        setFriendStatus(response.data);
      } catch (error) {
        console.error("일촌 상태 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendStatus();
  }, [id]);

  // 일촌 상태가 로딩 중일 때
  if (isLoading) {
    return <Loading />;
  }

  const handleClick = () => {
    setIsOpen(true);
  };

  const isOwnPage = parseInt(id as string, 10) === user?.id;

  return (
    <DiaryTitleStyled>
      <div>
        <div className="DiaryTitle_wrap">
          <div className="DiaryTitle_number_title">코코월드님의 미니홈피</div>
          {user &&
            !isOwnPage &&
            friendStatus &&
            !friendStatus.areFriends &&
            !friendStatus.received &&
            !friendStatus.requested && (
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
