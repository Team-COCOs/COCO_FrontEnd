import { HomeProfileStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
interface UserData {
  title: string;
  minihomepi_image: string;
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

const convertTextToLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "blue" }}
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const HomeProfile = () => {
  const [minihomepi_image, setMinihomepi_image] = useState<string | null>(null);
  const router = useRouter();
  const userId = router.query.id;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/${userId}/my-status`
        );

        setUserData(res.data);
        setMinihomepi_image(res.data.minihomepi_image || null);
      } catch (e) {
        console.error(e);
        setMinihomepi_image(null);
      }
    };

    fetchUserInfo();
  }, [userId, userData]);

  const moodValue = userData?.mood ?? "happy";
  const moodText =
    moods.find((m) => m.value === moodValue)?.text || "기분을 선택해보세요.";

  return (
    <HomeProfileStyled>
      <div className="HomeProfile_wrap">
        <div className="HomeProfile_todayis Gulim">
          <span className="pixelFont">TODAY IS...</span> {moodText}
        </div>
        <div className="HomeProfile_imgWrap" style={{ position: "relative" }}>
          {(!minihomepi_image || !loaded) && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={250}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
          )}

          {minihomepi_image && (
            <img
              src={minihomepi_image}
              alt="Profile img"
              style={{
                width: "100%",
                height: "auto",
                opacity: loaded ? 1 : 0,
                position: "relative",
                zIndex: 2,
              }}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                e.currentTarget.src = "/avatarImg/defaultProfile.png";
                setLoaded(true);
              }}
            />
          )}

          {!minihomepi_image && loaded && (
            <img
              src="/avatarImg/defaultProfile.png"
              alt="Default profile img"
              style={{
                width: "100%",
                height: "auto",
                position: "relative",
                zIndex: 2,
              }}
            />
          )}
        </div>

        <div className="HomeProfile_textarea Gulim">
          {userData?.introduction
            ? convertTextToLinks(userData.introduction)
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
