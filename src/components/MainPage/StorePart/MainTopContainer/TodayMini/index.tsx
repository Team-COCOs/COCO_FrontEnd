import clsx from "clsx";
import { TodayMiniStyle } from "./styled";
import Image from "next/image";
import { useEffect, useState } from "react";

export const todayMiniDummy = [
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
  const [point, setPoint] = useState(1); // 1 : 아래로 (1등 -> 5등), -1 : 위로 (5등 -> 1등)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        let next = prev + point;

        if (next >= todayMiniDummy.length) {
          setPoint(-1);
          next = prev - 1;
        } else if (next < 0) {
          setPoint(1);
          next = prev + 1;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [point]);

  return (
    <TodayMiniStyle className={clsx("TodayMiniStyle_wrap")}>
      <div className="TodayMini_border">
        <b className="mainColor">화제의</b> <b>미니홈피</b>
        <div className="TodayMini_line"></div>
        <ul className="Today_rank">
          {todayMiniDummy.map((user, idx) => (
            <li
              key={user.id}
              className={clsx("rank_item", {
                active: idx === index,
              })}
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
