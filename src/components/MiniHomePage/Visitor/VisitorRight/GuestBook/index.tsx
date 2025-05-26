import { useAuth } from "@/context/AuthContext";
import { GuestBookStyle } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import EmptyPage from "@/components/EmptyPage";
import { formatKoreanDate } from "@/utils/KrDate/date";
import GuestComment from "./GuestComment";
import { ModalProvider, useModal } from "@/context/ModalContext";
import ShadowModal from "@/components/ShadowModal";

interface commentVisit {
  id: number; // PK
  content: string; // 댓글
  authorId: number; // 댓글 작성자 아이디
  authorName: string; // 댓글 작성자 이름
  created_at: string;
}

interface visitDatas {
  id: number; // PK
  authorProfile: string; // 작성자 미니미 이미지
  authorRealName: string; // 작성자 이름
  authorId: number; // 작성자 아이디
  authorGender: string; // 작성자 성별
  hostId: number; // 방명록 주인 아이디
  hostRealName: string; // 방명록 주인 이름
  content: string; // 방명록 글
  status: string; // 비밀글 여부
  comments: commentVisit[]; // 댓글
  created_at: string;
  isMine: boolean; // 내 글인지 여부
}

interface GuestBookProps {
  refresh: boolean;
  onRefresh: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuestBook = ({ refresh, onRefresh, setRefresh }: GuestBookProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id;
  const { id } = router.query;

  const [visitData, setVisitData] = useState<visitDatas[]>([]);
  const [visitId, setVisitId] = useState<number | null>(null);

  const { type, isOpen, message, openModal, closeModal } = useModal();

  useEffect(() => {
    if (!id) return;

    const visit = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/guestbooks/${id}`,
          userId ? { params: { viewer: userId } } : undefined
        );

        const processedData = res.data.data.map((item: visitDatas) => {
          if (!item.authorProfile) {
            return {
              ...item,
              authorProfile:
                item.authorGender === "man"
                  ? "/avatarImg/man_avatar1.png"
                  : "/avatarImg/woman_avatar1.png",
            };
          }
          return item;
        });

        console.log("방명록 정보 : ", processedData);

        setVisitData(processedData);
      } catch (e) {
        console.log("방명록 오류:", e);
      }
    };
    visit();
  }, [id, refresh, userId]);

  // 삭제
  const confirm = (id: number) => {
    setVisitId(id);
    openModal("confirm", { message: "정말로 이 방명록을 삭제하시겠습니까?" });
  };

  const deleteVisit = async () => {
    console.log("여기옴", visitId);
    try {
      await axiosInstance.delete(`/guestbooks/${visitId}`);

      openModal("success", { message: "삭제 완료되었습니다." });
      onRefresh();
    } catch (e) {
      console.log("방명록 삭제 실패 : ", e);
    }
  };

  // 비밀로 하기
  const secretVisit = async (visitId: number) => {
    try {
      await axiosInstance.patch(`/guestbooks/status/${visitId}`);

      openModal("success", { message: "완료되었습니다." });

      onRefresh();
    } catch (e) {
      console.log("방명록 비밀 실패 : ", e);
    }
  };

  return (
    <GuestBookStyle className="GuestBook_wrap">
      <div className="GuestBook_div">
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
                  <span className="GuestBook_num">
                    NO.{visitData.length - idx}
                  </span>
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

                {userId === Number(id) ? (
                  <div className="GuestBook_btns">
                    <div className="Gulim" onClick={() => secretVisit(v.id)}>
                      {v.status === "private" ? "공개로 하기" : "비밀로 하기"}
                    </div>
                    <span>|</span>
                    <div className="Gulim" onClick={() => confirm(v.id)}>
                      삭제
                    </div>
                  </div>
                ) : (
                  userId !== Number(id) &&
                  v.isMine && (
                    <div className="GuestBook_btns">
                      <div className="Gulim" onClick={() => confirm(v.id)}>
                        삭제
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="GuestBook_body">
                <div className="GuestBook_left">
                  <img
                    src={v.authorProfile}
                    alt="profile image"
                    className={`GuestBook_png ${
                      v.authorProfile?.endsWith(".gif") && "GuestBook_gif"
                    }`}
                  />
                </div>

                <div className="GuestBook_right Gulim">{v.content}</div>
              </div>

              <ModalProvider>
                <GuestComment
                  comment={v.comments}
                  postId={v.id}
                  onRefresh={onRefresh}
                />
              </ModalProvider>
            </div>
          ))
        )}
      </div>

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          closeModal();
        }}
        message={message}
        onConfirm={deleteVisit}
      />
    </GuestBookStyle>
  );
};

export default GuestBook;
