import axiosInstance from "../axiosInstance";

type ModalType =
  | "error"
  | "success"
  | "pay"
  | "friendReq"
  | "confirm"
  | "profile";

// 댓글 삭제
export const handleDeleteComment = async (
  type: string,
  photoId: number,
  openModal: (
    type: ModalType,
    options?: {
      message?: string;
      data?: any;
      userName?: string;
      onConfirm?: () => void | Promise<void>;
    }
  ) => void
) => {
  try {
    axiosInstance.delete(`/${type}/${photoId}`);
    openModal("success", { message: "댓글이 삭제되었습니다." });
  } catch (e: any) {
    if (e.response.status === 401) {
      openModal("error", { message: "로그인이 필요합니다." });
    } else {
      openModal("error", { message: "댓글 삭제 중 오류가 발생했습니다." });
      console.log(e, ": 댓글 삭제 중 오류");
    }
  }
};
