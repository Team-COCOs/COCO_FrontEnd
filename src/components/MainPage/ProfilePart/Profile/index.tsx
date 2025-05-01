import { useRouter } from "next/router";
import { ProfileStyle } from "./styled";
import clsx from "clsx";

const userData = {
  name: "이수정",
  todayVisit: 34,
  newPost: 1,
  friendRequest: 2,
  avatar: "",
};

const Profile = () => {
  const router = useRouter();

  const logout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    router.push("/");
  };

  return (
    <ProfileStyle className={clsx("Profile_wrap")}>
      <div className="Profile_header">
        <p className="Profile_name">{userData.name}</p>
        <button className="Profile_logout" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className="Profile_line"></div>

      <div className="Profile_userInfo"></div>
    </ProfileStyle>
  );
};

export default Profile;
