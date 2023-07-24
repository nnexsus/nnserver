import styled from "styled-components";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Wrapper = styled.div`

    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 10;
    height: 100vh;
    width: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(-190px, 0);
    transition: 0.4s ease;
    backdrop-filter: blur(5px) brightness(0.8);
    outline: var(--baseTheme) solid 2px; 

    :hover {
        transform: translate(0, 0);
        .title {
            letter-spacing: 1px;
        }
        .menu-hint {
            letter-spacing: 5px;
        }
        .header {
            border: solid var(--accentTheme) 10px;
        }
        .links a {
            animation: aspread 1s 0.2s forwards;
        }
    }

    p, h1, h2, h3, h4, div {
        font-family: "Comp";
    }

    .header {
        height: 95vh;
        width: 150px;

        margin-top: 5px;
        display: flex;
        flex-direction: column;
        padding: 10px;
        align-items: center;
        background-color: var(--baseThemeEvenDarker);
        background-image: url('/triheader.webp');
        background-size: contain;
        border: solid var(--accentThemeDarker) 2px;
        transition: 2s ease;
    }

    .title {
        padding-top: 10px;
        font-size: 1.5vw;
        letter-spacing: 5px;
        transition: 1s ease;
    }

    .links {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
        a {
            margin-bottom: 0px;
        }
    }

    .acc {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: 0px;

        .dropdown {
            opacity: 0;
            transition: 0.2s ease;
        }
        :hover {
            .dropdown{
                opacity: 1;
            }
        }
    }
    
    .navbutton {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 25px;
        padding: 10px 0;
        background-color: var(--baseThemeEvenDarker);
        border: solid var(--accentTheme) 2px;
        outline: black solid 2px;
        color: white;
        transition: 0.1s ease;
        animation: acollapse 1s 0.2s backwards;
        :hover {
            background-color: var(--baseThemeDarker);
            border: solid var(--accentThemeDarker) 2px;
            letter-spacing: 3px;
        }
        :active {
            background-color: var(--baseTheme);
            border: solid var(--accentThemeEvenDarker) 2px;
            letter-spacing: 1px;
        }
        img {
            height: 25px;
            width: 25px;
            aspect-ratio: 1/1;
            image-rendering: pixelated;
        }
    }

    .menu-hint {
        width: 80px;
        height: 100%; 
        font-size: 5vw; 
        margin: 0; 
        padding: 0; 
        text-align: center; 
        color: white; 
        writing-mode: vertical-rl;
        text-orientation: upright;
        transition: 1s ease;
    }

    @keyframes aspread {
        0% {
            margin-top: 0px;
        } 100% {
            margin-bottom: 10px;
        }
    }
    @keyframes acollapse {
        0% {
            margin-bottom: 10px;
        } 100% {
            margin-bottom: 0px;
        }
    }

    @media screen and (min-width: 1000px) {
        .menu-hint {
            font-size: 45px;
        }
    }
`;

const Header = () => {

    useEffect(() => {

    }, [])

    return (
        <Wrapper>
            <div className="header">
                    <div className="links">
                        <h1 className="title" style={{margin: 0, marginLeft: "-20px", color: "white"}}>nnserver</h1>
                        <a className="navbutton" href="/home"><img src="/home.webp" alt={"home"}/><p>Home</p></a>
                        <a className="navbutton" href="/folder/0"><img src="/folder.webp" alt={"files"}/><p>Files</p></a>
                        <a className="navbutton" href="/favorites"><img src="/starEmpty.webp" alt={"favorite files"}/><p>Saved</p></a>
                        <a className="navbutton" href="/about"><img src="/logo.webp" alt="about link"/><p>About</p></a>
                        {Cookies.get('isadmin') > 0 ? <a className="navbutton" href="/admin"><img src="/logofull.webp" alt="admin link"/><p>Admin</p></a> : null}
                        <div className="navbutton acc">
                            <img width={'100%'} src="/basic.webp" className="pfp" alt={"account"}/>                       
                            <div className="dropdown">
                                <a style={{color: 'white'}} href="/account"><p>{Cookies.get('cG9zdFVzZXJuYW1l') ? (Cookies.get('dXNlcm5hbWU=')) : null}</p></a>
                                {Cookies.get('cG9zdFVzZXJuYW1l') ? <a style={{color: 'white'}} href="/signout"><p>Signout</p></a> 
                                : <a style={{color: 'white'}} href="/signin"><p>Sign in</p></a>}
                            </div>
                        </div>
                    </div>
            </div>
            <h1 className="menu-hint">Menu</h1>
        </Wrapper>
    )
}

export default Header;