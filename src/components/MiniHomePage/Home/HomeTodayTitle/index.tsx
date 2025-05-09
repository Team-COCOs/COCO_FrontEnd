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
        setTotal(response.data.today);
        setTodayCount(response.data.total);
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
            TODAY &nbsp;<span>{total}</span> &nbsp;&nbsp;|&nbsp;&nbsp;TOTAL
            &nbsp;{todayCount}
          </div>
        </div>
      </div>
    </HomeTodayTitleStyled>
  );
};
export default HomeTodayTitle;
