import { useEffect, useState } from "react";
import { SettingFriendStyle } from "./styled";
import axiosInstance from "@/lib/axios";
import EmptyPage from "@/components/EmptyPage";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import ShadowModal from "@/components/ShadowModal";

interface FriendData {
  id: number;
  userId: number;
  friend: string;
  theirNaming: string;
  profile_image: string;
  friend_gender: string;
}

const SettingFriend = () => {
  const [friend, setFriend] = useState<FriendData[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [id, setId] = useState<number | null>(null);

  const confirm = (friendId: number) => {
    setId(friendId);
    setIsOpen(true);
    setType("confirm");
    setMessage("정말 삭제하시겠습니까?");
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/friends/${id}`);
      setFriend(friend.filter((f) => f.id !== id));

      setType("success");
      setIsOpen(true);
      setMessage("삭제되었습니다!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const friends = async () => {
      try {
        const res = await axiosInstance.get("/friends/list");

        setFriend(res.data.friends);
      } catch (e: any) {
        if (e.response?.status === 401) {
          setType("error");
          setIsOpen(true);
          setMessage("로그인이 필요합니다.");
        }
        console.log(e);
      }
    };

    friends();
  }, [friend]);

  return (
    <SettingFriendStyle className="SettingFriend_wrap">
      <div className="SettingFriend_header">
        <div className="SettingFriend_title Gulim">일촌 관리</div>
      </div>

      <div className="SettingFriend_body">
        {!friend || friend.length === 0 ? (
          <div className="SettingFriend_empty">
            <EmptyPage type={"Photo_img"} />
            <p>등록된 일촌이 없습니다.</p>
          </div>
        ) : (
          <div className="Friend_grid">
            {friend.map((d) => (
              <div
                key={d.id}
                className="Friend_card"
                onClick={() => router.push(`/home/${d.userId}`)}
              >
                <button
                  className="Delete_btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirm(d.userId);
                  }}
                >
                  ✕
                </button>

                <div className="Friend_imgDiv">
                  <img
                    src={
                      d.profile_image === "/avatarImg/default.png"
                        ? d.friend_gender === "man"
                          ? "/avatarImg/man_avatar1.png"
                          : "/avatarImg/woman_avatar1.png"
                        : d.profile_image
                    }
                    alt="프로필"
                    className="Friend_img"
                  />
                </div>

                <div className="Friend_text">
                  <div className="Friend_name pixelFont">{d.friend}</div>
                  <div className="Friend_naming pixelFont">
                    ({d.theirNaming})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);

          if (message === "로그인이 필요합니다.") {
            router.push(`/home/${user?.id}`);
          }
        }}
        message={message}
        onConfirm={handleDelete}
      />
    </SettingFriendStyle>
  );
};

export default SettingFriend;
