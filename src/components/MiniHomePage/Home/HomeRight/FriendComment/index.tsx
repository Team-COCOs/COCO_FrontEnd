import { FriendCommentStyled } from "./styled";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
interface FriendCommentData {
  content: string;
  createdAt: string;
  authorName: string;
  hostName: string;
}

const FriendComment = () => {
  const [comment, setComment] = useState("");
  const [friendComment, setFriendComment] = useState<FriendCommentData | null>(
    null
  );
  const { user } = useAuth();
  const router = useRouter();
  const hostId = Number(router.query.id);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    if (!user) return;

    try {
      const response = await axiosInstance.post("/friend-comments", {
        hostId: hostId,
        content: comment,
      });

      console.log("등록 성공:", response.data);
      setComment("");

      fetchFriendComment();
    } catch (error) {
      console.error("등록 실패:", error);
    }

    console.log("제출:", comment);
    setComment("");
  };

  // 일촌평 가져오기
  const fetchFriendComment = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/friend-comments/${hostId}`,
        {
          withCredentials: true,
        }
      );
      setFriendComment(res.data.data);
    } catch (error) {
      console.error("일촌평 불러오기 실패", error);
    }
  };

  useEffect(() => {
    if (hostId) fetchFriendComment();
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
      {friendComment && (
        <div className="FriendComment_displayWrap">
          <p>작성자: {friendComment.authorName}</p>
          <p>별명: {friendComment.hostName}</p>
          <p>작성일: {friendComment.createdAt}</p>
          <p>내용: {friendComment.content}</p>
        </div>
      )}
    </FriendCommentStyled>
  );
};
export default FriendComment;
