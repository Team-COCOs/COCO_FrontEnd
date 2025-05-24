import { Dispatch, SetStateAction, useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Folder from "../../Folder";
import DynamicFolder from "../../DynamicFolder";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

interface PhotoProps {
  selectedMenu: { id: number; title: string } | null;
  // React.Dispatch: 상태 업데이트, SetStateAction: 타입 정의
  // 폴더 카테고리 선택해 상태 업데이트 시킴
  setSelectedMenu: React.Dispatch<
    React.SetStateAction<{ id: number; title: string } | null>
  >;

  setWrite: Dispatch<SetStateAction<boolean>>;
}

const PhotoLeft = ({ selectedMenu, setSelectedMenu, setWrite }: PhotoProps) => {
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
    // 수정하기 버튼 눌렀을 때 Folder 컴포넌트 보이도록
    setEditMode(true);
  };

  const handleClickFolder = (menu: any) => {
    setSelectedMenu(menu);
    setWrite(false); // WritePage에서 벗어나기
  };

  return (
    <PhotoLeftStyled className="PhotoLeft_wrap">
      <div className="PhotoLeft_title pixelFont">Photo Album</div>
      <div className="PhotoLeft_line"></div>
      {editMode ? (
        <Folder isType="photos" onSave={handleSave} />
      ) : (
        <DynamicFolder
          type="photos"
          selectedMenu={selectedMenu}
          onMenuSelect={(menu) => {
            setSelectedMenu(menu);
            setWrite(false);
          }}
        />
      )}

      {!editMode && isMyHomepage && (
        <div className="PhotoLeft_footer">
          <button onClick={handleEditModeToggle} className="PhotoLeft_btn">
            <span>⚙</span>
            <span className="pixelFont"> 폴더관리하기 </span>
          </button>
        </div>
      )}
    </PhotoLeftStyled>
  );
};

export default PhotoLeft;
