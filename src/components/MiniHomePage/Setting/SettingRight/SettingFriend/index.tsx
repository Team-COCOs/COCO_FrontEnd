import { useEffect, useState } from "react";
import { SettingFriendStyle } from "./styled";
import axiosInstance from "@/lib/axios";
import EmptyPage from "@/components/EmptyPage";
import { useRouter } from "next/router";

interface FriendData {
  id: number;
  userId: number;
  theirNaming: string;
  profile_image: string;
}

const SettingFriend = () => {
  const [friend, setFriend] = useState<FriendData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const friends = async () => {
      const res = await axiosInstance.get("/friends/list");

      console.log("친구", res.data.friends);

      setFriend(res.data.friends);
    };

    friends();
  }, []);

  return (
    <SettingFriendStyle className="SettingFriend_wrap">
      <div className="SettingFriend_header">
        <div className="SettingFriend_title Gulim">일촌 관리</div>
      </div>

      <div className="SettingFriend_body">
        {!friend || friend.length === 0 ? (
          <EmptyPage />
        ) : (
          friend.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                router.push(`/home/${d.userId}`);
              }}
            >
              {d.theirNaming}
            </div>
          ))
        )}
      </div>
    </SettingFriendStyle>
  );
};

export default SettingFriend;
