import Dropdown from "@/components/Dropdown";
import { EditorPageStyle } from "./styled";
import {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";

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
  content?: string;
  isPublic?: string;
}

export interface EditorHandle {
  getHtml: () => string;
  setHtml?: (html: string) => void;
}

const EditorPage = forwardRef<EditorHandle, EditorPageProps>(
  ({ onVisibilityChange, content, isPublic }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [font, setFont] = useState("Gulim");

    // isPublic에 맞는 옵션 찾기
    const selectedVisibility =
      visibilityOptions.find((option) => option.id === isPublic) || null;

    // 수정 시 미리 content 넣어두기
    useEffect(() => {
      if (editorRef.current && content !== undefined && content !== null) {
        editorRef.current.innerHTML = content;
      }
    }, [content]);

    useImperativeHandle(ref, () => ({
      getHtml: () => editorRef.current?.innerHTML || "",
    }));

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

    // a 태그
    function Link() {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      // 선택 영역에 포함된 노드가 a 태그인지 확인
      let node = selection.anchorNode;
      if (node) {
        const parentAnchor = node.parentElement?.closest("a");
        if (parentAnchor) {
          // a 태그 풀기: 텍스트로 대체
          const textNode = document.createTextNode(
            parentAnchor.textContent || ""
          );
          parentAnchor.replaceWith(textNode);
          return;
        }
      }

      // 선택한 텍스트가 https 로 시작 안 하면 안되게
      if (!/^https?:\/\//.test(selectedText)) return;

      // a 태그 생성
      const a = document.createElement("a");
      a.href = selectedText;
      a.textContent = selectedText;

      // 선택된 텍스트를 링크로 대체
      range.deleteContents();
      range.insertNode(a);

      // 선택 해제
      selection.removeAllRanges();
    }

    return (
      <EditorPageStyle className="EditorPage_wrap">
        <div className="EditorPage_toolbar">
          <select className="Gulim" onChange={handleFontChange} value={font}>
            {fontList.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>

          <button
            className="EditorPage_btn"
            onClick={() => execCommand("bold")}
          >
            <span className="EditorPage_bold">가</span>
          </button>
          <button
            className="EditorPage_btn Gulim"
            onClick={() => execCommand("italic")}
          >
            <span className="EditorPage_italic">가</span>
          </button>
          <button
            className="EditorPage_btn Gulim"
            onClick={() => execCommand("underline")}
          >
            <span className="EditorPage_underline">가</span>
          </button>
          <button
            className="EditorPage_btn"
            onClick={() => execCommand("justifyLeft")}
          >
            <img src="/icon/alignLeft.png" alt="왼쪽 정렬" />
          </button>
          <button
            className="EditorPage_btn"
            onClick={() => execCommand("justifyCenter")}
          >
            <img src="/icon/alignCenter.png" alt="가운데 정렬" />
          </button>
          <button
            className="EditorPage_btn"
            onClick={() => execCommand("justifyRight")}
          >
            <img src="/icon/alignRight.png" alt="오른쪽 정렬" />
          </button>

          <button
            className="EditorPage_btn"
            onClick={() => {
              Link();
            }}
          >
            <img src="/icon/link.png" alt="링크 삽입" />
          </button>
        </div>

        <div className="EditorPage_area" ref={editorRef} contentEditable></div>

        <div className="EditorPage_isPublic">
          <p>공개설정</p>
          <Dropdown
            label="설정하기"
            publicOption={visibilityOptions}
            selected={selectedVisibility}
            onSelect={(selected) => onVisibilityChange(selected.id)}
          />
        </div>
      </EditorPageStyle>
    );
  }
);

export default EditorPage;
