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

interface DiaryWritePageProps {
  setDiaryWrite: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaryWritePage = ({ setDiaryWrite }: DiaryWritePageProps) => {
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

  useEffect(() => {
    if (!user?.id) return; // user id가 없으면 요청 안 함

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/diary/folderList?userId=${user.id}`
      )
      .then((res) => {
        setFolder(res.data);
        console.log("폴더 : ", res.data);
      })
      .catch((e) => {
        console.log("폴더 데이터 로딩 실패:", e);
        setFolder(getDefaultFolder());
      });
  }, [user?.id]);

  return (
    <DiaryWritePageStyle className="WritePage_wrap">
      <div className="WritePage_wrap_SelectWrap">
        <DiaryWriteSelect folders={folder} setFolder={setFolder} />
      </div>
      <div className="WritePage_wrap_EditorWrap">
        <DiaryWriteEditor />
      </div>
      <div className="WritePage_wrap_SaveBtnWrap">
        <button
          className="WritePage_SaveBtn"
          onClick={() => setDiaryWrite(false)}
        >
          목록
        </button>
        <button className="WritePage_SaveBtn">저장</button>
      </div>
    </DiaryWritePageStyle>
  );
};

export default DiaryWritePage;
