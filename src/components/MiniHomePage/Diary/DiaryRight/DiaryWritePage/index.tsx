import { DiaryWritePageStyle } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import DiaryWriteEditor from "./DiaryWriteEditor";
import DiaryWriteSelect from "./DiaryWriteSelect";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

const DiaryWritePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [folder, setFolder] = useState<FolderItem[]>([]);

  // 기본
  const getDefaultFolder = (): FolderItem[] => [
    {
      id: 0,
      title: "새 폴더",
      parent_id: null,
    },
  ];

  // 폴더 불러오기
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/diary/folderList?userId=${user?.id}`
      )
      .then((res) => {
        setFolder(res.data);
        console.log("폴더 : ", res.data);
      })
      .catch((e) => {
        console.log("폴더 데이터 로딩 실패:", e);
        setFolder(getDefaultFolder());
      });
  }, []);

  return (
    <DiaryWritePageStyle className="WritePage_wrap">
      <div>
        <DiaryWriteSelect />
      </div>
      <div>
        <DiaryWriteEditor />
      </div>
    </DiaryWritePageStyle>
  );
};

export default DiaryWritePage;
