import { DiaryWriteSelectStyle } from "./styled";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
  children: FolderItem[] | null;
}

interface DiaryWriteSelectProps {
  folders: FolderItem[];
  setFolder: React.Dispatch<React.SetStateAction<FolderItem[]>>;
  selectedWeather: string;
  setSelectedWeather: React.Dispatch<React.SetStateAction<string>>;
  selectedFolderName: string;
  setSelectedFolderName: React.Dispatch<React.SetStateAction<string>>;
  selectedMood: string;
  setSelectedMood: React.Dispatch<React.SetStateAction<string>>;
}

const DiaryWriteSelect: React.FC<DiaryWriteSelectProps> = ({
  folders,
  setFolder,
  selectedWeather,
  setSelectedWeather,
  selectedFolderName,
  setSelectedFolderName,
  selectedMood,
  setSelectedMood,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleWeatherClick = (weather: string) => {
    setSelectedWeather(weather);
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedFolderName(selectedName);
  };

  const renderFolderOptions = (
    folders: FolderItem[],
    depth = 0
  ): React.ReactNode[] => {
    return folders.flatMap((folder) => {
      const prefix = "ㄴ".repeat(depth);
      const currentOption = (
        <option key={folder.id} value={folder.title}>
          {prefix} {folder.title}
        </option>
      );
      const childrenOptions = folder.children
        ? renderFolderOptions(folder.children, depth + 1)
        : [];
      return [currentOption, ...childrenOptions];
    });
  };

  return (
    <DiaryWriteSelectStyle className="DiaryWritePage_wrap">
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
          ))}

          {/* 감정 select */}
          <div className="DiaryWritePage_SelectWrapper">
            <select
              defaultValue=""
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
            >
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

        {/* 카테고리 선택 */}
        <div className="DiaryWritePage_SelectWrapper">
          <label>폴더 이름 : </label>
          <select value={selectedFolderName} onChange={handleFolderChange}>
            <option value="" disabled>
              선택하세요
            </option>
            {renderFolderOptions(folders)}
          </select>
        </div>
      </div>
    </DiaryWriteSelectStyle>
  );
};

export default DiaryWriteSelect;
