import React from "react";

export type TabKey =
  | "home"
  | "profile"
  | "diary"
  | "photo"
  | "visitor"
  | "coco"
  | "setting";

export const TAB_LABELS: Record<TabKey, string> = {
  home: "홈",
  profile: "프로필",
  diary: "다이어리",
  photo: "사진첩",
  visitor: "방명록",
  coco: "코코",
  setting: "관리",
};
