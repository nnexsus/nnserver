import { useContext, useState} from "react";
import styled from "styled-components";
import { saveAs } from "file-saver";
import Cookies from 'js-cookie';
import JSZip from 'jszip';
import axios from 'axios';

import { LinkContext } from "./context";
import address from '../config.json';

import '../css/contextmenu.css'

const FileSize = styled.p`
    color: ${prop => `rgba(${(prop.size / 10000000) * 5},${(255 - (prop.size / 10000000) * 5)},${(255 - (prop.size / 10000000) * 5)},1)`};
    margin: 0;
`;

const ContextMenu = ({uploadDates, filetypes, favorited, filesizes, fileids, publics, contextID, number, totalspace}) => {

    const [state, dispatch] = useContext(LinkContext);

    const username = Cookies.get("cG9zdFVzZXJuYW1l")
    const screenname = Cookies.get('dXNlcm5hbWU=')
    const sesk = Cookies.get('sesk')

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
        filename.split(',').forEach((el) => {
            const data = {
                "author": username,
                "filename": el,
                "screenname": screenname,
                "sesk": sesk
            }
            localStorage.removeItem('storedFiles')
            localStorage.removeItem('favoriteStore')
            localStorage.removeItem('recentStored')
            axios.post(`https://${address.address}/api/delete/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                dispatch({type: 'update_message', message: response.data})
            })
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
        const username = Cookies.get('dXNlcm5hbWU=')
        dispatch({type: 'update_message', message: 'Starting download...'})
        if (filename.split(',').length > 2) {
            const zip = new JSZip()
            filename.split(',').forEach(fi => {
                fetch(`https://${address.address}/api/get/user/acfile/${screenname}/${fi}`).then((res) => {
                    if (res.status > 220) {
                        dispatch({type: 'update_message', message: res.data})
                        return
                    }
                    const imgdata = res.blob()
                    zip.file(`${fi}`, imgdata)
                })
            })
            
            const waitforfiles = () => {
                setTimeout(() => {
                    dispatch({type: 'update_message', message: `${"Downloading. " + (Object.keys(zip.files).length) + " of " + (filename.split(',').length - 1) + " files ready to zip."}`})
                    if(Object.keys(zip.files).length >= filename.split(',').length - 1) {
                        try {
                            dispatch({type: 'update_message', message: 'Zipping files. This may take a minute.'})
                            zip.generateAsync({ type:'blob' }).then((cont) => {
                                dispatch({type: 'update_message', message: 'Downloading.'})
                                saveAs(cont, 'download.zip')
                            })
                        } catch(err) {
                            dispatch({type: 'update_message', message: 'Error attempting to zip files.'})
                            console.log(err) 
                        }
                    } else {
                        waitforfiles()
                    }
                }, [1000])
            }
            waitforfiles()
        } else {
            filename.split(',').forEach(el => {
                if (el.length > 0) {
                    dispatch({type: 'update_message', message: 'Downloading.'})
                    saveAs(`https://${address.address}/api/get/user/acfile/${username}/${el}`, `${el}`)
                } else {
                    dispatch({type: 'update_message', message: "No file selected to download."})
                }
            });
        }
    }

    const lock = (lock) => {
        const locked = +!lock;
        const file = contextID;
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

    const closeMenu = () => {
        sessionStorage.setItem('contextID', '')
        sessionStorage.setItem('filetypes', '')
        sessionStorage.setItem('favorited', '')
        sessionStorage.setItem('filesizes', '')
        sessionStorage.setItem('uploadDates', '')
        sessionStorage.setItem('fileids', '')
        sessionStorage.setItem('public', '')
        document.getElementById(`context-window-${number}`).style.display = 'none'
    }

    const changeFolderColor = (color) => {
        const folderid = fileids.split(',')[0]
        const data = {
            "screenname": screenname,
            "author": username,
            "folderid": folderid,
            "color": color,
            "sesk": sesk
        }
        axios.post(`https://${address.address}/api/folder/color/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const [newName, setNewName] = useState('');

    const renameFile = () => {
        const isfolder = filetypes.split(',')[0].includes('folder')
        const fileid = fileids.split(',')[0]
        const data = {
            "screenname": screenname,
            "isfolder": isfolder,
            "newname": newName,
            "author": username,
            "fileid": fileid,
            "sesk": sesk
        }
        axios.post(`https://${address.address}/api/rename/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    return (
        <div className="contextmenu-container">
            <div id="context" className="open-container" style={{position: 'absolute'}}>
                {filetypes?.split(',')[0].includes("folder") ? 
                    <div className="color-selector" style={{background: 'var(--baseThemeEvenDarker)'}}>
                        <p style={{margin: 0, textAlign: 'center', color: 'white'}}>Recolor Folder: </p>
                        <div>
                            <button title='Status Code Green (Default)' className={'#03fc17'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#03fc17', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Dessert Cherry Red' className={'#F94144'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#F94144', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Watercolor Canvas Orange' className={'#F3722C'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#F3722C', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Crayon Collage Orange' className={'#F9844A'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#F9844A', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Sweet Spring Orange' className={'#F8961E'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#F8961E', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Specular Sunset Yellow' className={'#F9C74F'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#F9C74F', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Summer Leafbud Green' className={'#90BE6D'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#90BE6D', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Carribean Shore Seagreen' className={'#43AA8B'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#43AA8B', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Frozen River Blue' className={'#4D908E'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#4D908E', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Midday Icicle Blue' className={'#577590'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#577590', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Spring Sky Blue' className={'#277DA1'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#277DA1', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                            <button title='Dark Lily Purple' className={'#4e27a1'} onClick={(e) => changeFolderColor(e.currentTarget.classList[0], '#')} style={{background: '#4e27a1', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'}}></button>
                        </div>
                    </div>
                :
                    <div className="info-container">
                        {contextID?.split(',').length > 2 ? null :
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: '5px', background: 'var(--baseThemeEvenDarker)', border: 'solid black 2px', margin: '4px'}}>
                                <img width={'25px'} height={'25px'} className={`${contextID?.split(',')[0]}`} src={contextID?.split(',').length > 2 ? null : `${favorited?.split(',')[0] == "true" ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`favourite ${contextID?.split(',')[0]}`}/>
                                <p style={{marginLeft: '5px'}}>{contextID?.split(',').length > 2 ? null : `${favorited?.split(',')[0] == "true" ? "Favorited" : "" }`}</p>
                            </div>
                        }
                        {contextID?.split(',').length > 2 ? null :
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginLeft: '5px', background: 'var(--baseThemeEvenDarker)', border: 'solid black 2px', margin: '0px'}}>
                                <img width={'25px'} height={'25px'} className={`${contextID}`} src={"/lock.webp"} alt={`private ${contextID}`}/>
                                <p style={{margin: '0'}}>{contextID?.split(',').length > 2 ? null : `${parseInt(publics?.split(',')[0]) === 1 ? "Public" : "Private" }`}</p>
                            </div>
                        }

                        {contextID?.split(',').length > 2 ? null :
                            <p style={{color: 'white', background: 'black', border: 'solid white 2px', textAlign: 'center', padding: '3px'}}>
                                {contextID?.split(',').length > 2 ? null : filetypes?.split(',')[0].includes("folder") ? contextID : contextID?.split(',')[0].slice(13)}
                            </p>
                        }

                        <div style={{display: 'flex', background: 'var(--baseThemeEvenDarker)', border: 'solid 2px black', padding: '5px'}}>

                            <p style={{color: 'white', margin: 0}}>
                                {contextID?.split(',').length > 2 ? null : uploadDates?.split(',')[0] ? uploadDates?.split(',')[0].split("T")[0] : "Unknown"}
                            </p>
                            <FileSize size={totalspace}>
                                {totalspace > 1000 ? 
                                 totalspace > 1000000 ? 
                                 totalspace > 1000000000 ? 
                                (totalspace / 1000000000).toFixed(2) + "GB" : 
                                (totalspace / 1000000).toFixed(2) + "MB" : 
                                (totalspace / 1000).toFixed(2) + "KB" : 
                                 totalspace + "B"}
                            </FileSize>
                        </div>
                        {contextID?.split(',').length > 1 ? null : filetypes?.split(',')[0].includes("image") || filetypes?.split(',')[0].includes("video") ?
                            null //<p style={{color: 'var(--10blue)', cursor: 'pointer', textDecoration: 'underline'}} id={`https://${address.address}/api/get/user/acfile/${screenname}/${contextID}`} onClick={(e) => dispatch({type: 'update_previewLink', previewLink: e.currentTarget.id})}>Preview</p>
                        : filetypes?.split(',')[0] ? 
                            <a style={{color: 'var(--10blue)', cursor: 'pointer', textDecoration: 'underline'}} href={`/folder/${sessionStorage.getItem('fileids')?.split(',')[0]}`}><p>Open</p></a>
                        : null}
                    </div>
                }
                <div className="context-container">
                    {contextID?.split(',').length > 2 ? null : filetypes?.split(',')[0].includes('folder') ?
                        <button className="context-button share" onClick={() => copyLink(sessionStorage.getItem('fileids')?.split(',')[0])}><img width={'25px'} className={`${contextID?.split(',')[0]}`} src="/share.webp" alt={`share ${contextID?.split(',')[0]}`}/><p>Share</p></button>
                        : //share button selector
                        <a className="context-button share" target="_blank" rel="noreferrer" href={`/file/${(contextID?.split(',')[0])}`}><img width={'25px'} className={`${contextID?.split(',')[0]}`} src="/share.webp" alt={`share ${contextID?.split(',')[0]}`}/><p>Share</p></a>
                    }
                    {contextID?.split(',').length > 2 ? null :
                        <button className="context-button favorite" onClick={() => favorite(contextID?.split(',')[0])}><img width={'25px'} className={`${contextID?.split(',')[0]}`} src={`${favorited?.split(',')[0] === "true" ? "/starFilled.webp" : "/starEmpty.webp"}`} alt={`favourite ${contextID?.split(',')[0]}`}/><p>{`${favorited?.split(',')[0] === "true" ? "Unfavorite" : "Favorite"}`}</p></button>
                    }
                    {filetypes?.split(',')[0].includes('folder') ? null : 
                        <button className="context-button download" onClick={() => download(contextID)}><img width={'25px'} src='/download.webp' alt={`download ${state.fileID}`}/><p>Download</p></button>
                    }

                    <button className="context-button delete" onClick={() => filetypes?.split(',')[0].includes("folder") ? delfolder(sessionStorage.getItem('fileids')?.split(',')[0]) : del(contextID)}><img width={'25px'} className={`${contextID?.split(',')[0]}`} src='/trash.webp' alt={`delete ${contextID?.split(',')[0]}`}/><p>Delete</p></button>
                    
                    {contextID?.split(',').length > 2 ? null :
                        <button className="context-button lock" onClick={() => lock()}><img width={'25px'} className={`${contextID?.split(',')[0]}`} src='/lock.webp' alt={`lock ${contextID?.split(',')[0]}`}/><p>{parseInt(publics?.split(',')[0]) === 1 ? "Lock" : "Unlock"}</p></button>
                    }
                    <hr style={{margin: 0, width: '75%', borderColor: 'var(--accentThemeEvenDarker)'}}/>
                    {contextID?.split(',').length > 2 ? null :
                        <div className="rename-div">
                            <input className="rename-input" type="text" placeholder="Rename" onChange={(e) => setNewName(e.currentTarget.value)} />
                            <button className="context-button rename" onClick={() => renameFile()}>Rename</button>
                        </div>
                    }
                    <hr style={{margin: 0, width: '75%', borderColor: 'var(--accentThemeEvenDarker)'}}/>
                    <button className="context-button close" onClick={() => closeMenu()}><p>Close Menu</p></button>
                </div>
            </div>
        </div>
    )
}

export default ContextMenu;