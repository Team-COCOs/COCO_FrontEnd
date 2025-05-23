import { CommentDiaryStyle } from "./styled";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ShadowModal from "@/components/ShadowModal";

export interface Comment {
  id: number;
  diaryId: number;
  user: {
    id: number;
    name: string;
  };
  content: string;
  created_at: string;
  parentComment: Comment | { id: number } | null;
}

interface CommentDiaryprops {
  diaryId: number;
  allComments: Comment[];
}
const CommentDiary = ({ diaryId, allComments }: CommentDiaryprops) => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [commentId, setCommentId] = useState<number | null>(null);

  const handleSaveComment = async (
    content: string,
    parentCommentId: number | null
  ) => {
    if (!content.trim()) {
      setType("error");
      setIsOpen(true);
      setMessage(
        parentCommentId === null
          ? "댓글을 입력해주세요."
          : "답글을 입력해주세요."
      );
      return;
    }
    try {
      await axiosInstance.post(`/diaryComments/${diaryId}`, {
        content,
        parentCommentId,
      });
      setType("success");
      setIsOpen(true);
      setMessage(
        parentCommentId === null
          ? "댓글이 등록되었습니다."
          : "답글이 등록되었습니다."
      );
      setComment(""); // 댓글 입력창 초기화
      setReplyText(""); // 답글 입력창 초기화
      setReplyingCommentId(null); // 답글 입력창 닫기
    } catch (e: any) {
      if (e.response?.status === 401) {
        setType("error");
        setIsOpen(true);
        setMessage("로그인이 필요합니다.");
      } else {
        setType("error");
        setIsOpen(true);
        setMessage(
          parentCommentId === null
            ? "댓글 등록 중 오류가 발생했습니다."
            : "답글 등록 중 오류가 발생했습니다."
        );
      }
    }
  };

  // 다이어리 댓글
  // 답글 작성 중인 댓글 id 상태
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(
    null
  );
  // 답글 텍스트 상태
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = (id: number) => {
    setReplyingCommentId((prevId) => (prevId === id ? null : id));
  };

  const confrim = (id: number) => {
    setCommentId(id);
    setType("confirm");
    setIsOpen(true);
    setMessage("정말 이 댓글을 삭제하시겠습니까?");
  };

  const handleDeleteComment = async () => {
    try {
      const response = await axiosInstance.delete(
        `/diaryComments/${commentId}`
      );
      setType("success");
      setIsOpen(true);
      setMessage("댓글이 삭제되었습니다.");
    } catch (e: any) {
      if (e.response?.status === 401) {
        setType("error");
        setIsOpen(true);
        setMessage("로그인이 필요합니다.");
      } else {
        setType("error");
        setIsOpen(true);
        setMessage("댓글 삭제 중 오류가 발생했습니다.");
        console.log(e, ": 댓글 삭제 중 오류");
      }
    }
  };

  return (
    <CommentDiaryStyle>
      <div className="CommentDiary_wrap Gulim">
        <div>
          <div className="DiaryComments_wrap Gulim">
            <div className="DiaryComments_mapwrap Gulim">
              {allComments
                .filter((comment) => comment.parentComment === null) // 부모 댓글만
                .map((comment) => (
                  <div key={comment.id} className="DiaryComments_parentComment">
                    <span
                      className="DiaryComments_author"
                      onClick={() => router.push(`/home/${comment.user?.id}`)}
                    >
                      {comment.user.name} :{" "}
                    </span>
                    <span className="DiaryComments_content">
                      {comment.content}
                    </span>
                    <span className="DiaryComments_date">
                      <span className="DiaryComments_date">
                        (
                        {new Date(comment.created_at).toLocaleString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                        )
                      </span>
                    </span>
                    <img
                      src="/arrowIcon.png"
                      alt="arrow-icon"
                      className="DiaryComments_arrowicon"
                      onClick={() => handleReplyClick(comment.id)}
                    />
                    {(Number(comment.user.id) === Number(user?.id) ||
                      Number(user?.id) === Number(id)) && (
                      <span
                        className="DiaryComments_comment_deletebtn"
                        onClick={() => confrim(comment.id)}
                      >
                        ☒
                      </span>
                    )}

                    {replyingCommentId === comment.id && (
                      <div className="DiaryComments_childrenComment">
                        <div className="DiaryComments_inputWrap">
                          <label
                            className="DiaryComments_commentLabel"
                            htmlFor={`reply-input-${comment.id}`}
                          >
                            답글
                          </label>
                          <input
                            className="DiaryComments_commentInput"
                            id={`reply-input-${comment.id}`}
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <button
                            className="DiaryComments_commentBtn"
                            onClick={() => {
                              handleSaveComment(replyText, Number(comment.id));
                            }}
                          >
                            확인
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 자식 댓글들 */}
                    {allComments
                      .filter((child) => child.parentComment?.id === comment.id)
                      .map((child) => (
                        <div
                          key={child.id}
                          className="DiaryComments_childrenComment_wrap"
                        >
                          <span className="DiaryComments_childarrow">⤷ </span>
                          <span
                            className="DiaryComments_author"
                            onClick={() =>
                              router.push(`/home/${child.user?.id}`)
                            }
                          >
                            {child.user.name} :{" "}
                          </span>
                          <span className="DiaryComments_content">
                            {child.content}
                          </span>
                          <span className="DiaryComments_date">
                            (
                            {new Date(comment.created_at).toLocaleString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                            )
                          </span>
                          {(Number(user?.id) === Number(child.user.id) ||
                            Number(user?.id) === Number(id)) && (
                            <span
                              className="DiaryComments_comment_deletebtn"
                              onClick={() => confrim(child.id)}
                            >
                              ☒
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="CommentDiary_inputWrap Gulim">
          <label
            className="CommentDiary_commentLabel"
            htmlFor="CommentDiary_comment-input"
          >
            댓글
          </label>
          <input
            className="CommentDiary_commentInput"
            id="CommentDiary_comment-input"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="CommentDiary_commentBtn"
            onClick={() => {
              handleSaveComment(comment, null);
            }}
          >
            확인
          </button>
        </div>
      </div>
      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          if (type !== "confirm") {
            window.location.reload();
          }
        }}
        message={message}
        onConfirm={handleDeleteComment}
      />
    </CommentDiaryStyle>
  );
};

export default CommentDiary;
