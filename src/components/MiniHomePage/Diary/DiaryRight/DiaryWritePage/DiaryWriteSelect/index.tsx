import { DiaryWriteSelectStyle } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

interface FolderNode {
  id: number;
  title: string;
  children: FolderNode[];
}

interface DiaryWriteSelectProps {
  folders: FolderItem[];
  setFolder: React.Dispatch<React.SetStateAction<FolderItem[]>>;
}

const buildFolderTree = (flatFolders: FolderItem[]): FolderNode[] => {
  const idToNodeMap = new Map<number, FolderNode>();

  flatFolders.forEach((folder) => {
    idToNodeMap.set(folder.id, {
      id: folder.id,
      title: folder.title,
      children: [],
    });
  });

  const tree: FolderNode[] = [];

  flatFolders.forEach((folder) => {
    if (folder.parent_id === null) {
      tree.push(idToNodeMap.get(folder.id)!);
    } else {
      const parentNode = idToNodeMap.get(folder.parent_id);
      if (parentNode) {
        parentNode.children.push(idToNodeMap.get(folder.id)!);
      }
    }
  });

  return tree;
};

const DiaryWriteSelect: React.FC<DiaryWriteSelectProps> = ({
  folders,
  setFolder,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [selectedWeather, setSelectedWeather] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<number | "">("");

  const handleWeatherClick = (weather: string) => {
    setSelectedWeather(weather);
    console.log("선택된 날씨:", weather);
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedFolderId(selectedId);
  };

  const renderFolderOptions = (
    folders: FolderNode[],
    depth = 0
  ): React.ReactNode[] => {
    return folders.flatMap((folder) => {
      const indent = "  ".repeat(depth); // 공백 2칸씩 들여쓰기
      const currentOption = (
        <option key={folder.id} value={folder.id}>
          {indent + folder.title}
        </option>
      );

      const childrenOptions = renderFolderOptions(folder.children, depth + 1);
      return [currentOption, ...childrenOptions];
    });
  };

  // 트리 구조로 변환
  const folderTree = buildFolderTree(folders || []);

  return (
    <DiaryWriteSelectStyle className="DiaryWritePage_wrap ">
      <div className="DiaryWritePage_DiaryOptions_wrap">
        {/* 날씨 선택 */}
        <div className="DiaryWritePage_WeatherSelector">
          <span>날씨</span>
          {["☀️", "🌤️", "🌧️", "⛈️", "☃️"].map((weather, index) => (
            <button
              key={index}
              className={`DiaryWritePage_WeatherButton ${
                selectedWeather === weather ? "selected" : ""
              }`}
              onClick={() => handleWeatherClick(weather)}
            >
              {weather}
            </button>
          ))}{" "}
          {/* 감정 select */}
          <div className="DiaryWritePage_SelectWrapper">
            <select defaultValue="">
              <option value="" disabled>
                기분 선택
              </option>
              <option value="love">❤️</option>
              <option value="happy">🎵</option>
              <option value="sad">💧</option>
              <option value="angry">🔥</option>
              <option value="calm">🌿</option>
            </select>
          </div>
        </div>

        {/* 카테고리 select */}
        <div className="DiaryWritePage_SelectWrapper">
          <label>폴더 이름 : </label>
          <select value={selectedFolderId} onChange={handleFolderChange}>
            <option value="" disabled>
              선택하세요
            </option>
            {renderFolderOptions(folderTree)}
          </select>
        </div>
      </div>
    </DiaryWriteSelectStyle>
  );
};

export default DiaryWriteSelect;
