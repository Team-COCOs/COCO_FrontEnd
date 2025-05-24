import { useEffect, useState } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { FolderStyle } from "./styled";
import { TreeNode } from "@/utils/Folder/types";
import { useTreeData } from "@/utils/Folder/useTreeData";
import { useDragDrop } from "@/utils/Folder/useDragDrop";
import { saveTreeData } from "@/utils/Folder/useFlattenTree";
import axios from "axios";
import { useRouter } from "next/router";
import { findNodeByKey } from "@/utils/Folder/useSearch";
import ShadowModal from "@/components/ShadowModal";
import { useModal } from "@/context/ModalContext";

interface FolderProps {
  isType: string;
  onSave: () => void;
}

const Folder = ({ isType, onSave }: FolderProps) => {
  const router = useRouter();
  const userId = router.query.id;

  const { type, isOpen, message, openModal, closeModal } = useModal();

  // 폴더 축소, 확대
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const [editTitle, setEditTitle] = useState<string>("");
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);

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

  let updatedTreeData = [...treeData];

  // 수정, 추가, 삭제
  const handleEdit = (action: string) => {
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
      console.log("삭제 버튼 눌림.");
      console.log(handleDelete);
      openModal("confirm", {
        message: "해당 폴더의 게시글이 모두 삭제됩니다. \n 삭제하시겠습니까?",
      });
    }

    setTreeData(updatedTreeData);
  };

  const handleDelete = () => {
    checkedKeys.forEach((key) => {
      const node = findNodeByKey(treeData, key);
      if (node?.title === "스크랩") {
        openModal("error", { message: "스크랩 폴더는 삭제할 수 없습니다." });
        return;
      }

      updatedTreeData = deleteNodeByKey(updatedTreeData, key);
    });

    setTreeData(updatedTreeData);

    setCheckedKeys([]);
    setEditingKey(null);
    setEditTitle("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  // 수정 시작 -> 노드 제목 input으로
  const handleStartEditing = () => {
    const node = findNodeByKey(treeData, checkedKeys[0]);
    if (node?.title === "스크랩") {
      openModal("error", { message: "스크랩 폴더는 수정할 수 없습니다." });
      return;
    }

    if (checkedKeys.length === 1 && checkedKeys[0] !== editingKey) {
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
        setEditingKey(checkedKeys[0]);
        setEditTitle(title);
      }
    }
  };

  // 수정 끝 -> 제목 적용
  const handleFinishEditing = () => {
    if (editTitle.trim() === "스크랩") {
      openModal("error", {
        message: "폴더 이름을 '스크랩'으로 지정할 수 없습니다.",
      });
      return;
    }

    const updatedTree = editNodeByKey(treeData, checkedKeys[0], editTitle);
    setTreeData(updatedTree);

    setEditTitle("");
    setEditingKey(null);
    setCheckedKeys([]);
  };

  // 트리 구조 저장 (useFlattenTree.ts 에서 저장)
  const handleSave = () => {
    saveTreeData(isType, treeData, onSave, router, userId, openModal);
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
    if (!userId) {
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${isType}/folderList`, {
        params: { userId },
      })
      .then((res) => {
        const fetchedData = res.data;

        console.log(res.data);

        const nestedTreeData = fetchedData.map((item: any) => ({
          key: String(item.id),
          title: item.title,
          isLeaf: false,
          children: mapChildrenRecursive(item.children),
        }));

        setTreeData(nestedTreeData);
        setExpandedKeys(collectAllKeys(nestedTreeData));
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          openModal("error", {
            message: "로그인이 필요합니다.",
          });
        }

        console.log("폴더 데이터 로딩 실패:", e);
      });
  }, [isType, userId]);

  return (
    <FolderStyle
      className={`Folder_wrap ${isType === "diary" ? "Folder_diaryWrap" : ""}`}
    >
      <div className="Folder_btns">
        <button className="pixelFont" onClick={() => handleEdit("add")}>
          추가
        </button>
        {editingKey ? (
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
          draggable={(node) => node.title !== "스크랩"}
          treeData={treeData}
          checkable
          checkStrictly
          checkedKeys={checkedKeys}
          onCheck={handleCheck}
          expandedKeys={expandedKeys}
          onExpand={handleExpand}
          titleRender={(node: TreeNode) => (
            <span className="Folder_text pixelFont">
              {editingKey === node.key ? (
                <input
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

      <ShadowModal
        type={type}
        isOpen={isOpen}
        onClose={() => {
          closeModal();

          if (message === "로그인이 필요합니다.") {
            window.location.reload();
          }
        }}
        message={message}
        onConfirm={handleDelete}
      />
    </FolderStyle>
  );
};

export default Folder;
