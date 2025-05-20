import { useAuth } from "@/context/AuthContext";
import { GuestBookStyle } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import EmptyPage from "@/components/EmptyPage";
import { formatKoreanDate } from "@/utils/KrDate/date";
import GuestComment from "./GuestComment";

interface commentVisit {
  id: number; // PK
  comment: string; // 댓글
  userId: number; // 댓글 작성자 아이디
  userName: string; // 댓글 작성자 이름
}

interface visitDatas {
  id: number; // PK
  authorImg: string; // 작성자 미니미 이미지
  authorRealName: string; // 작성자 이름
  authorId: number; // 작성자 아이디
  authorGender: string; // 작성자 성별
  content: string; // 방명록 글
  status: boolean; // 비밀글 유무
  comment: commentVisit[]; // 댓글
  created_at: string;
}

const GuestBook = () => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const { id } = router.query;

  const [comment, setCommnet] = useState<commentVisit[]>([]);
  const [visitData, setVisitData] = useState<visitDatas[]>([]);

  const miniProfile = !user?.profile_image
    ? user?.gender === "woman"
      ? "/avatarImg/woman_avatar1.png"
      : "/avatarImg/man_avatar1.png"
    : user?.profile_image;

  useEffect(() => {
    // const visit = async () => {
    //   try {
    //     const res = await axios.get(
    //       `${process.env.NEXT_PUBLIC_API_URL}/guestbooks/${id}`
    //     );
    //     // const res = await axiosInstance.get(`/guestbooks/${id}`);
    //     console.log("방명록 정보 : ", res.data);
    //     // 비밀글 status에 따라 filter 돌려서 넣기
    //     setVisitData(res.data);
    //     setCommnet(res.data.comment);
    //   } catch (e) {
    //     console.log("방명록 오류:", e);
    //   }
    // };
    // visit();
  }, []);

  // 삭제
  const deleteVisit = async (visitId: number) => {
    const confirmed = window.confirm("정말로 이 방명록을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete(`/${visitId}`);

      alert("삭제 완료되었습니다.");
    } catch (e) {
      console.log("방명록 삭제 실패 : ", e);
    }
  };

  // 비밀로 하기
  const secretVisit = async (visitId: number) => {
    try {
      await axios.patch(`/status/${visitId}`);

      alert("방명록 비밀로 하기가 완료되었습니다.");
    } catch (e) {
      console.log("방명록 비밀 실패 : ", e);
    }
  };

  return (
    <GuestBookStyle className="GuestBook_wrap">
      {/* header부터 map 돌리기 */}
      <div className="GuestBook_div">
        <div className="GuestBook_header">
          <div className="GuestBook_info Gulim">
            <span className="GuestBook_num">NO.9</span>
            <span className="GuestBook_name">이름</span>
            <span className="GuestBook_date">(2006.09.13 22:16)</span>
          </div>

          <div className="GuestBook_btns">
            <div className="Gulim">비밀로 하기</div>
            <span>|</span>
            <div className="Gulim">삭제</div>
          </div>
        </div>

        <div className="GuestBook_body">
          <div className="GuestBook_left">
            <img
              src={miniProfile}
              alt="profile image"
              className={`GuestBook_png ${
                miniProfile?.endsWith(".gif") && "GuestBook_gif"
              }`}
            />
          </div>

          <div className="GuestBook_right Gulim">
            내가 쓴 일촌평 맘에 들어?!
            <br />
            ㅋㅋㅋㅋ
          </div>
        </div>

        <GuestComment comment={comment} />

        {visitData.length === 0 || !visitData ? (
          <div className="GuestBook_empty">
            <EmptyPage type="Photo_img" />
            <p>등록된 방명록이 없습니다.</p>
          </div>
        ) : (
          visitData.map((v, idx) => (
            <div key={v.id || idx}>
              <div className="GuestBook_header">
                <div className="GuestBook_info Gulim">
                  <span className="GuestBook_num">NO.{idx + 1}</span>
                  <span
                    className="GuestBook_name"
                    onClick={() => router.push(`/home/${v.authorId}`)}
                  >
                    {v.authorRealName}
                  </span>
                  <span className="GuestBook_date">
                    ({formatKoreanDate(v.created_at)})
                  </span>
                </div>

                {(userId === Number(id) || userId === v.authorId) && (
                  <div className="GuestBook_btns">
                    <div className="Gulim" onClick={() => secretVisit(v.id)}>
                      비밀로 하기
                    </div>
                    <span>|</span>
                    <div className="Gulim" onClick={() => deleteVisit(v.id)}>
                      삭제
                    </div>
                  </div>
                )}
              </div>

              <div className="GuestBook_body">
                <div className="GuestBook_left">
                  <img
                    src={
                      !v.authorImg
                        ? v.authorGender === "man"
                          ? "/avatarImg/man_avatar1.png"
                          : "/avatarImg/woman_avatar1.png"
                        : v.authorImg
                    }
                    alt="profile image"
                    className={`GuestBook_png ${
                      v.authorImg?.endsWith(".gif") && "GuestBook_gif"
                    }`}
                  />
                </div>

                <div className="GuestBook_right Gulim">{v.content}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </GuestBookStyle>
  );
};

export default GuestBook;
