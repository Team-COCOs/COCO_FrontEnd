import React from "react";

export type TabKey =
  | "minihome"
  | "miniprofile"
  | "diary"
  | "photo"
  | "visitor"
  | "coco"
  | "setting";

export const TAB_LABELS: Record<TabKey, string> = {
  minihome: "홈",
  miniprofile: "프로필",
  diary: "다이어리",
  photo: "사진첩",
  visitor: "방명록",
  coco: "코코",
  setting: "관리",
};
