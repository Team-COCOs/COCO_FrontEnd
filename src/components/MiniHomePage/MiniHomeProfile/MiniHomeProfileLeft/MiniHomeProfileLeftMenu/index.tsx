// MiniHomeProfileLeftMenu.tsx
import React from "react";
import { MiniHomeProfileLeftMenuStyled } from "./styled";

const MiniHomeProfileLeftMenu = ({
  menuData,
  language = "ko", // 기본값을 "ko"로 설정
  onMenuSelect,
}: {
  menuData: any;
  language?: string;
  onMenuSelect: (menu: { type?: string; title: string }) => void;
}) => {
  const selectedMenuData = menuData[language] || menuData.ko;

  const renderMenuItem = (menu: any) => {
    const hasChildren = menu.children && menu.children.length > 0;

    return (
      <li key={menu.title} className={hasChildren ? "has-children" : ""}>
        <span className="dot-symbol">◉</span>
        {menu.title}
        {hasChildren && (
          <ul>
            {menu.children.map((child: any) => (
              <div
                className="MiniHomeProfileLeftMenu_dotted_wrap"
                key={child.title}
                onClick={() => onMenuSelect(child)}
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
    <MiniHomeProfileLeftMenuStyled>
      <div className="MiniHomeProfileLeftMenu">
        <ul>
          {/* 조건에 따라 메뉴 항목들 렌더링 */}
          {Object.values(selectedMenuData).map((item: any) => {
            if (item.title && item.children) {
              return renderMenuItem(item);
            }
            return (
              <li key={item} onClick={() => onMenuSelect({ title: item })}>
                <span className="dot-symbol">◉</span>
                <span className="MiniHomeProfileLeftMenu_menu_cursor">
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </MiniHomeProfileLeftMenuStyled>
  );
};

export default MiniHomeProfileLeftMenu;
