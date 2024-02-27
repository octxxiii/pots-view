import React from "react";
import { GlobalStyle } from "./components/SideBar/styles/global";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import DnaView from "./components/DNAView"; // DnaView 컴포넌트 임포트

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <SideBar />
      <Routes>
        <Route path="/" element={<DnaView />} />
      </Routes>
    </Router>
  );
}
