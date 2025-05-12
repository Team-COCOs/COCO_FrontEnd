import { useEffect, useRef, useState } from "react";
import { BgmStyle } from "./styeld";

interface BgmInfo {
  id: number;
  acquired_at: string;
  storeItems: {
    id: number;
    name: string;
    artist: string | null;
    category: string;
    created_at: string;
    duration: number | null;
    file: string;
    price: number;
  };
}

interface BgmProps {
  bgm: BgmInfo[];
}

const Bgm = ({ bgm }: BgmProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSelect = (item: BgmInfo) => {
    if (selectedId === item.id) {
      // 이미 재생 중인 곡이라면 정지
      audioRef.current?.pause();
      setSelectedId(null);
      setAudioSrc(null);
    } else {
      setSelectedId(item.id);
      setAudioSrc(item.storeItems.file);
    }
  };

  useEffect(() => {
    if (audioSrc) {
      audioRef.current?.pause(); // 기존 오디오 중지
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play();
    } else {
      audioRef.current?.pause();
      audioRef.current = null;
    }
  }, [audioSrc]);

  return (
    <BgmStyle>
      <div className="Bgm_table Gulim">
        <div className="Bgm_tableHeader">
          <label className="Bgm_column checkbox">
            <input type="checkbox" />
            <span className="custom-checkbox">✔</span>
          </label>

          <div className="Bgm_column">번호</div>
          <div className="Bgm_column title">곡명</div>
          <div className="Bgm_column artist">아티스트</div>
        </div>

        {bgm.map((item, idx) => (
          <div key={item.id} className="Bgm_item">
            <label className="Bgm_column checkbox">
              <input type="checkbox" />
              <span className="custom-checkbox">✔</span>
            </label>

            <div className="Bgm_column">{idx + 1}</div>
            <div className="Bgm_column title">
              <span className="custom-radio" onClick={() => handleSelect(item)}>
                {selectedId === item.id ? "▶" : "▷"}
              </span>
              {item.storeItems.name}
            </div>
            <div className="Bgm_column artist">{item.storeItems.artist}</div>

            <audio ref={audioRef} controls hidden />
          </div>
        ))}
      </div>
    </BgmStyle>
  );
};

export default Bgm;
