import { HomeProfileStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface UserData {
  title: string;
  minihompi_image: string;
  mood: string;
  introduction: string;
}

const moods = [
  { value: "happy", text: "😊 행복" },
  { value: "joy", text: "🎵 즐거움" },
  { value: "busy", text: "💼 바쁨" },
  { value: "sad", text: "🌧️ 슬픔" },
  { value: "angry", text: "💢 화남" },
];

const HomeProfile = () => {
  const [minihompi_image, setMinihompi_image] = useState<string>(
    "/avatarImg/defaultProfile.png"
  );
  const router = useRouter();
  const userId = router.query.id;

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/${userId}/my-status`
        );

        setUserData(res.data);
        setMinihompi_image(res.data.minihompi_image);
      } catch (e) {
        console.error("에러 발생:", e);
      }
    };
    fetchUserInfo();
  }, [userId]);

  const moodValue = userData?.mood ?? "happy";
  const moodText =
    moods.find((m) => m.value === moodValue)?.text || "기분을 선택해보세요.";
  return (
    <HomeProfileStyled>
      <div className="HomeProfile_wrap">
        <div className="HomeProfile_todayis Gulim">
          <span className="pixelFont">TODAY IS...</span> {moodText}
        </div>
        <div className="HomeProfile_imgWrap">
          <img
            src={userData?.minihompi_image || "/avatarImg/defaultProfile.png"}
            alt="Profile img"
          />
        </div>
        <div className="HomeProfile_textarea Gulim">
          {userData?.introduction
            ? userData?.introduction
            : "자기소개가 아직 없어요!"}
        </div>
        <span className="HomeProfile_history">
          <span>▶</span> HISTORY
        </span>
      </div>
    </HomeProfileStyled>
  );
};
export default HomeProfile;
