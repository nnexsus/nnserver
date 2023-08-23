import { useContext, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';
import { useEffect } from 'react';

const Wrapper = styled.div`
    margin: 15px;
    border: solid black 2px;
    padding: 15px;
    height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;

    a, h1, h2, h3, h4, p, div {
        font-family: 'Comp';
    }

    .hidden {
        display: none;
    }
    .searchbar {
        background-color: var(--accentThemeDarker);
        padding: 5px;
        margin: 10px;
        border: black solid 1px;
        transition: 0.3s ease-in-out;
        font-family: "Comp";

        :hover {
            background-color: var(--accentTheme);
        }
    }
    .fileContainer {
        display: grid;
        grid-template-columns: repeat(3, calc(90% / 3));
        gap: 15px;
        align-items: center;
    }

    .file {
        width: 100%;
        aspect-ratio: 1;
        padding: 0px;
        margin: 5px;

        display: flex;
        flex-direction: column-reverse;

        border: solid var(--accentTheme) 1px;
        background: var(--baseThemeEvenDarker);
        color: white;
        text-align: center;
        transition: 0.1s ease-in-out;
        z-index: 0;
        overflow: hidden;
        image-rendering: pixelated;
        :hover {
            background: var(--baseThemeDarker);
            border: solid var(--accentThemeDarker) 1px;
            transform: scale(1.025);
            z-index: 5;
        }
        :active {
            background: var(--baseTheme);
            border: solid var(--accentThemeEvenDarker) 1px; 
        }
        p {
            text-shadow: 0 0 3px black;
            font-size: 13px;
        }
    }
    .mediaFrame {
        background-color: white;
        margin: auto;
        width: 95%;
        grid-column-start: 1;
        grid-column-end: 3;
    }
    .quick-star, .quick-download, .quick-delete, .quick-share {
        cursor: pointer;
        aspect-ratio: 1/1;
        box-shadow: 0 0 2px 0px black;
        padding: 3px;
        transition: 0.1s ease;
    }
    .quick-star {
        background: var(--darkerTeal); 
        :hover {
            background: var(--evenDarkerTeal); 
        }
    }
    .quick-download {
        background: var(--darkerBlue); 
        :hover {
            background: var(--evenDarkerBlue); 
        }
    }
    .quick-share {
        background: var(--10purple); 
        :hover {
            background: var(--60); 
        }
    }
    .quick-delete {
        background: var(--fsLarge); 
        :hover {
            background: var(--fsVeryLarge); 
        }
    }
    .sort-button {
        cursor: pointer;
        aspect-ratio: 1/1;
        box-shadow: 0 0 2px 0px black;
        border: solid 1px var(--accentTheme);
        padding: 3px;
        transition: 0.1s ease;
        background: var(--accentThemeDarker);
        :hover {
            background: var(--accentTheme);
        }
        :active {
            background: var(--accentThemeEvenDarker);
        }
    }
    .sort-div, .refresh-div, .downall-div {
        p {
            transform: scaleY(0);
            height: 0px;
            transition: 0.3s ease;
        }
        :hover {
            p {
                height: 20px;
                transform: scaleY(1);
            }
        }
    }
    .refresh {
        cursor: pointer;
        aspect-ratio: 1/1;
        border: solid 1px var(--accentTheme);
        transition: 0.1s ease-in-out;
        background: var(--accentThemeDarker);
        :hover {
            background: var(--accentTheme);
        }
        :active {
            background: var(--accentThemeEvenDarker);
        }
    }
`;

const StarredFiles = () => {

        const [state, dispatch] = useContext(LinkContext);

        const [files, setFiles] = useState(null);

        const ping = useRef(false)

        const username = Cookies.get('cG9zdFVzZXJuYW1l')
        const sesk = Cookies.get('sesk')
        const screenname = Cookies.get('dXNlcm5hbWU=')

        useEffect(() => {
            if (ping.current) return;
            ping.current = true;
            if (localStorage.getItem('favoriteStore') === null) {
                axios.get(`https://${address.address}/api/get/${username}/${sesk}/favorites`, {timeout: 15000}).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('favoriteStore', `${t}`)
                    setFiles(response.data)
                })
            } else {
                console.log(JSON.parse(localStorage.getItem('favoriteStore')))
                setFiles(JSON.parse(localStorage.getItem('favoriteStore')))
            }
        }, [files])

        const download = (filename) => {
            const username = Cookies.get('dXNlcm5hbWU=') //this is the display username, like nnexsus to us
            saveAs(`https://arina.lol/api/get/user/acfile/${username}/${filename}`, `${filename}`)
            dispatch({type: 'update_message', message: 'Downloading File...'})
        }

        const del = (filename) => {
            const data = {
                "author": username,
                "filename": filename,
                "screenname": screenname,
                "sesk": sesk
            }
            localStorage.removeItem('favoriteStore')
            localStorage.removeItem('storedFiles')
            localStorage.removeItem('recentStored')
            axios.post(`https://${address.address}/api/delete/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                dispatch({type: 'update_message', message: response.data})
            })
        }
        const favorite = (filename) => {
            const file = filename;
            const data = {
                "author": username,
                "sesk": sesk
            }
            localStorage.removeItem('favoriteStore')
            localStorage.removeItem('storedFiles')
            localStorage.removeItem('recentStored')
            axios.post(`https://${address.address}/api/favorite/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                localStorage.setItem('favs', response.data.favs)
                dispatch({type: 'update_message', message: response.data.message})
            })
        }

    const contextMenu = (e) => {
        e.preventDefault()
        dispatch({type: 'update_context', contextID: e.currentTarget.id, contextLoc: [e.pageX, e.pageY], contextType: e.currentTarget.classList})
    }

    const onUpdate = (id) => sessionStorage.setItem('dragFile', id)

    const onDragOver = (e, id) => {
        e.preventDefault()
    }

    const onDrop = (e, id) => {
        e.preventDefault()
        const data = {
            filename: sessionStorage.getItem('dragFile'),
            foldername: id,
            mode: false
        }
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('recentStored')
        axios.post(`https://${address.address}/api/folder/sync`, data).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    return (
        <Wrapper>
            <div style={{margin: '0 10%', background: 'var(--baseThemeDarker)', border: 'solid var(--accentTheme) 1px', padding: '30px'}}>
                <div style={{display: 'flex', height: '10vh', width: '100%', padding: '10px', alignItems: 'center', justifyContent: 'center'}}>
                    <img style={{aspectRatio: '1/1', padding: '10px', opacity: '0.3'}} alt='decor' height={'70%'} src='/starFilled.webp'/>
                    <h1 className='title' style={{color: 'white', textAlign: 'center', fontFamily: 'Comp', whiteSpace: 'nowrap'}}>Starred Files</h1>
                    <img style={{aspectRatio: '1/1', padding: '10px', opacity: '0.3'}} alt='decor' height={'70%'} src='/starFilled.webp'/>
                </div>
                <div className='fileContainer' style={{border: 'solid var(--accentTheme) 1px', background: 'var(--baseTheme)', padding: '20px'}}>
                {files && files.length >= 0 ? files.map((file) => {
                    if (file === null) {
                        return
                    }
                    var starByAuth = false
                    localStorage.getItem('favs').split(",").forEach((el) => {
                        if (el === file.filename) starByAuth = true;
                    })
                    return (
                        <div draggable 
                        onContextMenu={(e) => contextMenu(e)}
                        onDragStart={(e) => onUpdate(e.currentTarget.name)}
                        onDragEnd={() => onUpdate(null)}
                        onDragOver={(e) => file.isfolder === 1 ? onDragOver(e, e.currentTarget.classList[4]) : null}
                        onDrop={(e) => file.isfolder === 1 ? onDrop(e, e.currentTarget.classList[4]) : null}
                        className={`${file.type} ${starByAuth} ${file.size} ${file.uploadDate} ${file.id} ${file.public}`}
                        key={file.filename}
                        id={file.filename}
                        style={{width: '100%', border: 'solid 2px white'}}>
                            {file.isfolder !== 1 ?
                            <div className="file" title='Right click to select.' style={{backgroundImage: `url(https://${address.address}/api/get/user/preview/${file.filename})`, backgroundSize: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                    <p style={{overflowWrap: 'anywhere', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.filename.slice(13)}</p>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', zIndex: 1}}>
                                        <img onClick={(e) => window.open(`/file/${e.currentTarget.name}`, 'blank')} name={`${file.filename}`} title='Share File?' width={'70%'} className={`quick-share`} src={'/share.webp'} alt={`share ${file.filename}`}/>
                                        <img onClick={(e) => download(e.currentTarget.name)} name={`${file.filename}`} title='Download File?' width={'70%'} className={`quick-download`} src={'/download.webp'} alt={`download ${file.filename}`}/>
                                        <img onClick={(e) => favorite(e.currentTarget.name)} name={`${file.filename}`} title='Favorite File?' width={'70%'} className={`quick-star`} src={`${starByAuth ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`favourite ${file.filename}`}/>
                                        <img onClick={(e) => del(e.currentTarget.name)} name={`${file.filename}`} title='Delete File?' width={'70%'} className={`quick-delete`} src={'/trash.webp'} alt={`delete ${file.filename}`}/>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="file" title='Right click to select, left click to enter.' style={{backgroundImage: `url(/folder.webp)`, backgroundSize: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                                <a style={{height: '90%', padding: '5px'}} href={`/folder/${file.id}`}><div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                    <p style={{overflowWrap: 'anywhere', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px', color: 'white'}}>{file.filename}</p>
                                </div></a>
                            </div>}
                        </div>
                    )
                })
                : null}
            </div>
            </div>
        </Wrapper>
    )
}

export default StarredFiles;