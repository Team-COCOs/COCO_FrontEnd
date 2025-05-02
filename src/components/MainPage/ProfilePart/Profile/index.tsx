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

const userData = {
  name: "이수정",
  todayVisit: 34,
  newPost: 1,
  friendRequest: 2,
  avatar: "/avatarImg/woman_avatar1.png",
  dotoris: 200,
  friends: [
    { id: 1, name: "김지은" },
    { id: 2, name: "박민수" },
    { id: 3, name: "최다혜" },
  ],
};

interface Friend {
  id: number;
  name: string;
}

interface UserData {
  name: string;
  todayVisit: number;
  newPost: number;
  friendRequest: number;
  avatar: string;
  dotoris: number;
  friends: Friend[];
}

interface profileProps {
  setHasToken: (value: boolean) => void;
}

const Profile = ({ setHasToken }: profileProps) => {
  const router = useRouter();
  // const [userData, setUserData] = useState<UserData | null>(null);

  const logout = () => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    setHasToken(false);

    router.push("/");
  };

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/user/profile`
  //       );

  //       setUserData(response.data);

  //       console.log("유저 정보 대답 : ", res.data);
  //     } catch (err) {
  //       console.error("유저 정보 불러오기 실패", err);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <ProfileStyle className={clsx("Profile_wrap")}>
      <div className="Profile_header">
        <p className="Profile_name">{userData.name}</p>
        <button className="Profile_logout" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className="Profile_line"></div>

      <div className="Profile_userInfos">
        <div className="Profile_userImgBack">
          <div className="Profile_userImg">
            <Image src={userData.avatar} alt="avatar" fill />
          </div>
        </div>

        <div className="Profile_userInfo">
          <ProfileInfo
            label="오늘방문자"
            value={userData.todayVisit}
            showBadge={false}
          />
          <ProfileInfo label="새게시물" value={userData.newPost} />
          <ProfileInfo label="일촌신청" value={userData.friendRequest} />

          <Dotori dotori={userData.dotoris} />
        </div>
      </div>

      <button
        className="Profile_btn"
        onClick={() => {
          router.push("/cocoworld");
        }}
      >
        <span className="arrow">❯</span> 내 미니홈피 가기
      </button>

      <Dropdown label="바로가기" options={userData.friends} />
    </ProfileStyle>
  );
};

export default Profile;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
