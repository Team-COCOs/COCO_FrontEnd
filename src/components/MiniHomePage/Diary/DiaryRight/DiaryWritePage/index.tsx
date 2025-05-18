import { DiaryWritePageStyle } from "./styled";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import DiaryWriteEditor from "./DiaryWriteEditor";
import DiaryWriteSelect from "./DiaryWriteSelect";
import axiosInstance from "@/lib/axios";
import { DiaryType } from "../../DiaryRight";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
  children: FolderItem[] | null;
}

interface DiaryWritePageProps {
  setDiaryWrite: React.Dispatch<React.SetStateAction<boolean>>;
  editingDiary?: DiaryType | null;
}

interface EditorPageProps {
  onVisibilityChange: (newVisibility: string) => void;
}

export interface DiaryEditorHandle {
  getHtml: () => string;
}

const DiaryWritePage = ({
  setDiaryWrite,
  editingDiary,
}: DiaryWritePageProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [folder, setFolder] = useState<FolderItem[]>([]);

  // 에디터 html 사용
  const editorRef = useRef<{ getHtml: () => string }>(null);
  // 공개 여부
  const [visibility, setVisibility] = useState("");

  // 다이어리 기분, 날씨, 폴더 선택
  const [selectedWeather, setSelectedWeather] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<number | "">("");
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState("");

  // 기본
  const getDefaultFolder = (): FolderItem[] => [
    {
      id: 0,
      title: "새 폴더",
      parent_id: null,
      children: null,
    },
  ];

  useEffect(() => {
    if (!user?.id) return;

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

  const handleSave = async () => {
    const content = editorRef.current?.getHtml() || "";

    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!selectedFolderName) {
      alert("폴더를 선택해주세요.");
      return;
    }

    if (!selectedWeather) {
      alert("날씨를 선택해주세요.");
      return;
    }

    if (!selectedMood) {
      alert("기분을 선택해주세요.");
      return;
    }

    if (!visibility) {
      alert("공개 설정을 선택해주세요.");
      return;
    }

    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }

    console.log("전송 데이터:", {
      folder_name: selectedFolderName,
      weather: selectedWeather,
      mood: selectedMood,
      visibility: visibility,
      content: content,
    });

    try {
      const response = await axiosInstance.post(`/diary/save`, {
        folder_name: selectedFolderName,
        weather: selectedWeather,
        mood: selectedMood,
        visibility: visibility,
        content: content,
      });
      console.log(response.data, "다이어리 일기쓰기 저장?");
      alert("저장 성공!");
      router.push(`/home/${id}`);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    console.log(editingDiary, "editingDiary?");
  }, [editingDiary]);

  return (
    <DiaryWritePageStyle className="WritePage_wrap">
      <div className="WritePage_wrap_SelectWrap">
        <DiaryWriteSelect
          folders={folder}
          setFolder={setFolder}
          selectedWeather={selectedWeather}
          setSelectedWeather={setSelectedWeather}
          selectedFolderName={selectedFolderName}
          setSelectedFolderName={setSelectedFolderName}
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
        />
      </div>
      <div className="WritePage_wrap_EditorWrap">
        <DiaryWriteEditor ref={editorRef} onVisibilityChange={setVisibility} />
      </div>
      <div className="WritePage_wrap_SaveBtnWrap">
        <button
          className="WritePage_SaveBtn"
          onClick={() => setDiaryWrite(false)}
        >
          목록
        </button>
        <button className="WritePage_SaveBtn" onClick={handleSave}>
          저장
        </button>
      </div>
    </DiaryWritePageStyle>
  );
};

export default DiaryWritePage;
