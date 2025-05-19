import { Dispatch, SetStateAction } from "react";

export interface PhotoProps {
  selectedMenu: { id: number; title: string } | null;
  setWrite: Dispatch<SetStateAction<boolean>>;
  setEditData: Dispatch<SetStateAction<PhotoData | null>>;
}

export interface AuthorData {
  id: number;
  name: string;
}

export interface parentData {
  id: number;
}

export interface CommentData {
  id: number; // PK
  comment: string; // 댓글
  user: AuthorData; // 댓글 작성자
  created_at: string; // 날짜
  parentComment: parentData | null; // 대댓글
}

export interface FolderData {
  id: number;
  title: string;
  parent_id: number;
}

export interface UserData {
  id: number;
  name: string;
}

export interface PhotoData {
  id: number; // PK
  title: string; // 제목
  photo_url: string; // 이미지
  content: string; // 내용
  origin_author: UserData; // 원작자
  use_count: number; // 스크랩 수
  created_at: string; // 날짜
  visibility: string; // 전체 공개 / 일촌 공개 / 비공개
  isScripted: boolean; // 스크랩한 글인지 아닌지
  folder: FolderData; // 폴더
  comments: CommentData[]; // 댓글
  user: UserData; // 작성자 정보
}

export interface WritePageProps {
  editData?: PhotoData | null;
}

export interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}
