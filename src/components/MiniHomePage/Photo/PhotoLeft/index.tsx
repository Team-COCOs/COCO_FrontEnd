import { useEffect, useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axiosInstance from "@/lib/axios";

interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: TreeNode[];
}

const PhotoLeft = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [defaultExpandedKeys] = useState<string[]>(["0-0-1"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState<string>("");

  // ✅ 노드 제목 수정 (재귀)
  const editNodeByKey = (
    nodes: TreeNode[],
    key: string,
    newTitle: string
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.key === key) {
        return { ...node, title: newTitle };
      }
      if (node.children) {
        return {
          ...node,
          children: editNodeByKey(node.children, key, newTitle),
        };
      }
      return node;
    });
  };

  // ✅ 노드 삭제 (재귀)
  const deleteNodeByKey = (nodes: TreeNode[], key: string): TreeNode[] => {
    return nodes
      .filter((node) => node.key !== key)
      .map((node) => {
        if (node.children) {
          return { ...node, children: deleteNodeByKey(node.children, key) };
        }
        return node;
      });
  };

  const handleEdit = (action: string) => {
    let updatedTreeData = [...treeData];

    if (action === "add") {
      const newKey = `new-${Math.random()}`;
      const newNode: TreeNode = {
        key: newKey,
        title: "새 폴더",
        isLeaf: false,
        children: [],
      };
      updatedTreeData.push(newNode);
    } else if (action === "edit" && checkedKeys.length === 1) {
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

  const handleSave = () => {
    axiosInstance
      .post("/updateTree", treeData)
      .then((res) => {
        console.log("트리 업데이트 성공:", res.data);
      })
      .catch((e) => {
        console.log("트리 업데이트 실패:", e);
      });
  };

  const handleCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue.checked || checkedKeysValue); // checkStrictly 대응
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
    handleEdit("edit");
    setIsEditing(false);
  };

  return (
    <PhotoLeftStyled className="PhotoLeft_wrap">
      <div className="PhotoLeft_btns">
        <button onClick={() => handleEdit("add")}>추가</button>
        {isEditing ? (
          <button onClick={handleFinishEditing}>수정 완료</button>
        ) : (
          <button onClick={handleStartEditing}>수정</button>
        )}
        <button onClick={() => handleEdit("delete")}>삭제</button>
      </div>

      <div className="PhotoLeft_componentWrap">
        <Tree
          draggable
          treeData={treeData}
          defaultExpandedKeys={defaultExpandedKeys}
          checkable
          checkStrictly
          checkedKeys={checkedKeys}
          onCheck={handleCheck}
          onDrop={({ dragNode, node, dropPosition }) => {
            const updateDrop = (nodes: TreeNode[]): TreeNode[] => {
              let draggedNode: TreeNode | null = null;

              const removeNode = (nodes: TreeNode[]): TreeNode[] =>
                nodes
                  .map((n) => {
                    if (n.key === dragNode.key) {
                      draggedNode = n;
                      return null;
                    }
                    if (n.children) {
                      return { ...n, children: removeNode(n.children) };
                    }
                    return n;
                  })
                  .filter(Boolean) as TreeNode[];

              const insertNode = (nodes: TreeNode[]): TreeNode[] =>
                nodes.map((n) => {
                  if (n.key === node.key && dropPosition === 0) {
                    const children = [...(n.children || []), draggedNode!];
                    return { ...n, children };
                  }
                  if (n.children) {
                    return { ...n, children: insertNode(n.children) };
                  }
                  return n;
                });

              let updated = removeNode(nodes);
              updated = insertNode(updated);
              return updated;
            };

            const updatedTreeData = updateDrop(treeData);
            setTreeData(updatedTreeData);
          }}
        />
      </div>

      {isEditing && (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={handleTitleChange}
            placeholder="새 제목을 입력하세요"
          />
        </div>
      )}

      <button className="PhotoLeft_submit" onClick={handleSave}>
        저장
      </button>
    </PhotoLeftStyled>
  );
};

export default PhotoLeft;
