import { DiaryWriteEditorStyle } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

const DiaryWriteEditor = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [folder, setFolder] = useState<FolderItem[]>([]);

  return (
    <DiaryWriteEditorStyle className="WritePage_wrap">
      글쓰기
    </DiaryWriteEditorStyle>
  );
};

export default DiaryWriteEditor;
