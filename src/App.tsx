import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./components/SideBar/styles/global";
import { SideBar } from "./components/SideBar";
import DnaView from "./components/DNAView";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main<{ isOpen: boolean }>`
  flex-grow: 1;
  transition: margin-left 0.3s ease;
  margin-left: ${({ isOpen }) =>
    isOpen
      ? "250px"
      : "60px"}; // 사이드바가 열린 상태와 닫힌 상태의 너비에 따라 조정
`;

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <Layout>
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <Main isOpen={isSidebarOpen}>
          <Routes>
            <Route path="/dna-view" element={<DnaView isOpen={false} />} />
            <Route path="/api-sequence" element={<DnaView isOpen={false} />} />
            <Route
              path="/sandbox-status"
              element={<DnaView isOpen={false} />}
            />
            <Route
              path="/analysis-progress"
              element={<DnaView isOpen={false} />}
            />
            <Route
              path="/sandbox-results"
              element={<DnaView isOpen={false} />}
            />
            <Route path="/taget-3dview" element={<DnaView isOpen={false} />} />
            <Route
              path="/patterns-3dview"
              element={<DnaView isOpen={false} />}
            />
            <Route
              path="/related-3dview"
              element={<DnaView isOpen={false} />}
            />
          </Routes>
        </Main>
      </Layout>
    </Router>
  );
}
