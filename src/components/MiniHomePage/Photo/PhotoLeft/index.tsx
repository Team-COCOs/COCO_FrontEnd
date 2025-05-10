import { useEffect, useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import axiosInstance from "@/lib/axios";

interface TreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  isEditing?: boolean;
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

  // ✅ 폴더의 중첩 깊이를 확인
  // 노드의 깊이를 root부터 계산
  const getNodeDepth = (
    nodes: TreeNode[],
    key: string,
    currentDepth: number = 1
  ): number | null => {
    for (const node of nodes) {
      if (node.key === key) return currentDepth;
      if (node.children) {
        const depth = getNodeDepth(node.children, key, currentDepth + 1);
        if (depth !== null) return depth;
      }
    }
    return null;
  };

  // ✅ 노드를 3단계 이상 중첩할 수 없도록 제한
  const insertNodeInside = (
    nodes: TreeNode[],
    parentKey: string,
    newNode: TreeNode
  ): TreeNode[] => {
    const parentDepth = getNodeDepth(nodes, parentKey);

    if (parentDepth && parentDepth >= 2) {
      alert("2단계 이상 중첩할 수 없습니다.");
      return nodes;
    }

    return nodes.map((n) => {
      if (n.key === parentKey) {
        return {
          ...n,
          children: [...(n.children || []), newNode],
        };
      }
      if (n.children) {
        return {
          ...n,
          children: insertNodeInside(n.children, parentKey, newNode),
        };
      }
      return n;
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
          onDrop={({ dragNode, node, dropPosition, dropToGap }) => {
            const findNodeByKey = (
              nodes: TreeNode[],
              key: string
            ): TreeNode | null => {
              for (const n of nodes) {
                if (n.key === key) return n;
                if (n.children) {
                  const found = findNodeByKey(n.children, key);
                  if (found) return found;
                }
              }
              return null;
            };

            const removeNode = (nodes: TreeNode[], key: string): TreeNode[] => {
              return nodes
                .map((n) => {
                  if (n.key === key) return null;
                  if (n.children) {
                    return { ...n, children: removeNode(n.children, key) };
                  }
                  return n;
                })
                .filter(Boolean) as TreeNode[];
            };

            const insertBeforeAfter = (
              nodes: TreeNode[],
              targetKey: string,
              newNode: TreeNode,
              before: boolean
            ): TreeNode[] => {
              const result: TreeNode[] = [];
              for (const n of nodes) {
                if (n.key === targetKey) {
                  if (before) result.push(newNode);
                  result.push(n);
                  if (!before) result.push(newNode);
                } else if (n.children) {
                  result.push({
                    ...n,
                    children: insertBeforeAfter(
                      n.children,
                      targetKey,
                      newNode,
                      before
                    ),
                  });
                } else {
                  result.push(n);
                }
              }
              return result;
            };

            const dragItem = findNodeByKey(treeData, dragNode.key);
            if (!dragItem) return;

            let updatedTree = removeNode(treeData, dragNode.key);

            let resultTree: TreeNode[] = [];

            if (!dropToGap) {
              const tempTree = insertNodeInside(
                updatedTree,
                node.key,
                dragItem
              );
              // ✅ 중첩 제한에 걸리면 alert만 띄우고 기존 트리 유지
              if (tempTree === updatedTree) return;
              resultTree = tempTree;
            } else {
              const before = dropPosition === -1;
              resultTree = insertBeforeAfter(
                updatedTree,
                node.key,
                dragItem,
                before
              );
            }

            setTreeData(resultTree);
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
