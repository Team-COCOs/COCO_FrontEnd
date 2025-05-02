import { useRouter } from "next/router";
import { ProfileStyle } from "./styled";
import clsx from "clsx";
import Cookie from "js-cookie";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

interface profileProps {
  setHasToken: any;
}

const Profile = ({ setHasToken }: profileProps) => {
  const router = useRouter();

  const logout = () => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    setHasToken(false);

    router.push("/");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("바로가기");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleSelect = (friend: any) => {
    setSelectedLabel(friend.name);
    setIsOpen(false);
    router.push(`/cocoworld?id=${friend.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="Profile_infos">
            <span className="Profile_infoText">오늘방문자</span>
            <span className="">{userData.todayVisit}</span>
          </div>

          <div className="Profile_infos">
            <span className="Profile_infoText">새게시물</span>
            <span className={userData.newPost > 0 ? "Profile_newText" : ""}>
              {userData.newPost}
              {userData.newPost > 0 ? (
                <div className="Profile_new">N</div>
              ) : (
                <> </>
              )}
            </span>
          </div>

          <div className="Profile_infos">
            <span className="Profile_infoText">일촌신청</span>
            <span
              className={userData.friendRequest > 0 ? "Profile_newText" : ""}
            >
              {userData.friendRequest}
              {userData.friendRequest > 0 ? (
                <div className="Profile_new">N</div>
              ) : (
                <> </>
              )}
            </span>
          </div>

          <div className="Profile_infos">
            <span className="Profile_newText">
              <div className="Profile_dororiImg">
                <Image src="/dotori.png" alt="dotori" fill />
              </div>
              {userData.dotoris}

              <button>충전</button>
            </span>
          </div>
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

      <div className="wrapper" ref={wrapperRef}>
        <button
          className="selectButton"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedLabel}
          <p className="wrapper_font"> ▾ </p>
        </button>

        {isOpen && (
          <ul className="dropdown">
            {userData.friends.map((friend) => (
              <li
                key={friend.id}
                className="option"
                onClick={() => handleSelect(friend)}
              >
                {friend.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProfileStyle>
  );
};

export default Profile;
