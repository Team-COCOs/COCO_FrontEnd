import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { FolderStyle } from "./styled";
import { TreeNode } from "./types";
import { useTreeData } from "./useTreeData";
import { useDragDrop } from "./useDragDrop";
import { saveTreeData } from "./useFlattenTree";
import axiosInstance from "@/lib/axios";

interface FolderProps {
  type: string;
  onSave: () => void;
}

const Folder = ({ type, onSave }: FolderProps) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  // 폴더 축소, 확대
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState<string>("");

  const {
    treeData, // useTreeData.ts 에서 저장된 treeData
    setTreeData, // useTreeData.ts 에서 저장할 treeData
    editNodeByKey, // useTreeData.ts 에서 수정 후 데이터 업데이트
    deleteNodeByKey, // useTreeData.ts 에서 노드 삭제
    insertNodeInside, // useTreeData.ts 에서 중첩 막기
    addNewNode, // useTreeData.ts 에서 노드 추가
  } = useTreeData();

  const { handleDrop } = useDragDrop(treeData, setTreeData, insertNodeInside);

  const handleCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue.checked || checkedKeysValue);
  };

  const handleEdit = (action: string) => {
    let updatedTreeData = [...treeData];

    if (action === "add") {
      addNewNode();
      return;
    }

    if (action === "edit" && checkedKeys.length === 1) {
      updatedTreeData = editNodeByKey(
        updatedTreeData,
        checkedKeys[0],
        editTitle
      );
    } else if (action === "delete") {
      checkedKeys.forEach((key) => {
        updatedTreeData = deleteNodeByKey(updatedTreeData, key);
      });
    }

    setTreeData(updatedTreeData);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  const handleStartEditing = () => {
    if (checkedKeys.length === 1) {
      const findTitle = (nodes: TreeNode[]): string | undefined => {
        for (const node of nodes) {
          if (node.key === checkedKeys[0]) return node.title;
          if (node.children) {
            const title = findTitle(node.children);
            if (title) return title;
          }
        }
        return undefined;
      };
      const title = findTitle(treeData);
      if (title) {
        setEditTitle(title);
        setIsEditing(true);
      }
    }
  };

  const handleFinishEditing = () => {
    const updatedTree = editNodeByKey(treeData, checkedKeys[0], editTitle);
    setTreeData(updatedTree);
    setIsEditing(false);
  };

  // 저장 (useFlattenTree.ts 에서 저장)
  const handleSave = () => {
    saveTreeData(type, treeData, onSave);
  };

  // 확장 및 축소를 위한 함수
  const handleExpand = (expandedKeysValue: any) => {
    setExpandedKeys(expandedKeysValue);
  };

  // 자식 폴더
  const mapChildrenRecursive = (children: any[] | undefined): TreeNode[] => {
    if (!children || children.length === 0) return [];

    return children.map((child) => ({
      key: String(child.id),
      title: child.title,
      isLeaf: false,
      children: mapChildrenRecursive(child.children),
    }));
  };

  // 현 폴더 구조
  useEffect(() => {
    axiosInstance
      .get(`/${type}/folderList`)
      .then((res) => {
        const nestedTreeData = res.data.map((item: any) => ({
          key: String(item.id),
          title: item.title,
          isLeaf: false,
          children: mapChildrenRecursive(item.children),
        }));

        setTreeData(nestedTreeData);
      })
      .catch((err) => {
        console.error("폴더 데이터 로딩 실패:", err);
      });
  }, [type]);

  return (
    <FolderStyle className="Folder_wrap">
      <div className="Folder_btns">
        <button onClick={() => handleEdit("add")}>추가</button>
        {isEditing ? (
          <button onClick={handleFinishEditing}>수정 완료</button>
        ) : (
          <button onClick={handleStartEditing}>수정</button>
        )}
        <button onClick={() => handleEdit("delete")}>삭제</button>
      </div>

      <div className="Folder_componentWrap">
        <Tree
          draggable
          treeData={treeData}
          checkable
          checkStrictly
          checkedKeys={checkedKeys}
          onCheck={handleCheck}
          expandedKeys={expandedKeys} // expandedKeys 추가
          onExpand={handleExpand} // onExpand 이벤트 추가
          titleRender={(node: TreeNode) => (
            <span>
              {node.key === checkedKeys[0] && isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={handleTitleChange}
                  onBlur={handleFinishEditing}
                />
              ) : (
                node.title
              )}
            </span>
          )}
          onDrop={handleDrop}
        />
      </div>

      <button className="Folder_submit" onClick={handleSave}>
        저장
      </button>
    </FolderStyle>
  );
};

export default Folder;
