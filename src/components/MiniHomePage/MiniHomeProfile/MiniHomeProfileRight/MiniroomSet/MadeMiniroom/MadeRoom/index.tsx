import { MadeRoomStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ShadowModal from "@/components/ShadowModal";

interface Minimi {
  id: number;
  left: number;
  top: number;
  store_item_id: number;
}

interface SpeechBubble {
  id: number;
  text: string;
  left: number;
  top: number;
}

const MadeRoom = () => {
  const router = useRouter();
  const { id } = router.query;

  // 미니룸 배경 관리
  const [miniroomBackground, setMiniroomBackground] = useState("");
  // 미니룸 말풍선 불러오기 관리
  const [speechBubbles, setSpeechBubbles] = useState<any[]>([]);
  // 미니룸 미니미 불러오기 관리
  const [minimis, setMinimis] = useState<any[]>([]);

  // 미니룸 미니미 성별 관리
  const [profileGender, setProfileGender] = useState("woman");

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  // 미니룸 배경 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchMiniroomBackground = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/background`
        );
        setMiniroomBackground(response.data.file);
      } catch (e: any) {
        console.log(e, "미니룸 이미지 e");
      }
    };
    fetchMiniroomBackground();
  }, [id]);

  // 미니미 + 말풍선 불러오기 (layout API)
  useEffect(() => {
    if (!id) return;

    const fetchLayout = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/layout`
        );

        // 미니미만 설정
        setMinimis(
          (response.data as { type: string }[]).filter(
            (item) => item.type === "minimi"
          )
        );
        // 말풍선만 설정
        setSpeechBubbles(
          (response.data as { type: string }[]).filter(
            (item) => item.type === "speechBubble"
          )
        );
      } catch (e: any) {
        console.log(e, "미니룸 레이아웃 에러");
      }
    };

    fetchLayout();
  }, [id]);

  // 미니미 성별 불러오기
  useEffect(() => {
    const homepiProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/history/${id}`
        );

        setProfileGender(response.data.gender);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setType("error");
          setIsOpen(true);
          setMessage("존재하지 않는 페이지입니다.");
        }
      }
    };

    if (id) homepiProfile();
  }, [id]);

  return (
    <MadeRoomStyled>
      <div className="MadeRoom_wrap">
        <div className="MadeRoom_imgWrap">
          <div
            className="MadeRoom_background"
            style={{
              backgroundImage: `url(${
                miniroomBackground
                  ? miniroomBackground
                  : "/miniroom/miniroom17.png"
              })`,
            }}
          >
            {/* 말풍선 */}
            {speechBubbles.map((bubble) => {
              const percentTop = (bubble.top / 260) * 100;
              const percentLeft = (bubble.left / 500) * 100;

              return (
                <div
                  key={`speech-${bubble.id}`}
                  style={{
                    position: "absolute",
                    top: `${percentTop}%`,
                    left: `${percentLeft}%`,
                  }}
                  className="MadeRoom_SpeechBubble Gulim"
                >
                  {bubble.text}
                </div>
              );
            })}

            {/* 미니미 */}
            {minimis.map((minimi) => {
              const percentTop = (minimi.top / 260) * 100;
              const percentLeft = (minimi.left / 500) * 100;
              const isDefaultMinimi = minimi.id === "default-minimi";
              const minimiSrc = isDefaultMinimi
                ? profileGender === "man"
                  ? "/avatarImg/man_avatar1.png"
                  : "/avatarImg/woman_avatar1.png"
                : minimi.file;

              return (
                <img
                  key={`minimi-${minimi.id}`}
                  src={minimiSrc}
                  alt="minimi"
                  style={{
                    position: "absolute",
                    top: `${percentTop}%`,
                    left: `${percentLeft}%`,
                    width: "auto",
                    height: "50px",
                    zIndex: 2,
                  }}
                  className="MadeRoom_minimi"
                />
              );
            })}
          </div>
        </div>
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);

          if (message === "존재하지 않는 페이지입니다.") {
            router.push("/");
          }
        }}
        message={message}
      />
    </MadeRoomStyled>
  );
};
export default MadeRoom;
