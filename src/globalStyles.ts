import { createGlobalStyle } from "styled-components";
import resetCSS from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${resetCSS}

    html,
    body,
    #root {
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
