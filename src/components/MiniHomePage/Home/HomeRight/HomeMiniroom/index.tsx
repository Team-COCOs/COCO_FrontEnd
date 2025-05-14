import { HomeMiniroomStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import MadeRoom from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileRight/MiniroomSet/MadeMiniroom/MadeRoom";

const HomeMiniroom = () => {
  const { query } = useRouter();
  const { id } = query;

  // 미니룸 이름 관리
  const [miniroomName, setMiniroomName] = useState("");

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
          <MadeRoom />
        </div>
      </div>
    </HomeMiniroomStyled>
  );
};
export default HomeMiniroom;
