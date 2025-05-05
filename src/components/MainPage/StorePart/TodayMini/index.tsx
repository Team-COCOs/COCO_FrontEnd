import clsx from "clsx";
import { TodayMiniStyle } from "./styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const userInfo = [
  {
    id: 1,
    username: "하늘이",
    visitCountToday: 342,
  },
  {
    id: 2,
    username: "코딩중독자",
    visitCountToday: 298,
  },
  {
    id: 3,
    username: "초코우유",
    visitCountToday: 274,
  },
  {
    id: 4,
    username: "비오는날산책",
    visitCountToday: 251,
  },
  {
    id: 5,
    username: "밤하늘별",
    visitCountToday: 239,
  },
];

const TodayMini = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const getuserInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getPopularUser`
      );
      const userInfo = res.data;

      console.log("인기 미니홈피 데이터 : ", userInfo);
    } catch (e) {
      console.log("인기 미니홈피 가져오기 에러 : ", e);
    }
  };

  useEffect(() => {
    // getuserInfo();
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % userInfo.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TodayMiniStyle className={clsx("TodayMiniStyle_wrap")}>
      <div className="TodayMini_border">
        <b className="mainColor">화제의</b> <b>미니홈피</b>
        <div className="TodayMini_line"></div>
        <ul className="Today_rank">
          {userInfo.map((user, idx) => (
            <li
              key={user.id}
              className={clsx("rank_item", {
                active: idx === index,
              })}
              onClick={() => {
                router.push(`/cocoworld?id=${user.id}`);
              }}
            >
              <span className="rank_num">{idx + 1}</span>
              <span className="rank_name">{user.username}</span>
              <span className="rank_count">+{user.visitCountToday}</span>
            </li>
          ))}
        </ul>
      </div>
    </TodayMiniStyle>
  );
};

export default TodayMini;
