import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html, body {
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
  }
  ul {
    list-style-type: none;
  }
  
  #root{ height: 100vh}

  * {box-sizing: border-box}
`;
export default GlobalStyle;
