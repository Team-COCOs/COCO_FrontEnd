import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { DynamicFolderStyled } from "./styled";

interface FolderItem {
  id: number;
  title: string;
  parent_id: number | null;
  children?: FolderItem[];
}

interface DynamicFolderProps {
  onMenuSelect: (menu: { id: number; title: string }) => void;
  type: string;
}

const DynamicFolder = ({ onMenuSelect, type }: DynamicFolderProps) => {
  const [folderTree, setFolderTree] = useState<FolderItem[]>([]);

  const buildTree = (data: FolderItem[]): FolderItem[] => {
    const idMap = new Map<number, FolderItem>();
    const tree: FolderItem[] = [];

    data.forEach((item) => {
      idMap.set(item.id, { ...item, children: [] });
    });

    data.forEach((item) => {
      const current = idMap.get(item.id)!;
      if (item.parent_id !== null) {
        const parent = idMap.get(item.parent_id);
        if (parent) {
          parent.children!.push(current);
        }
      } else {
        tree.push(current);
      }
    });

    return tree;
  };

  useEffect(() => {
    axiosInstance
      .get(`/${type}/folderList`)
      .then((res) => {
        console.log("폴더 데이터 : ", res.data);
        const treeData = buildTree(res.data.folders);
        setFolderTree(treeData);
      })
      .catch((err) => {
        console.error("폴더 데이터 로딩 실패:", err);
      });
  }, []);

  const renderMenuItem = (menu: FolderItem) => {
    const hasChildren = menu.children && menu.children.length > 0;

    return (
      <li key={menu.id} className={hasChildren ? "has-children" : ""}>
        <span className="dot-symbol">◉</span>
        <span
          className="MiniHomeProfileLeftMenu_menu_cursor"
          onClick={() => onMenuSelect({ id: menu.id, title: menu.title })}
        >
          {menu.title}
        </span>
        {hasChildren && (
          <ul>
            {menu.children!.map((child) => (
              <div
                className="MiniHomeProfileLeftMenu_dotted_wrap"
                key={child.id}
                onClick={() =>
                  onMenuSelect({ id: child.id, title: child.title })
                }
              >
                <span
                  style={{
                    borderLeft: "2px dotted #bbb",
                    borderBottom: "2px dotted #bbb",
                    padding: "0 4px",
                  }}
                ></span>
                <li className="MiniHomeProfileLeftMenu_menu_cursor">
                  &nbsp;{child.title}
                </li>
              </div>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <DynamicFolderStyled>
      <div className="MiniHomeProfileLeftMenu">
        <ul>{folderTree.map((folder) => renderMenuItem(folder))}</ul>
      </div>
    </DynamicFolderStyled>
  );
};

export default DynamicFolder;
