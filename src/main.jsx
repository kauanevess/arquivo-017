
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Caso001 from "./pages/Caso001";
import Caso002 from "./pages/Caso002";
import Caso003 from "./pages/Caso003";
import Caso004 from "./pages/Caso004";
import Caso005 from "./pages/Caso005";
import Caso006 from "./pages/Caso006";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/caso-001" element={<Caso001 />} />
        <Route path="/caso-002" element={<Caso002 />} />
        <Route path="/caso-003" element={<Caso003 />} />
        <Route path="/caso-004" element={<Caso004 />} />
        <Route path="/caso-005" element={<Caso005 />} />
        <Route path="/caso-006" element={<Caso006 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
