import { useState } from "react";
import { PhotoLeftStyled } from "./styled";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";

import { treeDatas } from "@/constants/photoLeftTabs";

const PhotoLeft = () => {
  const [defaultExpandedKeys] = useState(["0-0-1"]);

  return (
    <PhotoLeftStyled>
      <div className="PhotoLeft_wrap">
        <div className="PhotoLeft_componentWrap">
          <Tree
            draggable
            treeData={treeDatas}
            defaultExpandedKeys={defaultExpandedKeys}
            checkable
          />
        </div>
      </div>
      <div className="PhotoLeft_btns">
        <button>추가</button>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </PhotoLeftStyled>
  );
};

export default PhotoLeft;
