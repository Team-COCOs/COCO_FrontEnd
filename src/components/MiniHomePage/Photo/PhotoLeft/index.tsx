import { useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Folder from "../../Folder";
import DynamicFolder from "../../DynamicFolder";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const PhotoLeft = () => {
  // Folder 또는 DynamicFolder 전환용
  const [editMode, setEditMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const isMyHomepage = user?.id?.toString() === id?.toString();

  console.log("내 계정", isMyHomepage);

  const handleSave = () => {
    // Folder에서 저장 완료 → DynamicFolder로 전환
    setEditMode(false);
  };

  const handleEditModeToggle = () => {
    setEditMode(true); // 수정하기 버튼 눌렀을 때 Folder 컴포넌트 보이도록
  };

  return (
    <PhotoLeftStyled className="PhotoLeft_wrap">
      <div className="PhotoLeft_title">Photo Album</div>
      {editMode ? (
        <Folder type="photos" onSave={handleSave} />
      ) : (
        <DynamicFolder
          type="photos"
          onMenuSelect={(menu) => setSelectedMenu(menu)}
        />
      )}

      {!editMode && isMyHomepage && (
        <button onClick={handleEditModeToggle} className="PhotoLeft_btn">
          ⚙ 폴더관리하기
        </button>
      )}
    </PhotoLeftStyled>
  );
};

export default PhotoLeft;
