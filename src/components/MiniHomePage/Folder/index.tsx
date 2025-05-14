import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { FolderStyle } from "./styled";
import { TreeNode } from "./types";
import { useTreeData } from "./useTreeData";
import { useDragDrop } from "./useDragDrop";
import { saveTreeData } from "./useFlattenTree";
import axios from "axios";
import { useRouter } from "next/router";

interface FolderProps {
  type: string;
  onSave: () => void;
}

const Folder = ({ type, onSave }: FolderProps) => {
  const router = useRouter();
  const userId = router.query.id;

  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  // 폴더 축소, 확대
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState<string>("");

  const {
    treeData, // 저장된 treeData
    setTreeData, // 저장할 treeData
    editNodeByKey, // 수정 후 데이터 업데이트
    deleteNodeByKey, // 노드 삭제
    insertNodeInside, // 중첩 막기
    addNewNode, // 노드 추가
  } = useTreeData();

  const { handleDrop } = useDragDrop(treeData, setTreeData, insertNodeInside);

  const handleCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue.checked || checkedKeysValue);
  };

  // 수정, 추가, 삭제
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

  // 수정 시작 -> 노드 제목 input으로
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

  // 수정 끝 -> 제목 적용
  const handleFinishEditing = () => {
    const updatedTree = editNodeByKey(treeData, checkedKeys[0], editTitle);
    setTreeData(updatedTree);
    setIsEditing(false);
  };

  // 트리 구조 저장 (useFlattenTree.ts 에서 저장)
  const handleSave = () => {
    saveTreeData(type, treeData, onSave);
  };

  // 확장 및 축소를 위한 함수
  const handleExpand = (expandedKeysValue: any) => {
    setExpandedKeys(expandedKeysValue);
  };

  // 자식 폴더 노드로 매핑
  const mapChildrenRecursive = (children: any[] | undefined): TreeNode[] => {
    if (!children || children.length === 0) return [];

    return children.map((child) => ({
      key: String(child.id),
      title: child.title,
      isLeaf: false,
      children: mapChildrenRecursive(child.children),
    }));
  };

  // 키를 모으는 함수 -> 모두 확장시키려고
  const collectAllKeys = (nodes: TreeNode[]): string[] => {
    let keys: string[] = [];
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children && node.children.length > 0) {
        keys = [...keys, ...collectAllKeys(node.children)];
      }
    }
    return keys;
  };

  // 현 폴더 구조
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${type}/folderList`, {
        params: { userId },
      })
      .then((res) => {
        const fetchedData = res.data;

        // 폴더 데이터가 비어있으면 기본 새 폴더 하나 생성
        const dataToUse =
          fetchedData.length === 0
            ? [
                {
                  id: 0,
                  title: "새 폴더",
                  children: [],
                },
              ]
            : fetchedData;

        const nestedTreeData = dataToUse.map((item: any) => ({
          key: String(item.id),
          title: item.title,
          isLeaf: false,
          children: mapChildrenRecursive(item.children),
        }));

        setTreeData(nestedTreeData);
        setExpandedKeys(collectAllKeys(nestedTreeData));
      })
      .catch((err) => {
        console.error("폴더 데이터 로딩 실패:", err);
        // 에러 발생 시에도 새 폴더 하나는 보장
        setTreeData([
          {
            key: "0",
            title: "새 폴더",
            isLeaf: false,
            children: [],
          },
        ]);
        setExpandedKeys(["0"]);
      });
  }, [type, userId]);

  return (
    <FolderStyle
      className={`Folder_wrap ${type === "diary" ? "Folder_diaryWrap" : ""}`}
    >
      <div className="Folder_btns">
        <button className="pixelFont" onClick={() => handleEdit("add")}>
          추가
        </button>
        {isEditing ? (
          <button
            onClick={handleFinishEditing}
            className="Folder_editingBtn pixelFont"
          >
            수정 완료
          </button>
        ) : (
          <button onClick={handleStartEditing} className="pixelFont">
            수정
          </button>
        )}
        <button onClick={() => handleEdit("delete")} className="pixelFont">
          삭제
        </button>
      </div>

      <div className="Folder_componentWrap">
        <Tree
          draggable
          treeData={treeData}
          checkable
          checkStrictly
          checkedKeys={checkedKeys}
          onCheck={handleCheck}
          expandedKeys={expandedKeys}
          onExpand={handleExpand}
          titleRender={(node: TreeNode) => (
            <span className="Folder_text pixelFont">
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

      <div className="Folder_footer" onClick={handleSave}>
        <button className="Folder_submit">
          <span>⚙</span>
          <span className="pixelFont"> 폴더저장하기 </span>
        </button>
      </div>
    </FolderStyle>
  );
};

export default Folder;
