import React, { JSX, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { DynamicFolderStyled } from "./styled";
import axios from "axios";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const userId = router.query.id;

  const getDefaultFolder = (): FolderItem[] => [
    {
      id: 0,
      title: "새 폴더",
      parent_id: null,
      children: [],
    },
  ];

  const buildTree = (data: FolderItem[]): FolderItem[] => {
    if (!data || data.length === 0) return getDefaultFolder();

    const idMap = new Map<number, FolderItem>();
    const tree: FolderItem[] = [];

    data.forEach((item) => {
      idMap.set(item.id, {
        ...item,
        children: item.children ?? [],
      });
    });

    data.forEach((item) => {
      const current = idMap.get(item.id);
      const parentId = item.parent_id;

      if (current && parentId !== null) {
        const parent = idMap.get(parentId);
        if (parent) {
          parent.children!.push(current);
        }
      } else if (current) {
        tree.push(current);
      }
    });

    return tree;
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${type}/folderList`, {
        params: { userId },
      })
      .then((res) => {
        const normalizedData: FolderItem[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          parent_id: item.parent?.id ?? null,
          children: item.children ?? [],
        }));

        const treeData = buildTree(normalizedData);
        setFolderTree(treeData);
      })
      .catch((err) => {
        console.log(type);
        console.error("폴더 데이터 로딩 실패:", err);
        setFolderTree(getDefaultFolder());
      });
  }, [type]);

  const renderMenuItem = (menu: FolderItem): JSX.Element => {
    const hasChildren = menu.children && menu.children.length > 0;

    return (
      <li key={menu.id} className={hasChildren ? "has-children" : ""}>
        <div className="DynamicFolder_texts">
          <span className="dot-symbol">📁</span>
          <span
            className="DynamicFolder_menu_cursor"
            onClick={() => onMenuSelect({ id: menu.id, title: menu.title })}
          >
            {menu.title}
          </span>
        </div>

        {hasChildren && (
          <ul>
            {menu.children!.map((child) => (
              <li key={child.id}>
                <div
                  className="DynamicFolder_dotted_wrap"
                  onClick={() =>
                    onMenuSelect({ id: child.id, title: child.title })
                  }
                >
                  <span className="DynamicFolder_menu"></span>
                  <span className="DynamicFolder_menu_cursor">
                    &nbsp;{child.title}
                  </span>
                </div>
                {child.children && child.children.length > 0 && (
                  <ul>
                    {child.children.map((grand) => renderMenuItem(grand))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <DynamicFolderStyled>
      <div className="DynamicForder">
        <ul>{folderTree.map((folder) => renderMenuItem(folder))}</ul>
      </div>
    </DynamicFolderStyled>
  );
};

export default DynamicFolder;
