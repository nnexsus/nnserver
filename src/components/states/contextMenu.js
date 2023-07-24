import { useContext, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from "styled-components";
import { saveAs } from "file-saver";

import { LinkContext } from "./context";
import address from '../config.json';

const Wrapper = styled.div`
    .open-container {
        flex-direction: row-reverse;
        align-items: stretch;
        z-index: 9;
        transition: 0.3s ease;
        animation: opencontext 0.5s 0.1s forwards;
        transform: scaleY(0);
        transform-origin: top left;
    }
    @keyframes opencontext {
        0% {
            transform: scaleY(0);
        } 100% {
            transform: scaleY(1);
        }
    }
    .context-container {
        display: flex;
        flex-direction: column;
        
        border: solid black 2px;
        background-color: var(--baseThemeEvenDarker);

        overflow: hidden;
        z-index: 10;
    }
    .context-button {
        display: flex;
        align-items: center;

        height: 30px; 
        padding: 2px;
        margin: 2px 3px;
        cursor: pointer;

        border: solid var(--baseThemeEvenDarker) 2px;
        outline: 1px black solid;

        background-color: var(--accentTheme);
        image-rendering: pixelated;

        transition: 0.3s ease;
        overflow: hidden;

        color: black;
        :hover {
            border: solid var(--baseThemeDarker) 2px;
            background-color: var(--accentThemeDarker);
            scale: 1.1;
            margin: 7px 3px;
        }
        :active {
            border: solid var(--baseTheme) 2px;
            background-color: var(--baseThemeEvenDarker);
            scale: 0.95;
        }
    }
    a {
        display: flex;
        align-items: center;
    }
    p {
        margin-left: 10px;
        font-family: 'Comp';
    }
    .download:hover {
            background-color: var(--darkerBlue);
            animation: downloadHover 0.2s ease-in-out;
        }
    .delete:hover {
            background-color: var(--fsVeryLarge);
            animation: deleteHover 0.2s ease-in-out;
        }
    .share:hover {
            background-color: var(--accentThemeDarker);
            animation: shareHover 0.2s ease-in-out;
        }
    .favorite:hover {
            background-color: var(--darkerTeal);
            animation: favoriteHover 0.2s ease-in-out;
        }
    @keyframes downloadHover {
            0% {
                background-color: var(--accentTheme);
        }
            100% {
                background-color: var(--darkerBlue);
        }
    }
    @keyframes deleteHover {
            0% {
                background-color: var(--accentTheme);
        }
            100% {
                background-color: var(--fsVeryLarge);
        }
    }
    @keyframes shareHover {
            0% {
                background-color: var(--accentTheme);
        }
            100% {
                background-color: var(--accentThemeDarker);
        }
    }
    @keyframes favoriteHover {
            0% {
                background-color: var(--accentTheme);
        }
            100% {
                background-color: var(--darkerTeal);
        }
    }
    .info-container {
        display: flex;
        flex-direction: column;
        background-color: var(--baseThemeDarker);
        border: solid black 2px;
    }
    .context-hide {
        height: 20%;
        display: none;
    }
    .context-show {
        display: flex;
    }
`;

const FileSize = styled.p`
    color: ${prop => `rgba(${(prop.size / 10000000) * 5},${(255 - (prop.size / 10000000) * 5)},${(255 - (prop.size / 10000000) * 5)},1)`};
    margin: 0;
`;

const ContextMenu = () => {

    const [state, dispatch] = useContext(LinkContext);

    const username = Cookies.get("cG9zdFVzZXJuYW1l")
    const sesk = Cookies.get('sesk')
    const screenname = Cookies.get('dXNlcm5hbWU=')

    const favorite = (filename) => {
        const file = filename;
        const data = {
            "author": username,
            "sesk": sesk
        }
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('recentStored')
        axios.post(`https://${address.address}/api/favorite/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            localStorage.setItem('favs', response.data.favs)
            dispatch({type: 'update_message', message: response.data.message})
        })
    }

    const del = (filename) => {
        const data = {
            "author": username,
            "filename": filename,
            "screenname": screenname,
            "sesk": sesk
        }
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('recentStored')
        axios.post(`https://${address.address}/api/delete/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const delfolder = (filename) => {
        const data = {
            "author": username,
            "folderid": filename,
            "sesk": sesk
        }
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('recentStored')
        axios.post(`https://${address.address}/api/folder/delete/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
      }

    const download = (filename) => {
        const username = Cookies.get('dXNlcm5hbWU=') //this is the display username, like nnexsus to us
        saveAs(`https://api-nnexsus-server.cfd/api/get/user/acfile/${username}/${filename}`, `${filename}`)
        dispatch({type: 'update_message', message: 'Downloading File...'})
    }

    const lock = () => {
        const locked = +!state.contextType[5];
        const file = state.contextID;
        const data = {
            "author": username,
            "state": locked //should be set to the new value, not its current state
        }
        axios.post(`https://${address.address}/api/private/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('recentStored')
    }

    const copyLink = async (folderid) => {
        await navigator.clipboard.writeText(`https://nnexsus-server.netlify.app/folder/${folderid}`);
        dispatch({type: 'update_message', message: "Copied link to clipboard."})
    }

      useEffect(() => {
        if(!state.context) {
            document.getElementById('context').classList.add('context-hide')
            document.getElementById('context').classList.remove('context-show')
        } else {
            document.getElementById('context').classList.add('context-show')
            document.getElementById('context').classList.remove('context-hide')
        }
      }, [state.context])
    return (
        <Wrapper>
            <div id="context" className="open-container context-hide" style={{position: 'absolute', top: `${state.contextLoc[1]}px`, left: `${state.contextLoc[0]}px`}}>
                <div className="info-container">
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: '5px', background: 'var(--baseThemeEvenDarker)', border: 'solid black 2px', margin: '4px'}}>
                        <img width={'25px'} height={'25px'} className={`${state.contextID}`} src={`${state.contextType[1] === "true" ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`favourite ${state.contextID}`}/>
                        <p style={{marginLeft: '5px'}}>{`${state.contextType[1] === "true" ? "Favorited" : "" }`}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: '5px', background: 'var(--baseThemeEvenDarker)', border: 'solid black 2px', margin: '0px'}}>
                        <img width={'25px'} height={'25px'} className={`${state.contextID}`} src={"/lock.webp"} alt={`private ${state.contextID}`}/>
                        <p style={{margin: '0'}}>{`${parseInt(state.contextType[5]) === 1 ? "Public" : "Private" }`}</p>
                    </div>
                    <p style={{color: 'white', background: 'black', border: 'solid white 2px', textAlign: 'center', padding: '3px'}}>{state.contextType[0].includes("folder") ? state.contextID : state.contextID.slice(13)}</p>
                    <div style={{display: 'flex', background: 'var(--baseThemeEvenDarker)', border: 'solid 2px black', padding: '5px'}}>
                        <p style={{color: 'white', margin: 0}}>{state.contextType[3] ? state.contextType[3].split("T")[0] : "Unknown"}</p>
                        <FileSize size={state.contextType[2]}>{state.contextType[2] > 1000 ? 
                        state.contextType[2] > 1000000 ? 
                        state.contextType[2] > 1000000000 ? 
                        (state.contextType[2] / 1000000000).toFixed(2) + "GB" : 
                        (state.contextType[2] / 1000000).toFixed(2) + "MB" : 
                        (state.contextType[2] / 1000).toFixed(2) + "KB" : 
                        state.contextType[2] + "B"}</FileSize>
                    </div>
                    {state.contextType[0].includes("image") || state.contextType[0].includes("video") ?
                        null //<p style={{color: 'var(--10blue)', cursor: 'pointer', textDecoration: 'underline'}} id={`https://${address.address}/api/get/user/acfile/${screenname}/${state.contextID}`} onClick={(e) => dispatch({type: 'update_previewLink', previewLink: e.currentTarget.id})}>Preview</p>
                    : state.contextType[0] ? 
                        <a style={{color: 'var(--10blue)', cursor: 'pointer', textDecoration: 'underline'}} href={`/folder/${state.contextType[4]}`}><p>Open</p></a>
                    : null}
                </div>
                <div className="context-container">
                    {state.contextType[0].includes('folder') ?
                        <button className="context-button share" onClick={() => copyLink(state.contextType[4])}><img width={'25px'} className={`${state.contextID}`} src="/share.webp" alt={`share ${state.contextID}`}/><p>Share</p></button>
                        : //share button selector
                        <button className="context-button share"><a href={`/file/${(state.contextID)}`}><img width={'25px'} className={`${state.contextID}`} src="/share.webp" alt={`share ${state.contextID}`}/><p>Share</p></a></button>
                    }
                    <button className="context-button favorite" onClick={() => favorite(state.contextID)}><img width={'25px'} className={`${state.contextID}`} src={`${state.contextType[1] === "true" ? "/starFilled.webp" : "/starEmpty.webp"}`} alt={`favourite ${state.contextID}`}/><p>{`${state.contextType[1] === "true" ? "Unfavorite" : "Favorite"}`}</p></button>
                    {state.contextType[0].includes('folder') ? null : 
                        <button className="context-button download" onClick={() => download(state.contextID)}><img width={'25px'} src='/download.webp' alt={`download ${state.fileID}`}/><p>Download</p></button>
                    }
                    <button className="context-button delete" onClick={() => state.contextType[0].includes("folder") ? delfolder(state.contextType[4]) : del(state.contextID)}><img width={'25px'} className={`${state.contextID}`} src='/trash.webp' alt={`delete ${state.contextID}`}/><p>Delete</p></button>
                    <button className="context-button lock" onClick={() => lock()}><img width={'25px'} className={`${state.contextID}`} src='/lock.webp' alt={`lock ${state.contextID}`}/><p>{parseInt(state.contextType[5]) === 1 ? "Lock" : "Unlock"}</p></button>
                    <button className="context-button close" onClick={() => dispatch({type: 'update_contextMenu'})}><p>Close Menu</p></button>
                </div>
            </div>
        </Wrapper>
    )
}

export default ContextMenu;