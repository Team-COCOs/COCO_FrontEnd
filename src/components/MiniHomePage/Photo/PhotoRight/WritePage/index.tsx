import Dropdown from "@/components/Dropdown";
import { WritePageStyle } from "./styled";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import EditorPage from "./EditorPage";
import { FolderItem, WritePageProps } from "@/utils/Write/interface";

const WritePage = ({ editData }: WritePageProps) => {
  const { user } = useAuth();
  const userId = user?.id;

  // 수정 시
  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setSelectedFolder({
        id: editData.folder.id,
        title: editData.folder.title,
        parent_id: null,
      });
      setVisibility(editData.visibility);
      setFileName(editData.photo_url.split("/").pop() || ""); // 파일명 추정
      // 에디터에 초기값 세팅은 EditorPage에서 ref를 통해 가능해야 함
      // setIsEditMode(true);
    }
  }, [editData]);

  // 폴더
  const [folder, setFolder] = useState<FolderItem[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | null>(null);

  useEffect(() => {
    if (editData) {
      setSelectedFolder({
        id: editData.folder.id,
        title: editData.folder.title,
        parent_id: editData.folder.parent_id ?? null,
      });
    }
  }, [editData]);

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

  const flattenFolderTree = (folders: FolderItem[]): FolderItem[] => {
    const flatList: FolderItem[] = [];

    const traverse = (items: any[]) => {
      for (const item of items) {
        const { children, ...rest } = item;
        flatList.push(rest);
        if (children && children.length > 0) {
          traverse(children);
        }
      }
    };

    traverse(folders);
    return flatList;
  };

  useEffect(() => {
    // 폴더 불러오기
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/photos/folderList`, {
        params: { userId },
      })
      .then((res) => {
        const normalizedData: FolderItem[] = res.data
          .map((item: any) => ({
            id: item.id,
            title: item.title,
            parent_id: item.parent?.id ?? null,
            children: item.children ?? [],
          }))
          .filter((item: any) => item.title !== "스크랩");

        const flatData = flattenFolderTree(normalizedData);
        setFolder(flatData);
      })
      .catch((e) => {
        console.log("폴더 데이터 로딩 실패:", e);
        setFolder(getDefaultFolder());
      });

    console.log(editData);
  }, []);

  // 저장
  const submitPhoto = async (isEdit: boolean, postId?: number) => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!selectedFolder) return alert("폴더를 선택해주세요.");
    if (!visibility) return alert("공개 여부를 선택해주세요.");

    const htmlContent = editorRef.current?.getHtml() || "";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", htmlContent);
    formData.append("folder_name", selectedFolder.title);
    formData.append("visibility", visibility);
    if (file) {
      formData.append("photo", file);
    }

    try {
      if (isEdit) {
        // 수정 - PATCH 요청
        await axiosInstance.patch(`/photos/${postId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("수정 완료!");
      } else {
        // 저장 - POST 요청
        await axiosInstance.post("/photos/save", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("저장 완료!");
      }
      window.location.reload();
    } catch (e) {
      console.log("실패:", e);
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
        />
        <div className="WritePage_dropDown">
          <Dropdown
            label="폴더선택"
            folderOption={folder}
            selected={selectedFolder}
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
          value={editData ? editData.photo_url : fileName}
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

      <EditorPage
        content={editData?.content}
        isPublic={editData?.visibility}
        ref={editorRef}
        onVisibilityChange={setVisibility}
      />

      <div className="WritePage_line"></div>

      <div className="WritePage_btns">
        <button className="Gulim" onClick={() => window.location.reload()}>
          목록
        </button>
        <button
          className="Gulim"
          onClick={() =>
            editData ? submitPhoto(true, editData.id) : submitPhoto(false)
          }
        >
          {editData ? "수정" : "확인"}
        </button>
      </div>
    </WritePageStyle>
  );
};

export default WritePage;
