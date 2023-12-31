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

        --accentTheme: ${localStorage.getItem('defaultTheme') !== null ? localStorage.getItem('defaultTheme') : '#03fc17' };
        --accentThemeDarker: ${localStorage.getItem('defaultThemeDarker') !== null ? localStorage.getItem('defaultThemeDarker') : '#0cab31' };
        --accentThemeEvenDarker: ${localStorage.getItem('defaultThemeEvenDarker') !== null ? localStorage.getItem('defaultThemeEvenDarker') : '#07611c' };

        --baseTheme: #4a5463;
        --baseThemeDarker: #37404d;
        --baseThemeEvenDarker: #1d2229;

        --accentThemeBackup: #03fc17;
        --accentThemeDarkerBackup: #0cab31;
        --accentThemeEvenDarkerBackup: #07611c;

        --bismithRed :#F94144;
        --bismithDarkOrange :#F3722C;
        --bismithOrange :#F9844A;
        --bismithLightOrange :#F8961E;
        --bismithYellow :#F9C74F;
        --bismithGreen :#90BE6D;
        --bismithTurquoise :#43AA8B;
        --bismithSeaBlue :#4D908E;
        --bismithLightBlue :#577590;
        --bismithBlue :#277DA1;
        --bismithPurple :#4e27a1;

        ::-webkit-scrollbar, .scrollbar::-webkit-scrollbar {
          height: 5px;
          width: 8px;
        }
        ::-webkit-scrollbar-track, .scrollbar::-webkit-scrollbar-track {
            box-shadow: 0 0 5px black inset;
            background: linear-gradient(0deg, 
            rgba(0,0,0,1) 24%, 
            ${localStorage.getItem('defaultThemeEvenDarker') !== null ? localStorage.getItem('defaultThemeEvenDarker') : '#07611c' } 24%, 
            ${localStorage.getItem('defaultThemeEvenDarker') !== null ? localStorage.getItem('defaultThemeEvenDarker') : '#07611c' } 49%, 
            ${localStorage.getItem('defaultThemeDarker') !== null ? localStorage.getItem('defaultThemeDarker') : '#0cab31' } 49%, 
            ${localStorage.getItem('defaultThemeDarker') !== null ? localStorage.getItem('defaultThemeDarker') : '#0cab31' } 76%, 
            ${localStorage.getItem('defaultTheme') !== null ? localStorage.getItem('defaultTheme') : '#03fc17' } 76%);
        }
        ::-webkit-scrollbar-thumb, .scrollbar::-webkit-scrollbar-thumb {
            border: solid var(--accentTheme) 2px;
            box-shadow: 0 0 5px 0px var(--accentTheme);
            transition: 0.2s ease-in-out;
        }
    }

    p, h1, h2, h3, h4, h5, a {
        @font-face {
            font-family: "Comp";
            src: local("Comp"), url(${Comp});
            font-display: swap;
        }
    }

`