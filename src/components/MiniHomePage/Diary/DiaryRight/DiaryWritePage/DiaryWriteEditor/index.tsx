import { DiaryWriteEditorStyle } from "./styled";
import { useEffect, useState, useRef, forwardRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import DiaryEditorPage from "./DiaryEditorPage";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

interface DiaryEditorHandle {
  getHtml: () => string;
}

interface EditorPageProps {
  onVisibilityChange: (newVisibility: string) => void;
}

const DiaryWriteEditor = forwardRef<DiaryEditorHandle, EditorPageProps>(
  (props, ref) => {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth();
    const [folder, setFolder] = useState<FolderItem[]>([]);
    const { onVisibilityChange } = props;

    return (
      <DiaryWriteEditorStyle className="WritePage_wrap">
        <DiaryEditorPage ref={ref} onVisibilityChange={onVisibilityChange} />
      </DiaryWriteEditorStyle>
    );
  }
);

export default DiaryWriteEditor;
