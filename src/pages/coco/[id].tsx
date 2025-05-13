// pages/minihome/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "@/components/Loading";

import MinihomeLayout from "@/features/Minihome";
import HomeLeft from "@/components/MiniHomePage/Home/HomeLeft";
import HomeRight from "@/components/MiniHomePage/Home/HomeRight";

// 미니홈피 프로필 컴포넌트
import MiniHomeProfileLeft from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileLeft";
import MiniHomeProfileRight from "@/components/MiniHomePage/MiniHomeProfile/MiniHomeProfileRight";
// 미니홈피 다이어리 컴포넌트
import DiaryLeft from "@/components/MiniHomePage/Diary/DiaryLeft";
import DiaryRight from "@/components/MiniHomePage/Diary/DiaryRight";
// 미니홈피 사진첩 컴포넌트
import PhotoLeft from "@/components/MiniHomePage/Photo/PhotoLeft";
import PhotoRight from "@/components/MiniHomePage/Photo/PhotoRight";
// 방명록 컴포넌트
import VisitorRight from "@/components/MiniHomePage/Visitor/VisitorRight";
// 코코 컴포넌트
import CocoRight from "@/components/MiniHomePage/Coco/CocoRight";
// 관리 사진첩 컴포넌트
import SettingLeft from "@/components/MiniHomePage/Setting/SettingLeft";
import SettingRight from "@/components/MiniHomePage/Setting/SettingRight";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const MinihomePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MinihomeLayout
      id={id as string}
      tapChildren={<HomeLeft />}
      children={<CocoRight />}
    />
  );
};

export default MinihomePage;
