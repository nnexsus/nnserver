import { useContext, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from "styled-components";
import { saveAs } from "file-saver";

import { LinkContext } from "./context";
import address from '../config.json';
import { useState } from "react";

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

const UserContextMenu = () => {

    const [usersize, setUsersize] = useState(0);
    const [state, dispatch] = useContext(LinkContext);

    const username = Cookies.get("cG9zdFVzZXJuYW1l")
    const sesk = Cookies.get('sesk')
    const screenname = Cookies.get('dXNlcm5hbWU=')
    const adminkey = Cookies.get('adminkey')

    const del = (user) => {
        const data = {
            "username": username,
            "user": user,
            "screenname": screenname,
            "sesk": sesk,
            "adminkey": adminkey
        }
      axios.post(`https://${address.address}/api/admin/deleteuser/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
          dispatch({type: 'update_message', message: response.data})
      })
    }

    const getMetric = () => {
        axios.get(`https://${address.address}/api/admin/getusermetric/${state.contextID.split(" ")[2]}/${username}/${sesk}/${adminkey}`, {headers: {'content-type': "application/json"}}).then((response) => {
            setUsersize(response.data)
        })
    }

    useEffect(() => {
      if(!state.userContext) {
        document.getElementById('usercontext').classList.add('context-hide')
        document.getElementById('usercontext').classList.remove('context-show')
      } else {
        document.getElementById('usercontext').classList.add('context-show')
        document.getElementById('usercontext').classList.remove('context-hide')
        axios.get(`https://${address.address}/api/admin/getusermetric/${state.contextID.split(" ")[2]}/${username}/${sesk}/${adminkey}`, {headers: {'content-type': "application/json"}}).then((response) => {
            setUsersize(response.data)
        })
      }
    }, [state.userContext])
    return (
        <Wrapper>
            <div id="usercontext" className="open-container context-hide" style={{position: 'absolute', top: `${state.contextLoc[1]}px`, left: `${state.contextLoc[0]}px`}}>
                <div className="info-container">
                    <p style={{color: 'white', background: 'black', border: 'solid white 2px', textAlign: 'center', padding: '3px'}}>{state.contextID.split(" ")[0]}</p>
                    <p style={{color: 'white', background: 'black', border: 'solid white 2px', textAlign: 'center', padding: '3px'}}>{state.contextID.split(" ")[1]}</p>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: '5px', background: 'var(--baseThemeEvenDarker)', border: 'solid black 2px', margin: '4px'}}>
                        <img width={'25px'} height={'25px'} className={`${state.contextID}`} src={`${state.contextType[5] === "1" ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`is ${state.contextID} activated`}/>
                        <p style={{marginLeft: '5px'}}>{`${state.contextType[5] === "1" ? "Activated" : "Not Activated" }`}</p>
                    </div>
                    <div style={{display: 'flex', background: 'var(--baseThemeEvenDarker)', border: 'solid 2px black', padding: '5px'}}>
                        <FileSize size={usersize}>{usersize > 1000 ? 
                        usersize > 1000000 ? 
                        usersize > 1000000000 ? 
                        (usersize / 1000000000).toFixed(2) + "GB" : 
                        (usersize / 1000000).toFixed(2) + "MB" : 
                        (usersize / 1000).toFixed(2) + "KB" : 
                        usersize + "B"}</FileSize>
                    </div>
                    <p style={{color: 'var(--10blue)', cursor: 'pointer', textDecoration: 'underline'}} id={`https://${address.address}/api/get/user/pfp/${state.contextType[2]}.jpg`} onClick={(e) => dispatch({type: 'update_previewLink', previewLink: e.currentTarget.id})}>Preview PFP</p>
                </div>
                <div className="context-container">
                    <button className="context-button share" onClick={() => getMetric()}><p>Reload User Metrics</p></button>
                    <button className="context-button delete" onClick={() => del(state.contextID[2])}><img width={'25px'} className={`${state.contextID[2]}`} src='/trash.webp' alt={`delete ${state.contextID}`}/><p>Delete</p></button>
                    <button className="context-button close" onClick={() => dispatch({type: 'update_userContextMenu'})}><p>Close Menu</p></button>
                </div>
            </div>
        </Wrapper>
    )
}

export default UserContextMenu;