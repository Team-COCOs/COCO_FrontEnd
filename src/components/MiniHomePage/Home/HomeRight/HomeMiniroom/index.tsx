import { HomeMiniroomStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const HomeMiniroom = () => {
  const { query } = useRouter();
  const { id } = query;

  // 미니룸 이름 관리
  const [miniroomName, setMiniroomName] = useState("");
  // 미니룸 배경 관리
  const [miniroomBackground, setMiniroomBackground] = useState("");

  // 미니룸 이름 불러오기
  useEffect(() => {
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
          <img
            src={
              !miniroomBackground
                ? "/miniroom/miniroom17.png"
                : miniroomBackground
            }
            alt={"myminiroom"}
          />
        </div>
      </div>
    </HomeMiniroomStyled>
  );
};
export default HomeMiniroom;
