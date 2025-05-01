import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";

const CocoWorld = () => {
  const router = useRouter();

  return (
    <CocoWorldPageStyled className="CocoWorldPage_wrap">
      <div className="CocoWorldPage_container">
        <div className="CocoWorldPage_left">
          <div className="CocoWorldPage_book_wrap">
            {/* 책 왼쪽 */}
            <div className="CocoWorldPage_book_left">
              <div className="CocoWorldPage_bookLeft_line">왼쪽</div>
            </div>
            {/* 책 오른쪽 */}
            <div className="CocoWorldPage_book_right">
              <div className="CocoWorldPage_bookRight_line">오른쪽</div>
            </div>
          </div>
        </div>
        <div className="CocoWorldPage_right"></div>
      </div>
    </CocoWorldPageStyled>
  );
};

export default CocoWorld;
