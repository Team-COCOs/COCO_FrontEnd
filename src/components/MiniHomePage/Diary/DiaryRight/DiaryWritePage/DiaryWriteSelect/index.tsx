import { DiaryWriteSelectStyle } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
}

const DiaryWriteSelect = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [folder, setFolder] = useState<FolderItem[]>([]);
  const [selectedWeather, setSelectedWeather] = useState("");

  const handleWeatherClick = (weather: string) => {
    setSelectedWeather(weather);
    console.log("선택된 날씨:", weather);
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
              className="DiaryWritePage_WeatherButton"
              onClick={() => handleWeatherClick(weather)}
            >
              {weather}
            </button>
          ))}
        </div>

        {/* 감정 select */}
        <div className="DiaryWritePage_SelectWrapper">
          <select defaultValue="">
            <option value="" disabled>
              기분 선택
            </option>
            <option value="love">❤️</option>
            <option value="happy">✨</option>
            <option value="sad">🌧️</option>
            <option value="angry">🔥</option>
            <option value="calm">🌿</option>
          </select>
        </div>

        {/* 카테고리 select */}
        <div className="DiaryWritePage_SelectWrapper">
          <label>폴더 이름 : </label>
          <select defaultValue="">
            <option value="" disabled>
              선택하세요
            </option>
            <option value="daily">일상</option>
            <option value="trip">여행</option>
            <option value="study">공부</option>
            <option value="work">업무</option>
            <option value="etc">기타</option>
          </select>
        </div>
      </div>
    </DiaryWriteSelectStyle>
  );
};

export default DiaryWriteSelect;
