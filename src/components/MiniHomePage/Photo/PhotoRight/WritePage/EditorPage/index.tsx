import Dropdown from "@/components/Dropdown";
import { EditorPageStyle } from "./styled";
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

interface EditorPageProps {
  onVisibilityChange: (newVisibility: string) => void;
}

export interface EditorHandle {
  getHtml: () => string;
}

const EditorPage = forwardRef<EditorHandle, EditorPageProps>(
  ({ onVisibilityChange }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [font, setFont] = useState("Gulim");

    const execCommand = (command: string, value?: string) => {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand(command, false, value);
      editorRef.current?.focus();
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

      editorRef.current?.focus();
    };

    useImperativeHandle(ref, () => ({
      getHtml: () => editorRef.current?.innerHTML || "",
    }));

    return (
      <EditorPageStyle className="EditorPage_wrap Gulim">
        <div className="EditorPage_toolbar">
          <select onChange={handleFontChange} value={font}>
            {fontList.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>

          <button onClick={() => execCommand("bold")}>굵게</button>
          <button onClick={() => execCommand("italic")}>기울임</button>
          <button onClick={() => execCommand("underline")}>밑줄</button>
          <button onClick={() => execCommand("justifyLeft")}>왼쪽</button>
          <button onClick={() => execCommand("justifyCenter")}>가운데</button>
          <button onClick={() => execCommand("justifyRight")}>오른쪽</button>
        </div>

        <div className="EditorPage_area" ref={editorRef} contentEditable></div>

        <div className="EditorPage_isPublic">
          <p>공개설정</p>
          <Dropdown
            label="설정하기"
            publicOption={visibilityOptions}
            onSelect={(selected) => onVisibilityChange(selected.id)}
          />
        </div>
      </EditorPageStyle>
    );
  }
);

export default EditorPage;
