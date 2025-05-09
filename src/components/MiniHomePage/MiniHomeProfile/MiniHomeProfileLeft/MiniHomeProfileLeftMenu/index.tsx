// MiniHomeProfileLeftMenu.tsx
import React from "react";
import { MiniHomeProfileLeftMenuStyled } from "./styled";

const MiniHomeProfileLeftMenu = ({
  menuData,
  language = "ko", // 기본값을 "ko"로 설정
}: {
  menuData: any;
  language?: string;
}) => {
  const selectedMenuData = menuData[language] || menuData.ko;

  const renderMenuItem = (menu: any) => {
    const hasChildren = menu.children && menu.children.length > 0;

    return (
      <li
        key={menu.title}
        className={hasChildren ? "has-children" : "none-children"}
      >
        {menu.title}
        {hasChildren && (
          <ul>
            {menu.children.map((child: any) => (
              <li key={child.title}>{child.title}</li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <MiniHomeProfileLeftMenuStyled>
      <div className="MiniHomeProfileLeftMenu">
        <ul>
          {/* 조건에 따라 메뉴 항목들 렌더링 */}
          {Object.values(selectedMenuData).map((item: any) => {
            if (item.title && item.children) {
              return renderMenuItem(item);
            }
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </MiniHomeProfileLeftMenuStyled>
  );
};

export default MiniHomeProfileLeftMenu;
