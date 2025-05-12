import { useState } from "react";
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
  selectedBgm: BgmInfo | null;
  onSelectBgm: (bgm: BgmInfo | null) => void;
}

const Bgm = ({ bgm, selectedBgm, onSelectBgm }: BgmProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(bgm.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = bgm.slice(startIdx, startIdx + itemsPerPage);

  return (
    <BgmStyle>
      <div className="Bgm_table Gulim">
        <div className="Bgm_tableHeader">
          <label className="Bgm_column checkbox">
            <input type="checkbox" disabled />
            <span className="custom-checkbox">✔</span>
          </label>
          <div className="Bgm_column">번호</div>
          <div className="Bgm_column title">곡명</div>
          <div className="Bgm_column artist">아티스트</div>
        </div>

        {currentItems.map((item, idx) => {
          const isSelected = selectedBgm?.id === item.id;
          return (
            <div key={item.id} className="Bgm_item">
              <label className="Bgm_column checkbox">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSelectBgm(isSelected ? null : item)}
                />
                <span className="custom-checkbox">✔</span>
              </label>
              <div className="Bgm_column">{startIdx + idx + 1}</div>
              <div className="Bgm_column title">{item.storeItems.name}</div>
              <div className="Bgm_column artist">{item.storeItems.artist}</div>
            </div>
          );
        })}
      </div>

      {/* 페이지 번호 나열 */}
      <div
        className="pagination-controls"
        style={{ marginTop: "1rem", textAlign: "center" }}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button key={pageNum} onClick={() => setCurrentPage(pageNum)}>
            {pageNum}
          </button>
        ))}
      </div>
    </BgmStyle>
  );
};

export default Bgm;
