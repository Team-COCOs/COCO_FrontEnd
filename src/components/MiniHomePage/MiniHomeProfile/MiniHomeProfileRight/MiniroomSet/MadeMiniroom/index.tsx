import React from "react";
import { MadeMiniroomStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface MadeMiniroomProps {
  setfixMiniroom: (value: boolean) => void;
}

const MadeMiniroom: React.FC<MadeMiniroomProps> = ({ setfixMiniroom }) => {
  const { query } = useRouter();
  const { id } = query;

  // 미니룸 이름 관리
  const [miniroomName, setMiniroomName] = useState("");

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

  return (
    <MadeMiniroomStyled>
      <div className="MinimiSet_wrap">
        <div className="MadeMiniroom_titleWrap">
          <div className="MadeMiniroom_wrap_title Gulim">
            {miniroomName === null || miniroomName === undefined
              ? "미니룸"
              : miniroomName}
            <span onClick={() => setfixMiniroom(true)}>✏️</span>
          </div>
          <div className="MadeMiniroom_imgWrap">
            <img alt={"miniroom img"} src={"/miniroom/miniroom17.png"} />
          </div>
          <div className="MadeMiniroom_ex_text pixelFont">
            연필 아이콘을 눌러 꾸며보세요~!
          </div>
        </div>
      </div>
    </MadeMiniroomStyled>
  );
};

export default MadeMiniroom;
