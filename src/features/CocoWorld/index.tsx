import { CocoWorldPageStyled } from "./styled";
import { useRouter } from "next/router";
import HomeTodayTitle from "../../components/MiniHomePage/HomeTodayTitle";
import DiaryTitle from "../../components/MiniHomePage/DiaryTitle";

const CocoWorld = () => {
  const router = useRouter();

  return (
    <CocoWorldPageStyled className="CocoWorldPage_wrap">
      <div className="CocoWorldPage_container">
        <div className="CocoWorldPage_left">
          <div className="CocoWorldPage_book_wrap">
            {/* 책 왼쪽 */}
            <div className="CocoWorldPage_book_left">
              <div className="CocoWorldPage_bookLeft_line">
                <div className="CocoWorldPage_bookLeft_paper">
                  {/* 투데이 컴포넌트*/}
                  <div className="CocoWorldPage_bookLeft_todayWrap">
                    <HomeTodayTitle />
                  </div>
                  {/* 다이어리 왼쪽 컴포넌트 */}
                  <div className="CocoWorldPage_diary_left"></div>
                </div>
              </div>
            </div>
            {/* 책 오른쪽 */}
            <div className="CocoWorldPage_book_right">
              <div className="CocoWorldPage_bookRight_line">
                <div className="CocoWorldPage_bookRight_paper">
                  {/* 미니홈피 이름 */}
                  <div className="CocoWorldPage_bookRight_todayWrap">
                    <DiaryTitle />
                  </div>
                  {/* 다이어리 왼쪽 컴포넌트 */}
                  <div className="CocoWorldPage_diary_Right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="CocoWorldPage_right"></div>
      </div>
    </CocoWorldPageStyled>
  );
};

export default CocoWorld;
