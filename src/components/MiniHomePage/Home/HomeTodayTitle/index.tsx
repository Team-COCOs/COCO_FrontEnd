import { HomeTodayTitleStyled } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const HomeTodayTitle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [total, setTotal] = useState();
  const [todayCount, setTodayCount] = useState();
  const hostId = Number(id);
  useEffect(() => {
    if (!id) {
      return;
    }
    const totalcountStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/minihomepis/count/${hostId}`
        );

        console.log(response.data, "투데이수 데이터??");
      } catch (e) {
        console.log(e, "투데이수 오류 응답");
      }
    };
    totalcountStatus();
  }, [id]);

  return (
    <HomeTodayTitleStyled>
      <div>
        <div className="HomeTodayTitle_wrap">
          <div className="HomeTodayTitle_number_title dotumFont">
            TODAY &nbsp;<span>0</span> &nbsp;&nbsp;|&nbsp;&nbsp;TOTAL &nbsp;0
          </div>
        </div>
      </div>
    </HomeTodayTitleStyled>
  );
};
export default HomeTodayTitle;
