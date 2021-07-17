import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  @import "./font.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

img {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}

html,
body {
  font-family: MalgunGothic;
  height: 100%;
  margin: 0;
}
`;

export default GlobalStyles;
