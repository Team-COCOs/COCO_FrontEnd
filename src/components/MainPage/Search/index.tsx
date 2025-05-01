import clsx from "clsx";
import { SearchStyle } from "./styled";
import Image from "next/image";

const Search = () => {
  return (
    <SearchStyle className={clsx("Search_wrap")}>
      <div className="Search_inputBack">
        <div className="Search_input">
          <div className="Search_select"> 미니홈피 </div>
          <div className="Search_downBtn">
            <span className="Search_triangle"></span>
          </div>
          <input type="text" placeholder="다른 미니홈피를 검색해보세요." />
        </div>
      </div>
      <div className="Search_btn">검색</div>
    </SearchStyle>
  );
};

export default Search;
