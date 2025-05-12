import clsx from "clsx";
import { TodayMiniStyle } from "./styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import EmptyPage from "@/components/EmptyPage";

const TodayMini = () => {
  const [index, setIndex] = useState(0);
  const [userInfo, setUserInfo] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getuserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/getPopularUser`
        );

        setUserInfo(res.data);

        console.log("인기 미니홈피 데이터 : ", res.data);
      } catch (e) {
        console.log("인기 미니홈피 가져오기 에러 : ", e);
      }
    };

    getuserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % userInfo.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [userInfo.length]);

  return (
    <TodayMiniStyle className={clsx("TodayMiniStyle_wrap")}>
      <div className="TodayMini_border">
        <b className="mainColor">화제의</b> <b>미니홈피</b>
        <div className="TodayMini_line"></div>
        {userInfo.length === 0 ? (
          <EmptyPage type="todayMiniImg" />
        ) : (
          <ul className="Today_rank">
            {userInfo.map((user, idx) => (
              <li
                key={user.id}
                className={clsx("rank_item", {
                  active: idx === index,
                })}
                onClick={() => {
                  router.push(`/cocoworld/${user.id}`);
                }}
              >
                <span className="rank_num">{idx + 1}</span>
                <span className="rank_name">{user.username}</span>
                <span className="rank_count">+{user.visitCountToday}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </TodayMiniStyle>
  );
};

export default TodayMini;
