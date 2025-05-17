import { DiaryWriteEditorStyle } from "./styled";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import DiaryEditorPage from "./DiaryEditorPage";

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
  // 에디터 html 사용
  const editorRef = useRef<{ getHtml: () => string }>(null);
  // 공개 여부
  const [visibility, setVisibility] = useState("");

  return (
    <DiaryWriteEditorStyle className="WritePage_wrap">
      <DiaryEditorPage ref={editorRef} onVisibilityChange={setVisibility} />
    </DiaryWriteEditorStyle>
  );
};

export default DiaryWriteEditor;
