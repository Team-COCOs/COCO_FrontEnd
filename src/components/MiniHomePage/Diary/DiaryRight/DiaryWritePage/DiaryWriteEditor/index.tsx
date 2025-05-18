import { DiaryWriteEditorStyle } from "./styled";
import { forwardRef } from "react";
import DiaryEditorPage from "./DiaryEditorPage";
import { DiaryEditorHandle } from "../../DiaryWritePage";

interface EditorPageProps {
  onVisibilityChange: (newVisibility: string) => void;
}

const DiaryWriteEditor = forwardRef<DiaryEditorHandle, EditorPageProps>(
  (props, ref) => {
    const { onVisibilityChange } = props;

    return (
      <DiaryWriteEditorStyle className="WritePage_wrap">
        <DiaryEditorPage ref={ref} onVisibilityChange={onVisibilityChange} />
      </DiaryWriteEditorStyle>
    );
  }
);

export default DiaryWriteEditor;
