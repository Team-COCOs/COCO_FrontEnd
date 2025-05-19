import { useAuth } from "@/context/AuthContext";
import { GuestBookStyle } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const GuestBook = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const { id } = router.query;

  const [visitData, setVisitData] = useState();

  const miniProfile = !user?.profile_image
    ? user?.gender === "woman"
      ? "/avatarImg/woman_avatar1.png"
      : "/avatarImg/man_avatar1.png"
    : user?.profile_image;

  useEffect(() => {
    const visit = axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/guestbooks/${id}`
    );
  }, []);

  // 관리 : guestbook/management

  return (
    <GuestBookStyle className="GuestBook_wrap">
      {/* header부터 map 돌리기 */}
      <div className="GuestBook_header">
        <div className="GuestBook_info Gulim">
          <span className="GuestBook_num">NO.9</span>
          <span className="GuestBook_name">이름</span>
          <span className="GuestBook_date">(2006.09.13 22:16)</span>
        </div>

        {/* {(userId === id || ) &&} */}
        <div className="GuestBook_btns">
          <div className="Gulim">비밀로 하기</div>
          <span>|</span>
          <div className="Gulim">삭제</div>
        </div>
      </div>

      <div className="GuestBook_body">
        <div className="GuestBook_left">
          <img src={miniProfile} alt="profile image" />
        </div>

        <div className="GuestBook_right Gulim">
          내가 쓴 일촌평 맘에 들어?!
          <br />
          ㅋㅋㅋㅋ
        </div>
      </div>
    </GuestBookStyle>
  );
};

export default GuestBook;
