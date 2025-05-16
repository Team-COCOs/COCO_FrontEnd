import { useEffect } from "react";
import { SettingFriendStyle } from "./styled";
import axiosInstance from "@/lib/axios";

const SettingFriend = () => {
  useEffect(() => {
    const friends = () => {
      const res = axiosInstance.get("/friends/getFriends");

      console.log(res);
    };
  }, []);
  return (
    <SettingFriendStyle className="SettingFriend_wrap">
      <div className="SettingFriend_header">
        <div className="SettingFriend_title Gulim">일촌 관리</div>
      </div>

      <div className="SettingFriend_body"></div>
    </SettingFriendStyle>
  );
};

export default SettingFriend;
