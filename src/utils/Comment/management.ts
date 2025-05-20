import axiosInstance from "../axiosInstance";

// 댓글 삭제
export const handleDeleteComment = (type: string, photoId: number) => {
  try {
    axiosInstance.delete(`/${type}/${photoId}`);
    alert("댓글이 삭제되었습니다.");
    window.location.reload();
  } catch (e: any) {
    if (e.response.status === 401) {
      alert("로그인이 필요합니다.");
    } else {
      alert("댓글 삭제 중 오류가 발생했습니다.");
      console.log(e, ": 댓글 삭제 중 오류");
    }
  }
};
