import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Notes } from "../../types/Notes";

interface INoteText {
  open: boolean;
  text: string | undefined;
  updateNoteData: (key: keyof Notes, value: string) => void;
}

const toolbarOptions = [
  ["bold", "italic", "underline", "strike", "blockquote", "link"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"], // remove formatting button
];

export default function NoteText({ open, text, updateNoteData }: INoteText) {
  const onNoteTextChange: ReactQuill.ReactQuillProps["onChange"] = (value) => {
    updateNoteData("text", value);
  };

  if (!open) return null;

  return (
    <div id="note-text-wrapper">
      <ReactQuill
        bounds="#note-text-wrapper"
        modules={{
          toolbar: toolbarOptions,
        }}
        className="min-h-56 max-h-96 overflow-y-auto"
        theme="bubble"
        defaultValue={text}
        onChange={onNoteTextChange}
      />
    </div>
  );
}
