import { useState } from "react";
import { BgmStyle } from "./styeld";
import EmptyPage from "@/components/EmptyPage";

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
  setCurrentPage: any;
  currentPage: number;
}

const Bgm = ({
  bgm,
  selectedBgm,
  onSelectBgm,
  setCurrentPage,
  currentPage,
}: BgmProps) => {
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

        {currentItems.length === 0 ? (
          <EmptyPage type="Bgm_img" />
        ) : (
          currentItems.map((item, idx) => {
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
                <div className="Bgm_column artist">
                  {item.storeItems.artist}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="Bgm_footer">
        <div className="Bgm_pageNation">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={currentPage === pageNum ? "active" : ""}
              >
                {pageNum}
              </button>
            )
          )}
        </div>
      </div>
    </BgmStyle>
  );
};

export default Bgm;
