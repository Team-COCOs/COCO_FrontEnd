import { useEffect, useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axiosInstance from "@/lib/axios";
import Folder from "../../Folder";
import DynamicFolder from "../../DynamicFolder";

interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  isEditing?: boolean;
  children?: TreeNode[];
  parent_id?: string | null;
}

const PhotoLeft = () => {
  const [editMode, setEditMode] = useState(false); // Folder 또는 DynamicFolder 전환용
  const [selectedMenu, setSelectedMenu] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleSave = () => {
    // Folder에서 저장 완료 → DynamicFolder로 전환
    setEditMode(false);
  };

  return (
    <PhotoLeftStyled className="PhotoLeft_wrap">
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
