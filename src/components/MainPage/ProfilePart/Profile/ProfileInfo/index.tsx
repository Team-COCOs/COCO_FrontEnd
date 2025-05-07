import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ProfileInfoStyle } from "./styled";
import ShadowModal from "@/components/ShadowModal";
import axiosInstance from "@/lib/axios";

interface ProfileInfoProps {
  label: string;
  value: number;
  showBadge?: boolean;
}
interface data {
  id: number;
  title?: string;
  content?: string;
  createdAt?: string;
  requester?: string;
  profileImg?: string;
  receivedAt?: string;
}

const ProfileInfo = ({ label, value, showBadge = true }: ProfileInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<data[]>([]);

  const type = label === "새게시물" ? "newPost" : "newFriend";

  // 친구는 수락되지 않은 것만 (신청한 사람 prorile_image도), 새게시물을 오늘 내가 게시한 글만
  useEffect(() => {
    const profileData = async () => {
      const res = await axiosInstance.get(`/profileData/${type}`);

      console.log("프로필 모달 정보 대답 : ", res.data);

      setData(res.data);
    };

    profileData();

    const fetchData = () => {
      const dummyResponse =
        type === "newPost"
          ? [
              {
                id: 1,
                title: "오늘의 일기",
                content: "React 공부 완료!",
                createdAt: "2025-05-07 10:30",
              },
              {
                id: 2,
                title: "개발자 포트폴리오 링크 공유",
                content: "Notion에 정리한 자료입니다.",
                createdAt: "2025-05-07 13:50",
              },
            ]
          : [
              {
                id: 101,
                requester: "김도현",
                coment: "우리 친구해요!",
                relationship: "friend",
                profileImg: "/avatarImg/minimi_firework.gif",
                receivedAt: "2025-05-07 09:15",
              },
              {
                id: 102,
                requester: "박지우",
                coment: "우리 일촌해요!",
                relationship: "firstCousin",
                profileImg: "/avatarImg/headphone_girl.png",
                receivedAt: "2025-05-07 14:22",
              },
            ];

      setData(dummyResponse);
    };

    fetchData();
  }, []);

  return (
    <ProfileInfoStyle
      className={clsx("Profile_infos")}
      onClick={() => setIsOpen(true)}
    >
      <span className="Profile_infoText">{label}</span>
      <span className={clsx(value > 0 && showBadge && "Profile_newText")}>
        {value}
        {value > 0 && showBadge ? <div className="Profile_new">N</div> : null}
      </span>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        data={data}
      />
    </ProfileInfoStyle>
  );
};

export default ProfileInfo;
