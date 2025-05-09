import { FriendCommentStyled } from "./styled";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
interface FriendCommentData {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  authorName: string;
  authorRealName: string;
}

const FriendComment = () => {
  const [comment, setComment] = useState("");
  const [friendComments, setFriendComments] =
    useState<FriendCommentData | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const hostId = Number(router.query.id);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    if (!user) {
      alert("로그인 후 일촌평을 작성하실 수 있습니다.");
      return;
    }

    if (user.id === hostId) {
      alert("자기 자신에게는 일촌평을 남길 수 없습니다.");
      return;
    }

    try {
      const response = await axiosInstance.post("/friend-comments", {
        hostId: hostId,
        content: comment,
      });
      setComment("");

      fetchFriendComments();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 403) {
          alert("서로 일촌인 경우에만 일촌평을 남길 수 있습니다.");
        } else if (status === 401) {
          alert("로그인 후 일촌평을 작성하실 수 있습니다.");
        } else {
          alert("일촌평 등록 중 오류가 발생했습니다.");
        }
      } else {
        console.error("예상치 못한 에러:", error);
      }
    }

    setComment("");
  };

  // 일촌평 가져오기
  const fetchFriendComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/friend-comments/${hostId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      setFriendComments(res.data.data);
    } catch (error: any) {
      if (error.response?.status !== 401) {
        console.error("일촌평 불러오기 실패", error);
      }
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId: number) => {
    const confirmed = window.confirm("정말로 이 일촌평을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/friend-comments/${hostId}`, {
        data: { commentId },
      });
      alert("일촌평이 삭제되었습니다.");
      fetchFriendComments(); // 삭제 후 댓글 목록을 갱신
    } catch (error: any) {
      if (error.response?.status !== 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert("일촌평 삭제 중 오류가 발생했습니다.");
      }
      console.error("삭제 중 오류 발생", error);
    }
  };

  useEffect(() => {
    if (hostId) fetchFriendComments();
  }, [hostId]);

  return (
    <FriendCommentStyled>
      <div className="FriendComment_wrap">
        <div className="FriendComment_title Gulim">
          What friends say
          <span className="FriendComment_son pixelFont">
            한마디로 표현해봐~
          </span>
        </div>
        <div className="FriendComment_commentWrap">
          <div className="FriendComment_inputWrap">
            <span className="pixelFont">friends say</span>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="일촌과 나누고 싶은 이야기를 남겨보세요~!"
            />
            <button disabled={!comment.trim()} onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      </div>
      {friendComments && (
        <div className="FriendComment_displayWrap dotumFont">
          {Array.isArray(friendComments) && friendComments.length > 0 ? (
            <div className="FriendComment_displayWrap dotumFont">
              {friendComments.map((friendComment) => (
                <div
                  key={friendComment.id}
                  className="FriendComment_contentRow"
                >
                  <p>
                    •&nbsp;{friendComment.content}&nbsp;(
                    {friendComment.authorName}
                    <span className="FriendComment_name_navytext">
                      {" "}
                      {friendComment.authorRealName}
                    </span>
                    )
                    <span className="FriendComment_datetext">
                      {" "}
                      {friendComment.createdAt}
                    </span>
                  </p>
                  {(user?.id === friendComment.authorId ||
                    user?.id === hostId) && (
                    <p
                      className="FriendComment_delete pixelFont"
                      onClick={() => handleDelete(friendComment.id)}
                    >
                      🗑️
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="FriendComment_noneComment pixelFont">
              소중한 마음을 전해보세요!
            </p>
          )}
        </div>
      )}
    </FriendCommentStyled>
  );
};
export default FriendComment;
