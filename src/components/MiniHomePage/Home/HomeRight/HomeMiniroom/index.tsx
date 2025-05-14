import { HomeMiniroomStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

const HomeMiniroom = () => {
  const { query } = useRouter();
  const { id } = query;

  // 미니룸 이름 관리
  const [miniroomName, setMiniroomName] = useState("");
  // 미니룸 배경 관리
  const [miniroomBackground, setMiniroomBackground] = useState("");

  // 미니룸 말풍선 불러오기 관리
  const [speechBubbles, setSpeechBubbles] = useState<any[]>([]);
  // 미니룸 미니미 불러오기 관리
  const [minimis, setMinimis] = useState<any[]>([]);

  // 미니룸 이름 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchMiniroomName = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/title`
        );
        setMiniroomName(response.data.title);
      } catch (e: any) {
        console.log(e, "미니룸 이름 e");
      }
    };
    fetchMiniroomName();
  }, [id]);

  // 미니룸 배경 불러오기
  useEffect(() => {
    if (!id) return;

    const fetchMiniroomBackground = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minirooms/${id}/background`
        );
        setMiniroomBackground(response.data.file);
        console.log(response.data.file, "miniroombk");
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
        console.log(response.data, "미니미 말풍선 데이터?");
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

  return (
    <HomeMiniroomStyled>
      <div className="HomeMiniroom_wrap">
        <div className="HomeMiniroom_number Gulim">
          Miniroom
          <span>
            {miniroomName === null || miniroomName === undefined
              ? "미니룸"
              : miniroomName}
          </span>
        </div>
        <div className="HomeMiniroom_imgWrap">
          {/* <img
            src={
              !miniroomBackground
                ? "/miniroom/miniroom17.png"
                : miniroomBackground
            }
            alt={"myminiroom"}
          /> */}
          <div
            className="HomeMiniroom_background"
            style={{
              backgroundImage: `url(${
                miniroomBackground
                  ? miniroomBackground
                  : "/miniroom/miniroom17.png"
              })`,
            }}
          >
            {/* 말풍선 */}
            {speechBubbles.map((bubble) => (
              <div
                key={`speech-${bubble.id}`}
                style={{
                  position: "absolute",
                  top: `${bubble.top}%`,
                  left: `${bubble.left}%`,
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "5px 10px",
                  maxWidth: "150px",
                  wordBreak: "break-word",
                  fontSize: "12px",
                }}
                className="HomeMiniroom_SpeechBubble"
              >
                {bubble.text}
              </div>
            ))}

            {/* 미니미 */}
            {minimis.map((minimi) => {
              const percentTop = (minimi.top / 260) * 100;
              const percentLeft = (minimi.left / 500) * 100;
              const isDefaultMinimi = minimi.id === "default-minimi";
              const minimiSrc = isDefaultMinimi
                ? "/avatarImg/woman_avatar1.png"
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
                  }}
                  className="HomeMiniroom_minimi"
                />
              );
            })}
          </div>
        </div>
      </div>
    </HomeMiniroomStyled>
  );
};
export default HomeMiniroom;
