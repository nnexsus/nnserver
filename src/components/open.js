import styled from 'styled-components';
import { useRef } from 'react';

const Wrapper = styled.div`

width: 100%;
    aspect-ratio: 2/1;
    margin-bottom: 100px;

    background-position: center;
    background-size: cover;
    border: solid var(--accentTheme) 2px;

    background-image: url('/images/sky1.webp');
    background-size: 100%;
    background-origin: content-box; 
    background-position-x: center; 
    background-position-y: center; 
    overflow-x: clip;
    overflow-y: scroll;
    direction: rtl;

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        padding: 2px;
        box-shadow: 0 0 5px black inset;
        border-radius: 15px;
        background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 15%, var(--accentTheme) 100%);
    }
    ::-webkit-scrollbar-thumb {
        outline: black solid 2px;
        background-color: rgba(200, 200, 200, 0.2); 
        border-radius: 10px;
        border: solid white 2px;
        transition: 0.2s ease-in-out;
        :hover {
            background-color: rgba(200, 200, 200, 0.6);
        }
    }

    div, h2 {
        direction: ltr;
    }

    h1 {
        text-align: center;
        font-size: 86px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 6px;
        color: white;
        font-family: monospace;
        -webkit-text-stroke: 1px;
        -webkit-text-stroke-color: white;
        -webkit-text-fill-color: var(--accentTheme);
        text-shadow: 0px 0px 5px black;
        cursor: pointer;
        margin-top: 0px;
        margin-bottom: 5px;
    }

    sub {
        transform: translate(100px, -55px);
        color: white;
        pointer-events: none;
    }

    .planet {
        margin: -5px;
        border: solid 0px rgba(0, 0, 0, 0.0);
        border-radius: 50%;
        rotate: 0deg;

        display: flex;

        transition: 0.7s ease;

        ::before {
            display: none;
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 10%; 
            padding: 0px; 
            background: linear-gradient(45deg,rgba(0,0,0,0),rgba(0,0,0,0));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            scale: 0.1;
            opacity: 0;
            transition: all 1s ease-in-out;
        }

        .sat-box {
            opacity: 0;
            transition: 0.5s ease-in-out;
            color: white;
            font-family: monospace;
            text-shadow: 0 0 3px white;
            border: solid 1px var(--accentTheme);
            border-radius: 50px;
            backdrop-filter: blur(10px) brightness(1.5);
            margin-top: -160px;
            padding: 26px 34px;
            text-align: center;
            max-width: min-content;
            text-decoration-line: none;
        }

        :hover {
            border: solid 10px #b5a270;
            //border-image-source: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 15%, rgba(207,115,255,1) 100%);
            //border-style: solid;
            //border-width: 10px;
            //border-image-slice: 1;

            position: relative;

            ::before {
                display: block;
                content: "";
                position: absolute;
                inset: 0;
                border-radius: 50%; 
                padding: 5px; 
                background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 15%, rgba(207,115,255,1) 100%);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                scale: 0.65;
                opacity: 1;
            }

            .sat-box {
                opacity: 1;
            }
        }
    }

    .moon {
        filter: drop-shadow(25px 10px 100px #fff);
        :hover {
            animation: moonBlur 1s ease;
            scale: 1.5;
        }
        @keyframes moonBlur {
            0% {
                filter: blur(0px) drop-shadow(25px 10px 100px #fff);
            } 25% {
                filter: blur(2px) drop-shadow(0px 0px 10px #fff);
            } 100% {
                filter: blur(0px) drop-shadow(25px 10px 100px #fff);
            }
        }
        animation: moon-float 10s 1s infinite;
        @keyframes moon-float {
            0% {
                translate: 0 0px;
            }
            50% {
                translate: 0 15px;
            }
            100% {
                translate: 0 0px;
            }
        }
    }

    .planet1 {
        filter: drop-shadow(25px 10px 20px #8dc794);
        :hover {
            animation: planet1Blur 0.6s ease;
            scale: 1.25;
            rotate: 3deg;
            padding: 10px;
        }
        @keyframes planet1Blur {
            0% {
                filter: blur(0px) drop-shadow(25px 10px 20px #8dc794);
            } 25% {
                filter: blur(2px) drop-shadow(25px 10px 20px #8dc794);
            } 75% {
                filter: blur(1px) drop-shadow(25px 10px 20px #8dc794);
            } 100% {
                filter: blur(0px) drop-shadow(25px 10px 20px #8dc794);
            }
        }
        animation: planet1-float 4.5s 1s infinite;
        @keyframes planet1-float {
            0% {
                translate: 0 0px;
            }
            50% {
                translate: 0 5px;
            }
            100% {
                translate: 0 0px;
            }
        }
    }

    .planet2 {
        filter: drop-shadow(25px 10px 20px #e39696);
        :hover {
            animation: planet2Blur 0.6s ease;
            scale: 1.25;
            rotate: -3deg;
            padding: 10px;
        }
        @keyframes planet2Blur {
            0% {
                filter: blur(0px) drop-shadow(25px 10px 20px #e39696);
            } 25% {
                filter: blur(2px) drop-shadow(25px 10px 20px #e39696);
            } 75% {
                filter: blur(1px) drop-shadow(25px 10px 20px #e39696);
            } 100% {
                filter: blur(0px) drop-shadow(25px 10px 20px #e39696);
            }
        }
        animation: planet2-float 25s 1s infinite;
        @keyframes planet2-float {
            0% {
                translate: 0 0px;
            }
            50% {
                translate: 0 25px;
            }
            100% {
                translate: 0 0px;
            }
        }
    }

    .planet-container {
        opacity: 0.85;
        transition: 1.3s ease;
        :hover {
            opacity: 1;
        }
    }

    .info-container {
        opacity: 0;
        transition: 0.5s ease;
        color: white; 
        font-family: monospace;
        text-shadow: 0 0 7px black; 
        text-align: center; 
        margin: -30% auto 0px auto; 
        background-color: rgba(0, 0, 0, 0.8); 
        border-radius: 2px; 
        cursor: default;
        filter: blur(10px);

        background-size: cover; 
        padding: 10px 0 14px 0; 
        background-origin: border-box; 
        z-index: 4; 
        margin-top: -40%; 
        width: 90%;

        --aug-border-all: 3px;
        --aug-border-bg: rgba(0, 0, 0, 0.3);
        --aug-inlay-bg: rgba(255, 255, 255, 0.1);
        --aug-inlay-all: 5px;
    }

    .planet:hover + .info-container {
        opacity: 0.75;
        filter: blur(0px);
    }
    .alink {
        border: solid 0.01px rgba(0, 0, 0, 0.0); 

        :hover {
            border: solid 0.1px rgba(0, 0, 0, 0.0); //this is vital, without it the openers integrity collapses, do NOT remove
        }
    }
    .moon-container {
        grid-column: 2;
        grid-row: 4;
    }
    .planet-grid {
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        grid-template-rows: 20px 30% 80px repeat(3, 30%) 80px repeat(4, 30%);
    }
    .links {
        margin: 0px 50px;
        grid-column: span 3; 
        grid-row: 1; 
        display: grid;
        grid-template-columns: repeat(5, 20%);
        grid-template-rows: 100%;
        filter: drop-shadow(0 0 5px white);
        z-index: 9;

        div:nth-child(even) {
            animation: link-float 10s 1s infinite;
        }
        div:nth-child(odd) {
            animation: link-float 10s 6s infinite;
        }
        @keyframes link-float {
            0% {
                translate: 0 0px;
            }
            50% {
                translate: 0 8px;
            }
            100% {
                translate: 0 0px;
            }
        }
    }
    .earthdecor {
        grid-row: 6; 
        grid-column: span 3;
        margin-left: -25px;
    }
    .game {
        grid-column: 3;
        grid-row: 3;
    }
    .geo {
        transform: scale(1.2) translate(0, 23%);
    }
    .web {
        grid-column: 1;
        grid-row: 3;
    }
    .title-link {
        color: white;
        text-decoration: none;
        :active {
            color: lightblue;
        }
    }
    .mobile-banner {
        display: none;
    }
    .desktop-banner {
        transform: translateY(140px);
        text-shadow: 0 0 6px black;
        backdrop-filter: blur(5px);
        border-radius: 25px;
        border: solid 1px white;
        width: max-content;
        margin: 0 auto;
        padding: 5px 10px;
        margin-top: -140px;
    }
    .geo-alone {
        position: absolute; 
        background-image: url('/images/opener/sky2.webp');
        width: 100%; 
        height: 100%;
        background-position: center;
        background-size: 100%;
        top: -11%;
        left: 1.5%;
        background-repeat: no-repeat;
        pointer-events: none;
    }
    .opac {
        opacity: 0.4;
        transition: 0.3s ease;

        :hover {
            opacity: 1;
        }
    }
    a {
        color: var(--accentTheme);
        text-shadow: 0px 0px 3px white;
        :active {
            color: var(--accentThemeDarker);
        }
        :visited {
            color: var(--accentThemeEvenDarker);
        }
    }
    @media screen and (max-width: 1550px) {
        .planet-grid {
            grid-template-rows: 20px 30% 80px repeat(3, 30%) repeat(4, 10%);
        }
    }

    @media screen and (max-width: 1000px) {

        ul {
            display: none;
        }
    }

    @media screen and (max-width: 750px) {
        aspect-ratio: 1/1.1;
        background-size: 200%;
        background-position-y: -60px;
        padding-top: 5px;
        overflow-y: hidden;
        overflow-x: scroll;
        .planet-grid {
            scroll-behavior: smooth;
            overflow-x: scroll;
            overflow-y: hidden;
            padding-bottom: 20px;
            padding-top: 100px;
            grid-template-columns: repeat(4, 100%);
            grid-template-rows: repeat(1, 110vh);
        }
        .moon-container {
            grid-column: 1;
            grid-row: 1;
        }
        .web {
            grid-column: 2;
            grid-row: 1;
        }
        .game {
            grid-column: 3;
            grid-row: 1;
        }
        .links {
            grid-column: 4;
            grid-row: 1;
        }
        .earthdecor {
            display: none;
        }
        .info-container {
            opacity: 0.75;
            filter: blur(0px);
            margin-top: -50%; 
        }
        .mobile-banner {
            display: block;
        }
        .desktop-banner {
            display: none;
        }
    }

    .para-img {
        position: absolute;
    }

    #scroll-title {
        height: 100%;
        text-align: center;
        
        -moz-transform: translateY(0%);
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
        
        -moz-animation: scrolltitle 3s ease-in-out 1;
        -webkit-animation: scrolltitle 3s ease-in-out 1;
        animation: scrolltitle 3s ease-in-out 1;
    }

    @keyframes scrolltitle {
    from {
        -moz-transform: translateY(-100%);
        -webkit-transform: translateY(-100%);
        transform: translateY(-100%);
    }
    to {
        -moz-transform: translateY(0%);
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
        }
    }

    #scroll-text {
        height: 100%;
        text-align: center;
        
        -moz-transform: translateY(0%);
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
        opacity: 0;
        
        -moz-animation: scrolltext 5s ease-in-out 3s 1 forwards;
        -webkit-animation: scrolltext 5s ease-in-out 3s 1 forwards;
        animation: scrolltext 5s ease-in-out 3s 1 forwards;
    }

    @keyframes scrolltext {
    0% {
        -moz-transform: translateY(-450%);
        -webkit-transform: translateY(-450%);
        transform: translateY(-450%);
        opacity: 0;
    }
    100% {
        -moz-transform: translateY(0%);
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
        opacity: 1;
        }
    }
`;

const Open = () => {

    document.addEventListener("mousemove", div);
    const opener = useRef(null)
    const bgopener = useRef(null)
    const foreopener = useRef(null)
    const fore2opener = useRef(null)
    const fore3opener = useRef(null)

    function div(e) {
        if (window.innerWidth > 1000) {
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            let scroll = `translate(${((mouseX * 0.02) - 18) * -1}px, ${(mouseY * 0.01) - 20}px)`;
            let scrollBg = `${(mouseX * 0.02) - 25}px ${((mouseY * 0.01) + 60) * -1}px`;
            let scrollForeground = `translate(${(mouseX * 0.03) - 18}px, ${((mouseY * 0.02)) * -1}px)`;
            let linkScroll = `translate(${(mouseX * 0.035) - 18}px, ${((mouseY * 0.025)) * -1}px)`;
            let scrollGeo = `translate(${((mouseX * 0.005) + 8) * -1}px, ${(mouseY * 0.001) - 6}px)`;
            opener.current.style.transform = scroll;
            bgopener.current.style.backgroundPosition = scrollBg;
            foreopener.current.style.transform = scrollForeground;
            fore2opener.current.style.transform = scrollForeground;
            fore3opener.current.style.transform = linkScroll;
        }
    }

    const consoleWarn = console.warn;
    const SUPPRESSED_WARNINGS = ['Uncaught TypeError:'];

    console.warn = function filterWarnings(msg, ...args) {
        if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
            consoleWarn(msg, ...args);
        }
    };

    return (
        <Wrapper id='opener-grab' ref={(el) => {bgopener.current = el}}>
            <div ref={(el) => {opener.current = el}} id="opener">
                <div style={{width: '100%', background: 'var(--accentTheme)'}}><h4 style={{margin: 0}}>Come visit my main site!!</h4></div>
                <div className='planet-grid'>
                        <div className='satlinks' style={{gridColumn: 'span 5'}}>
                            <a style={{textDecoration: "none"}} href='https://nnexsus.net/'>
                                <h1 style={{height: '120px', fontFamily: 'Comp', filter: 'drop-shadow(0 0 5px var(--accentTheme))', display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
                                    nnexsus.net
                                </h1>
                            </a>
                        </div>
                        <div id='socials' ref={(el) => {fore3opener.current = el}} className="links">
                            <div style={{width: "100%", aspectRatio: '1/1', marginTop: "-30px"}}>
                                <a title='Twitter Link' className="planet alink opac" target={"_blank"} rel="noreferrer" href='https://twitter.com/_nnexsus'><img loading='lazy' alt='decor' className="planet" width={"100%"} height={'100%'} style={{transform: "scale(0.5)", aspectRatio: '1/1'}} src={'/images/opener/twitter-sat.webp'}/></a>
                            </div>
                            <div style={{width: "100%", aspectRatio: '1/1', marginTop: "-30px"}}>
                                <a title='Youtube Link' className="planet alink opac" target={"_blank"} rel="noreferrer" href='https://youtube.com/c/nnexsus'><img loading='lazy' alt='decor' className="planet" width={"100%"} height={'100%'} style={{transform: "scale(0.5)", aspectRatio: '1/1'}} src={'/images/opener/youtube-sat.webp'}/></a>
                            </div>
                            <div style={{width: "100%", aspectRatio: '1/1', marginTop: "-30px"}}>
                                <a title='Trello Link' className="planet alink opac" target={"_blank"} rel="noreferrer" href='https://trello.com/b/WjQkpKpc/2023'><img loading='lazy' alt='decor' className="planet" width={"100%"} height={'100%'} style={{transform: "scale(0.5)", aspectRatio: '1/1'}} src={'/images/opener/trello-sat.webp'}/></a>
                            </div>
                            <div style={{width: "100%", aspectRatio: '1/1', marginTop: "-30px"}}>
                                <a title='Github Link' className="planet alink opac" target={"_blank"} rel="noreferrer" href='https://github.com/nnexsus'><img loading='lazy' alt='decor' className="planet" width={"100%"} height={'100%'} style={{transform: "scale(0.5)", aspectRatio: '1/1'}} src={'/images/opener/github-sat.webp'}/></a>
                            </div>
                            <div style={{width: "100%", aspectRatio: '1/1', marginTop: "-30px"}}>
                                <a title='Discord Link' className="planet alink opac" target={"_blank"} rel="noreferrer" href='https://discord.gg/d8R2tDaBK2'><img loading='lazy' alt='decor' className="planet" width={"100%"} height={'100%'} style={{transform: "scale(0.5)", aspectRatio: '1/1'}} src={'/images/opener/discord-sat.webp'}/></a>
                            </div>
                        </div>
                        <div id='moon' className="moon-container">
                            <div style={{width: "100%", height: "0px", marginTop: "-13px", gridColumn: "2"}}>
                                <img loading='lazy' alt='decor' width={"100%"} className='geo' src={'/images/opener/geo.webp'} style={{transform: "translate(-1px, -25px", aspectRatio: '1/1'}}/>
                            </div>
                            <div style={{width: "100%", height: "0px", marginTop: "-13px", gridColumn: "2"}}>
                                <a className="planet alink" href='https://nnexsus.net/'><img loading='lazy' alt='decor' className="planet moon" width={"100%"} style={{transform: "scale(0.5) rotate(254deg)", aspectRatio: '1/1'}} src={'/images/opener/moon2.webp'}/></a>
                                <div style={{backgroundImage: `url(/images/opener/solarbg.webp)`}} data-augmented-ui="tl-2-clip-xy t-clip tr-2-clip-xy r-clip br-2-clip-xy b-clip bl-2-clip-xy l-clip both" className='info-container'>
                                    <a className='title-link' href='https://nnexsus.net/'><h2>Click to travel.</h2></a>
                                    <h3>nnexsus</h3>
                                    <h4>Explore the full site.</h4>
                                    <ul style={{textAlign: "left"}}>
                                        <li><p>Upcoming and released projects.</p></li>
                                        <li><p>Previews and galleries.</p></li>
                                        <li><p>Quick links to just about anything I've released.</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id='web-planet' ref={(el) => {fore2opener.current = el}} className='web'>
                            <div style={{width: "100%", height: "0px", marginTop: "-13px", gridColumn: "2"}}>
                                <img loading='lazy' alt='decor' width={"100%"} className='geo' src={'/images/opener/geo.webp'} style={{transform: "translate(-1px, -25px", aspectRatio: '1/1'}}/>
                            </div>
                            <div style={{width: "100%", height: "0px", marginTop: "-13px", gridColumn: "2"}}>
                                <a className="planet alink planet-container" href='https://nnexsus.net/'>
                                    <img loading='lazy' alt='decor' width={"100%"} className="planet planet1" style={{transform: "scale(0.45)"}} src={'/images/opener/planet1.webp'}/>
                                </a>
                                <div style={{backgroundImage: `url(/images/opener/planet1banner.webp)`, backgroundSize: 'cover', padding: "10px 0 14px 0", backgroundOrigin: 'padding-box', backgroundPositionX: "center"}} data-augmented-ui="tl-2-clip-xy t-clip tr-2-clip-xy r-clip br-2-clip-xy b-clip bl-2-clip-xy l-clip both" className='info-container'>
                                    <a className='title-link' href='https://nnexsus.net/'><h2>Click to travel.</h2></a>
                                    <h3>Web</h3>
                                    <h4>Explore web projects.</h4>
                                    <ul style={{textAlign: "left"}}>
                                        <li><p style={{display: "flex"}}>GeoRadio - <img loading='lazy' alt='decor' src={'/images/panels/georadio/logo512.png'} width="35px" height={'35px'}/></p></li>
                                        <li><p style={{display: "flex"}}>nnexsus-server - <img loading='lazy' alt='decor' src={'/images/opener/logofull.webp'} width="35px" height={'35px'}/></p></li>
                                        <li><p style={{display: "flex"}}>Weather Site 2.0 - <img loading='lazy' alt='decor' src={'/images/opener/Weather-logo.png'} width="35px" height={'35px'}/></p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div id='game-planet' ref={(el) => {foreopener.current = el}} className='game'>
                            <div style={{width: "100%", height: "0px", marginTop: "-13px", gridColumn: "2"}}>
                                <img loading='lazy' alt='decor' width={"100%"} className='geo' src={'/images/opener/geo.webp'} style={{transform: "translate(-1px, -25px", aspectRatio: '1/1'}}/>
                            </div>
                            <div style={{width: "100%", height: "0px", marginTop: "-13px", gridColumn: "2"}}>
                                <a className="planet alink planet-container" href='https://nnexsus.net/'><img loading='lazy' alt='decor' width={"100%"} className="planet planet2" style={{transform: "scale(-0.45) scaleY(-1) rotate(347deg)", backgroundOrigin: "border-box", backgroundPositionY: "center"}} src={'/images/opener/planet2.webp'}/></a>
                                <div style={{backgroundImage: `url(/images/opener/planet2banner.webp)`, backgroundSize: 'cover', padding: "10px 0 14px 0", backgroundOrigin: 'padding-box', backgroundPositionX: "center"}} data-augmented-ui="tl-2-clip-xy t-clip tr-2-clip-xy r-clip br-2-clip-xy b-clip bl-2-clip-xy l-clip both" className='info-container'>
                                    <a className='title-link' href='https://nnexsus.net/'><h2>Click to travel.</h2></a>
                                    <h3>Games</h3>
                                    <h4>Explore game projects.</h4>
                                    <ul style={{textAlign: "left"}}>
                                        <li><p style={{display: "flex"}}>Fish Game - <img loading='lazy' alt='decor' src={'/images/opener/Fishgame-logo.png'} width="35px" height={'35px'}/></p></li>
                                        <li><p style={{display: "flex"}}>ASCARDS - <img loading='lazy' alt='decor' src={'/images/opener/skull.webp'} width="35px" height={'35px'}/></p></li>
                                        <li><p style={{display: "flex"}}>Upcoming, and more...</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </Wrapper>
    )
}

export default Open;