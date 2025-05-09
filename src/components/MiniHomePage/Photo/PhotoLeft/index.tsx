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
            const getDepth = (
              nodes: TreeNode[],
              key: string,
              depth = 0
            ): number => {
              for (const n of nodes) {
                if (n.key === key) return depth;
                if (n.children) {
                  const d = getDepth(n.children, key, depth + 1);
                  if (d !== -1) return d;
                }
              }
              return -1;
            };

            const copyTree = (nodes: TreeNode[]): TreeNode[] =>
              nodes.map((n) => ({
                ...n,
                children: n.children ? copyTree(n.children) : undefined,
              }));

            const newTree = copyTree(treeData);
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

            const insertNode = (
              nodes: TreeNode[],
              targetKey: string,
              mode: "inside" | "before" | "after"
            ): TreeNode[] => {
              return nodes.map((n) => {
                if (n.key === targetKey) {
                  if (mode === "inside") {
                    const depth = getDepth(newTree, targetKey);
                    if (depth >= 1) {
                      alert("폴더 안에 폴더 안에 폴더는 허용되지 않습니다.");
                      throw new Error("중첩 제한");
                    }
                    return {
                      ...n,
                      children: [...(n.children || []), draggedNode!],
                    };
                  }
                }

                if (n.children) {
                  return {
                    ...n,
                    children: insertNode(n.children, targetKey, mode),
                  };
                }

                return n;
              });
            };

            const insertBeforeAfter = (nodes: TreeNode[]): TreeNode[] => {
              const result: TreeNode[] = [];

              for (const n of nodes) {
                if (n.key === node.key) {
                  if (dropPosition === -1) result.push(draggedNode!);
                  result.push(n);
                  if (dropPosition === 1) result.push(draggedNode!);
                } else if (n.children) {
                  result.push({
                    ...n,
                    children: insertBeforeAfter(n.children),
                  });
                } else {
                  result.push(n);
                }
              }

              return result;
            };

            try {
              let updated = removeNode(newTree);

              if (dropPosition === 0) {
                // 폴더 안에 넣는 경우
                updated = insertNode(updated, node.key, "inside");
              } else {
                // 위/아래에 넣는 경우
                updated = insertBeforeAfter(updated);
              }

              setTreeData(updated);
            } catch (e) {
              // 오류 무시
            }
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
