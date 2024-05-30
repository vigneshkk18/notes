import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import Theme from "./context/theme-ctx.tsx";
import NotesContext from "./context/notes-ctx.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <NotesContext>
        <App />
      </NotesContext>
    </Theme>
  </React.StrictMode>
);
