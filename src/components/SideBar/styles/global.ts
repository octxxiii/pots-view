import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
  }

  button {
    background: none;
    cursor: pointer;
    border: none;
  }

  :root {
    --primary-color: #F92672; /* Monokai 분홍색 */
    --third-color: #66D9EF; /* Monokai 청록색 */
    --primary-background: #272822; /* Monokai 배경색 */
    --second-background: #49483E; /* Monokai 창 및 패널 배경색 */
    --primary-font-color: #F8F8F2; /* Monokai 텍스트 색상 */
    --shadow-black-color: rgba(0, 0, 0, 0.38);
  }

  body, html, #root {
    width: 100%;
    height: 100%;
    position: relative;
    background: var(--primary-background);
    color: var(--primary-font-color);
  }
`;
