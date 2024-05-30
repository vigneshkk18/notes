import { useLayoutEffect, useRef, useState } from "react";
import { Notes } from "../../types/Notes";

interface INoteTitle {
  title: string | undefined;
  updateNoteData: (key: keyof Notes, value: string) => void;
}

export default function NoteTitle({ title, updateNoteData }: INoteTitle) {
  const input = useRef<HTMLHeadingElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useLayoutEffect(() => {
    if (!input.current) return;
    input.current.focus();
  }, [isEditing]);

  const startEditing = (e: any) => {
    setIsEditing(true);
    e.target.focus();
  };
  const closeEditing = () => setIsEditing(false);

  return (
    <h2
      ref={input}
      onClick={startEditing}
      onBlur={closeEditing}
      contentEditable={isEditing}
      dangerouslySetInnerHTML={{ __html: title || "Default Title" }}
      onChange={(e: any) => updateNoteData("title", e.target.value)}
      className="bg-transparent font-bold text-xl hover:bg-black/10 flex-grow cursor-text p-2 rounded outline-none border-none"
    ></h2>
  );
}
