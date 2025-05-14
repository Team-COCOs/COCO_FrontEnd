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
  const [userTitle, setUserTitle] = useState(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    console.log(id, "id");
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/${id}/my-status`
        );

        setUserTitle(res.data.title);
      } catch (e) {
        console.error("에러 발생:", e);
      }
    };
    fetchUserInfo();
  }, [id]);

  useEffect(() => {
    if (!user || !id) {
      setIsLoading(false);
      return;
    }
    const fetchFriendStatus = async () => {
      try {
        // 현재 로그인된 사용자의 일촌 상태 확인
        const response = await axiosInstance.get(`/friends/status/${id}`);

        setFriendStatus(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setFriendStatus(null);
        } else {
          console.error("일촌 상태 가져오기 실패:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendStatus();
  }, [id]);

  useEffect(() => {
    const homepiProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/history/${id}`
        );

        setProfile(response.data);
        console.log(response.data, "profile?");
      } catch (err: any) {
        if (err.response?.status === 404) {
          alert("존재하지 않는 페이지입니다.");
          router.push("/");
        }
      }
    };

    if (id) homepiProfile();
  }, [id]);

  if (!profile) {
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
          <div className="DiaryTitle_number_title">
            {userTitle !== "미니홈피"
              ? userTitle
              : `${profile?.name}님의 미니홈피`}
          </div>
          {!isOwnPage &&
            (!user ? (
              // 로그인하지 않은 사용자 → 버튼 보여줌
              <div
                className="DiaryTitle_plus_friend dotumFont"
                onClick={() => {
                  alert("로그인이 필요합니다.");
                }}
              >
                + 일촌맺기
              </div>
            ) : (
              // 로그인한 사용자이면서 친구 상태 체크
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
              )
            ))}
        </div>
      </div>
    </DiaryTitleStyled>
  );
};
export default DiaryTitle;
