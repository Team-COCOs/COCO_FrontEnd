import { useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Folder from "../../Folder";
import DynamicFolder from "../../DynamicFolder";

const PhotoLeft = () => {
  // Folder 또는 DynamicFolder 전환용
  const [editMode, setEditMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleSave = () => {
    // Folder에서 저장 완료 → DynamicFolder로 전환
    setEditMode(false);
  };

  const handleEditModeToggle = () => {
    setEditMode(true); // 수정하기 버튼 눌렀을 때 Folder 컴포넌트 보이도록
  };

  return (
    <PhotoLeftStyled className="PhotoLeft_wrap">
      {/* 수정하기 버튼 추가 */}
      {!editMode && <button onClick={handleEditModeToggle}>수정하기</button>}

      {editMode ? (
        <Folder type="photos" onSave={handleSave} />
      ) : (
        <DynamicFolder
          type="photos"
          onMenuSelect={(menu) => setSelectedMenu(menu)}
        />
      )}
    </PhotoLeftStyled>
  );
};

export default PhotoLeft;
