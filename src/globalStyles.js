import { createGlobalStyle } from "styled-components";

import Comp from './CodygoonRegular-oweO0.ttf'

export const Global = createGlobalStyle`

    :root {
        --baseColor: #211452;
        --60: #211452;
        --darkBlue: #211452;

        --grayBlue: #3B3060;

        --mediumBlue: #5325F8;
        --30: #5325F8;
        --containerColor: #5325F8;

        --blue: #82b9d1;
        --darkerBlue: #54a7cc;
        --evenDarkerBlue: #2b89b3;

        --brightBlue: #9ED0E6;
        --10blue: #9ED0E6;

        --veryLightBlue: #d4eefa;
        --whiteBlue: #d4eefa;

        --darkerTeal: #1ba677;
        --evenDarkerTeal: #12875f;

        --purple: #6637E6;
        --10purple: #6637E6;

        --accent: #FFCEAD;

        --accentRed: #F3562B;
        --emergency: #F3562B;
        --alert: #F3562B;

        --white: #fff;
        --black: #000;

        --tpurple: #6655A6;

        --darkpurple: #3B3060;

        --lightPurple: #a188fb;


        --fsVeryLight: #F3C9B9;
        --fsLight: #F59595;
        --fsModerate: #F26161;
        --fsLarge: #F24444;
        --fsVeryLarge: #910303;

        //newtheme colors:

        --accentTheme: #03fc17;
        --accentThemeDarker: #0cab31;
        --accentThemeEvenDarker: #07611c;

        --baseTheme: #4a5463;
        --baseThemeDarker: #37404d;
        --baseThemeEvenDarker: #1d2229;
    }

    p, h1, h2, h3, h4, h5, a {
        @font-face {
            font-family: "Comp";
            src: local("Comp"), url(${Comp});
        }
    }

`