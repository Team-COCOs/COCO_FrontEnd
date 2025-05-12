import { DiaryLeftStyled } from "./styled";
import { useState } from "react";
import DynamicFolder from "../../DynamicFolder";
import Folder from "../../Folder";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface DiaryProps {
  selectedDiaryMenu: { id: number; title: string } | null;
  setSelectedDiaryMenu: React.Dispatch<
    React.SetStateAction<{ id: number; title: string } | null>
  >;
}

const DiaryLeft = ({ selectedDiaryMenu, setSelectedDiaryMenu }: DiaryProps) => {
  // Folder 또는 DynamicFolder 전환용
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const isMyHomepage = user?.id?.toString() === id?.toString();

  const handleSave = () => {
    // Folder에서 저장 완료 → DynamicFolder로 전환
    setEditMode(false);
  };

  const handleEditModeToggle = () => {
    setEditMode(true); // 수정하기 버튼 눌렀을 때 Folder 컴포넌트 보이도록
  };

  return (
    <DiaryLeftStyled className="Diary_wrap">
      <div className="Diary_title pixelFont">Photo Album</div>
      <div className="Diary_line"></div>

      {editMode ? (
        <Folder type="diary" onSave={handleSave} />
      ) : (
        <DynamicFolder
          type="diary"
          selectedMenu={selectedDiaryMenu}
          onMenuSelect={(menu) => setSelectedDiaryMenu(menu)}
        />
      )}

      {!editMode && isMyHomepage && (
        <div className="Diary_footer">
          <button onClick={handleEditModeToggle} className="Diary_btn">
            <span>⚙</span>
            <span className="pixelFont"> 폴더관리하기 </span>
          </button>
        </div>
      )}
    </DiaryLeftStyled>
  );
};
export default DiaryLeft;
