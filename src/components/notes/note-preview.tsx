import { useEffect, useRef } from "react";

export default function NotePreview({ text }: { text: string }) {
  const previewEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewEl.current || previewEl.current.shadowRoot) return;
    const shadowRoot = previewEl.current.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    div.id = "#preview-root";
    const link = document.createElement("link");
    link.href = "/quill.bubble.css";
    link.type = "stylesheet";
    const style = document.createElement("style");
    style.innerHTML = `ol, ul { padding-left: 16px; }`;
    shadowRoot.append(div, link, style);
  }, []);

  useEffect(() => {
    if (!previewEl.current || !previewEl.current.shadowRoot) return;
    const previewRoot = previewEl.current.shadowRoot.querySelector("div");
    if (!previewRoot) return;
    previewRoot.innerHTML = text;
  }, [text]);

  return <div className="" ref={previewEl}></div>;
}
