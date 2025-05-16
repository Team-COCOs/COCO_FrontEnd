import Dropdown from "@/components/Dropdown";
import { WritePageStyle } from "./styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import EditorPage from "./EditorPage";
import { convertHtmlToJsxString } from "@/utils/Photo/convert";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

const WritePage = () => {
  const { user } = useAuth();
  const userId = user?.id;

  // 폴더
  const [folder, setFolder] = useState<FolderItem[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);

  // 제목
  const [title, setTitle] = useState("");

  // 첨부 파일
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 공개 여부
  const [visibility, setVisibility] = useState("");

  // 에디터 html 사용
  const editorRef = useRef<{ getHtml: () => string }>(null);

  // 기본
  const getDefaultFolder = (): FolderItem[] => [
    {
      id: 0,
      title: "새 폴더",
      parent_id: null,
    },
  ];

  useEffect(() => {
    // 폴더 불러오기
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/photos/folderList`, {
        params: { userId },
      })
      .then((res) => {
        setFolder(res.data);
      })
      .catch((e) => {
        console.log("폴더 데이터 로딩 실패:", e);
        setFolder(getDefaultFolder());
      });
  }, []);

  // 저장
  const photoSave = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!selectedFolder) return alert("폴더를 선택해주세요.");
    if (!visibility) return alert("공개 여부를 선택해주세요.");

    // 에디터 HTML 추출
    const htmlContent = editorRef.current?.getHtml() || "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", htmlContent);
    formData.append("folderId", String(selectedFolder.id));
    formData.append("visibility", visibility);
    if (file) {
      formData.append("photo", file);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await axiosInstance.post("/photos/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("저장 완료!");

      console.log("저장 대답 : ", res.data);
      window.location.reload();
    } catch (e) {
      console.log("저장 실패:", e);
    }
  };

  // 파일 열리게
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  // 어느 폴더에 저장할 건지 선택해야함.
  return (
    <WritePageStyle className="WritePage_wrap Gulim">
      <div className="WritePage_title">
        <p className="WritePage_titleText">제목</p>
        <input
          type="text"
          className="Gulim"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <div className="WritePage_dropDown">
          <Dropdown
            label="폴더선택"
            folderOption={folder}
            onSelect={(selected) => setSelectedFolder(selected)}
          />
        </div>
      </div>

      <div className="WritePage_title">
        <p className="WritePage_titleText">사진</p>
        <input
          type="file"
          className="WritePage_none"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <input
          type="text"
          value={fileName}
          disabled
          placeholder="첨부된 파일 없음"
        />

        <div className="WritePage_dropDown">
          <button
            type="button"
            className="WritePage_btn"
            onClick={handleFileClick}
          >
            <span className="WritePage_plus">+</span>
            첨부
          </button>
        </div>
      </div>

      <EditorPage ref={editorRef} onVisibilityChange={setVisibility} />

      <div className="WritePage_line"></div>

      <div className="WritePage_btns">
        <button className="Gulim" onClick={() => window.location.reload()}>
          목록
        </button>
        <button className="Gulim" onClick={photoSave}>
          확인
        </button>
      </div>
    </WritePageStyle>
  );
};

export default WritePage;
