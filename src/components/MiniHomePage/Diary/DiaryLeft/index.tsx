import { DiaryLeftStyled } from "./styled";
import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axiosInstance from "@/lib/axios";
import DynamicFolder from "../../DynamicFolder";
import Folder from "../../Folder";

interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: TreeNode[];
}

const DiaryLeft = () => {
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
    <DiaryLeftStyled className="PhotoLeft_wrap">
      {editMode ? (
        <Folder type="photos" onSave={handleSave} />
      ) : (
        <DynamicFolder
          type="photos"
          onMenuSelect={(menu) => setSelectedMenu(menu)}
        />
      )}
    </DiaryLeftStyled>
  );
};
export default DiaryLeft;
