import React from "react";

export type TabKey =
  | "Home"
  | "Profile"
  | "Diary"
  | "Photo"
  | "Visitor"
  | "Coco"
  | "Setting";

export const TAB_LABELS: Record<TabKey, string> = {
  Home: "홈",
  Profile: "프로필",
  Diary: "다이어리",
  Photo: "사진첩",
  Visitor: "방명록",
  Coco: "코코",
  Setting: "관리",
};
