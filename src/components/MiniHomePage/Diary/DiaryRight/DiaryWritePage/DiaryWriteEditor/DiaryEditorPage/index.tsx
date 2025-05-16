import Dropdown from "@/components/Dropdown";
import { DiaryEditorPageStyle } from "./styled";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";

const fontList = [
  { name: "굴림", value: "Gulim" },
  { name: "돋움", value: "Dotum" },
  { name: "바탕", value: "Batang" },
  { name: "궁서", value: "Gungseo" },
  { name: "Neo둥근모", value: "NeoDunggeunmo" },
  { name: "Gamja Flower", value: "Gamja Flower" },
  { name: "Cal Sans", value: "Cal Sans" },
];

const visibilityOptions = [
  { id: "public", title: "공개" },
  { id: "private", title: "비공개" },
  { id: "friends", title: "일촌공개" },
];

export interface DiaryEditorHandle {
  getHtml: () => string;
}

const DiaryEditorPage = () => {
  const DiaryEditorRef = useRef<HTMLDivElement>(null);
  const [font, setFont] = useState("Gulim");

  const execCommand = (command: string, value?: string) => {
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand(command, false, value);
    DiaryEditorRef.current?.focus();
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    setFont(selectedFont);

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    document.execCommand("styleWithCSS", false, "true");
    document.execCommand("fontName", false, selectedFont);

    // 스타일 덮어씌우기 (강제 적용)
    const span = document.createElement("span");
    span.style.fontFamily = selectedFont;

    if (range.collapsed) {
      span.textContent = "\u200b"; // zero-width space
      range.insertNode(span);
      range.setStartAfter(span);
      range.setEndAfter(span);
    } else {
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }

    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    selection.addRange(newRange);

    DiaryEditorRef.current?.focus();
  };

  // useImperativeHandle(ref, () => ({
  //   getHtml: () => DiaryEditorRef.current?.innerHTML || "",
  // }));

  return (
    <DiaryEditorPageStyle className="DiaryEditorPage_wrap">
      <div className="DiaryEditorPage_toolbar">
        <select className="Gulim" onChange={handleFontChange} value={font}>
          {fontList.map((font) => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>

        <button
          className="DiaryEditorPage_btn"
          onClick={() => execCommand("bold")}
        >
          <span className="DiaryEditorPage_bold">가</span>
        </button>
        <button
          className="DiaryEditorPage_btn Gulim"
          onClick={() => execCommand("italic")}
        >
          <span className="DiaryEditorPage_italic">가</span>
        </button>
        <button
          className="DiaryEditorPage_btn Gulim"
          onClick={() => execCommand("underline")}
        >
          <span className="DiaryEditorPage_underline">가</span>
        </button>
        <button
          className="DiaryEditorPage_btn"
          onClick={() => execCommand("justifyLeft")}
        >
          <img src="/icon/alignLeft.png" alt="왼쪽 정렬" />
        </button>
        <button
          className="DiaryEditorPage_btn"
          onClick={() => execCommand("justifyCenter")}
        >
          <img src="/icon/alignCenter.png" alt="가운데 정렬" />
        </button>
        <button
          className="DiaryEditorPage_btn"
          onClick={() => execCommand("justifyRight")}
        >
          <img src="/icon/alignRight.png" alt="오른쪽 정렬" />
        </button>
      </div>

      <div
        className="DiaryEditorPage_area"
        ref={DiaryEditorRef}
        contentEditable
      ></div>

      <div className="DiaryEditorPage_isPublic">
        <p>공개설정</p>
        <Dropdown
          label="설정하기"
          publicOption={visibilityOptions}
          // onSelect={(selected) => onVisibilityChange(selected.id)}
        />
      </div>
    </DiaryEditorPageStyle>
  );
};

export default DiaryEditorPage;
