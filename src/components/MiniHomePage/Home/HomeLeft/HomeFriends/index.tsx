import { HomeFriendsStyled } from "./styled";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const HomeFriends = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  console.log(Number(user?.id) === Number(id), "user?");
  useEffect(() => {
    const homepiProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/history/${id}`
        );

        setProfile(response.data);
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

  const handleFriendSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const friendId = Number(event.target.value);
    if (friendId) {
      router.push(`/cocoworld/${friendId}`);
    }
  };

  return (
    <HomeFriendsStyled>
      <div className="HomeFriends_wrap">
        <div className="HomeFriends_namebox Gulim">
          <div className="HomeFriends_name">{profile.name}</div>
          <div className="HomeFriends_gender">
            {profile.gender === "man" ? "(♂)" : "(♀)"}
          </div>
        </div>
        <div className="HomeFriends_email">{profile.email}</div>
        <select onChange={handleFriendSelect}>
          <option>파도타기</option>
          {user?.id && Number(user?.id) !== Number(id) && (
            <option value={user?.id}>내 홈피 가기</option>
          )}
          {profile.friends?.map((friend: any) => (
            <option key={friend.userId} value={friend.userId}>
              {friend.myNaming} ({friend.friend})
            </option>
          ))}
        </select>
      </div>
    </HomeFriendsStyled>
  );
};
export default HomeFriends;
