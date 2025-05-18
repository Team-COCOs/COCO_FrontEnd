import { useRouter } from "next/router";
import { ProfileStyle } from "./styled";
import clsx from "clsx";
import Cookie from "js-cookie";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ProfileInfo from "./ProfileInfo";
import Dotori from "./Dotori";
import { useAuth } from "@/context/AuthContext";

interface Friend {
  userId: number;
  friend: string;
  theirNaming: string;
}

interface newPost {
  label: string;
  value: number;
  showBadge?: boolean;
}

interface friendRequest {
  id: number;
  title?: string;
  content?: string;
  createdAt?: string;
  requester?: string;
  profileImg?: string;
  receivedAt?: string;
}

interface UserData {
  name: string;
  todayVisit: number;
  profile_image: string;
  newPost: newPost[];
  newPostCount: number;
  friendRequest: friendRequest[];
  friendRequestCount: number;
  avatar: string;
  dotoris: number;
  friends: Friend[];
}

interface profileProps {
  setHasToken: (value: boolean) => void;
}

const Profile = ({ setHasToken }: profileProps) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const { user, logout } = useAuth();
  const userRole = user?.role;

  // const logout = () => {
  //   Cookie.remove("accessToken");
  //   Cookie.remove("refreshToken");
  //   setHasToken(false);

  //   router.push("/");
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/users/mainProfile");

        const updatedData = {
          ...res.data,
          profile_image:
            res.data.profile_image && res.data.profile_image.trim() !== ""
              ? res.data.profile_image
              : user?.gender === "man"
              ? "/avatarImg/man_avatar1.png"
              : "/avatarImg/woman_avatar1.png",
        };

        console.log("유저 데이터들 : ", res.data);

        setUserData(updatedData);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };

    fetchUserData();
  }, [userRole]);

  if (!userData) return null;

  return (
    <ProfileStyle className={clsx("Profile_wrap")}>
      <div className="Profile_header">
        <p className="Profile_name">{userData.name}</p>
        <button
          className="Profile_logout"
          onClick={() => {
            logout();
            setHasToken(false);
          }}
        >
          로그아웃
        </button>
      </div>
      <div className="Profile_line"></div>

      <div className="Profile_userInfos">
        <div className="Profile_userImgBack">
          <div className="Profile_userImg">
            <Image src={userData.profile_image} alt="avatar" fill />
          </div>
        </div>

        <div className="Profile_userInfo">
          <ProfileInfo
            label="오늘방문자"
            value={userData.todayVisit}
            showBadge={false}
          />
          <ProfileInfo
            label="새게시물"
            value={userData.newPostCount}
            data={userData.newPost}
          />
          <ProfileInfo
            label="일촌신청"
            value={userData.friendRequestCount}
            data={userData.friendRequest}
          />

          <Dotori dotori={userData.dotoris} />
        </div>
      </div>

      {userRole === "admin" ? (
        <button
          className="Profile_btn"
          onClick={() => {
            router.push(`/admin`);
          }}
        >
          <span className="arrow">❯</span> 관리자로 가기
        </button>
      ) : (
        <button
          className="Profile_btn"
          onClick={() => {
            router.push(`/home/${user?.id}`);
          }}
        >
          <span className="arrow">❯</span> 내 미니홈피 가기
        </button>
      )}

      <Dropdown label="바로가기" options={userData.friends} />
    </ProfileStyle>
  );
};

export default Profile;
