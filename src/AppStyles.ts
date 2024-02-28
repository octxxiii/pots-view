// AppStyles.ts
import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContent = styled.div<{ isOpen: boolean }>`
  flex-grow: 1;
  transition: margin-left 0.3s;
  margin-left: ${({ isOpen }) => (isOpen ? "250px" : "0px")};
`;
