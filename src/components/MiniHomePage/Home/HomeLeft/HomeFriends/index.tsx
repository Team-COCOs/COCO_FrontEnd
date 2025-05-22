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
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const homepiProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/history/${id}`
        );

        setProfile(response.data);
        console.log(response.data, "홈 프로필 data,?");
      } catch (err: any) {
        if (err.response?.status === 404) {
          alert("존재하지 않는 페이지입니다.");
          router.push("/");
        }
      }
    };

    if (id) {
      homepiProfile();
      setSelectedValue("");
    }
  }, [id]);

  if (!profile) {
    return <Loading />;
  }

  const handleFriendSelect = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value === "파도타기") {
      try {
        // axios 요청
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/wave/${id}`
        );
        const newId = response.data.userId;

        // 페이지 이동
        router.push(`/home/${newId}`);
      } catch (error) {
        console.error("파도타기 아이디를 불러오는 중 오류", error);
      }
    } else {
      router.push(`/home/${value}`);
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
        <select value={selectedValue} onChange={handleFriendSelect}>
          <option value={id}>선택하세요</option>
          <option value="파도타기">파도타기</option>
          {user?.id && Number(user?.id) !== Number(id) && (
            <option value={user?.id}>내 홈피 가기</option>
          )}
          {profile.friends?.map((friend: any) => (
            <option key={friend.userId} value={friend.userId}>
              {friend.theirNaming} ({friend.friend})
            </option>
          ))}
        </select>
      </div>
    </HomeFriendsStyled>
  );
};
export default HomeFriends;
