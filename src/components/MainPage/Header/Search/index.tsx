import clsx from "clsx";
import { SearchStyle } from "./styled";
import Image from "next/image";
import { useState } from "react";
import ShadowModal from "@/components/ShadowModal";
import axios from "axios";
import { useRouter } from "next/router";

const Search = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const userSearch = async () => {
    if (!search.trim()) {
      setIsOpen(true);
      return;
    }
    router.push(`?keyword=${encodeURIComponent(search.trim())}`);
  };

  return (
    <SearchStyle className={clsx("Search_wrap")}>
      <div className="Search_inputBack">
        <div className="Search_input">
          <div className="Search_select"> 미니홈피 </div>
          <div className="Search_downBtn">
            <span className="Search_triangle"></span>
          </div>
          <input
            type="text"
            placeholder="다른 미니홈피를 검색해보세요."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="Search_btn" onClick={userSearch}>
        검색
      </div>

      <ShadowModal
        type="error"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message="검색어를 입력해주세요."
      />
    </SearchStyle>
  );
};

export default Search;
