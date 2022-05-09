import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        font-family: 'Raleway', sans-serif;
        --background: linear-gradient(13deg, rgba(130,0,204,1) 0%, rgba(192,0,255,1) 100%);
        --white: rgb(255,255,255);
        --black: rgb(0,0,0);
        --purple: rgba(192,0,255,1);
        --green: #03AC00;
        --grey: #C6C6C6;
        --red: #C70000;
    }

    .root {
        height: 100vh;
        width: 100%;
    }

    body {
        height: 100vh;
        width: 100%;
    }
`;

export default GlobalStyle;