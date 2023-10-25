import { useContext, useRef, useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

const Wrapper = styled.div`

    a, p, h1, h2, h3, h4, button, form {
        font-family: Comp;
        font-variant-caps: petite-caps;
    }

    .title {
        color: white;
        text-align: center;
    }

    .hidden {
        display: none;
    }

    .fileContainer {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .file-frame {
        width: 100%;
        border: solid 2px var(--accentThemeDarker);
        :hover {
            border: solid 2px var(--accentTheme);
        }
        :active {
            border: solid 2px var(--accentThemeEvenDarker);
        }
    }
`;

const RecentFiles = () => {

        const contextMenu = (e) => {
            e.preventDefault()
            dispatch({type: 'update_context', contextID: e.currentTarget.id, contextLoc: [e.pageX, e.pageY], contextType: e.currentTarget.classList})
        }

        const [state, dispatch] = useContext(LinkContext);

        const [files, setFiles] = useState(null);

        const ping = useRef(false)

        const username = Cookies.get('cG9zdFVzZXJuYW1l')
        const sesk = Cookies.get('sesk')
        const screenname =  Cookies.get('dXNlcm5hbWU=')

        useEffect(() => {
            if (ping.current) return;
            ping.current = true;
            if (localStorage.getItem('recentStored') === null) {
                getFiles();
            } else {
                setFiles(JSON.parse(localStorage.getItem('recentStored')))
            }
        }, [files])

        const getFiles = () => {
            const data = {
                'username': username
            }
            axios.get(`https://${address.address}/api/get/user/${username}/recent`, data).then((response) => {
                if (response.status !== 200) {
                    dispatch({type: 'update_message', message: response.data})
                    return
                }
                var t = JSON.stringify(response.data)
                localStorage.setItem('recentStored', `${t}`)
                setFiles(response.data)
            })
        }
        
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
            localStorage.removeItem('recentStored')
            localStorage.removeItem('storedFiles')
            localStorage.removeItem('favoriteStored')
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
            localStorage.removeItem('recentStored')
            localStorage.removeItem('storedFiles')
            localStorage.removeItem('favoriteStore')
            axios.post(`https://${address.address}/api/favorite/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                localStorage.setItem('favs', response.data.favs)
                dispatch({type: 'update_message', message: response.data.message})
            })
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
        localStorage.removeItem('recentStored')
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        axios.post(`https://${address.address}/api/folder/sync`, data).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    return (
        <Wrapper>
            <div>
                <h1 className='title'>Recent Files</h1>
                <div className='fileContainer'>
                {files && files.length >= 0 ? files.map((file) => {
                    var starByAuth = false
                    localStorage.getItem('favs').split(",").forEach((el) => {
                        if (el === file.filename) starByAuth = true;
                    })
                    return (
                        <div draggable 
                        onContextMenu={(e) => contextMenu(e)}
                        onDragStart={(e) => onUpdate(e.currentTarget.id)}
                        onDragEnd={() => onUpdate(null)}
                        onDragOver={(e) => file.isfolder === 1 ? onDragOver(e, e.currentTarget.id) : null}
                        onDrop={(e) => file.isfolder === 1 ? onDrop(e, e.currentTarget.id) : null}
                        className={`${file.type} ${starByAuth} ${file.size} ${file.uploadDate} ${file.id}`}
                        key={file.filename}
                        id={file.isfolder === 1 ? file.id : file.filename}
                        style={{width: '100%', border: 'solid 2px white'}}>
                            {file.isfolder !== 1 ?
                            <div className="file" title='Right click to select.' style={{backgroundImage: `url(https://${address.address}/api/get/user/preview/${file.filename})`, backgroundSize: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                    <p style={{overflowWrap: 'anywhere', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.filename.slice(13)}</p>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', zIndex: 1}}>
                                        <img onClick={(e) => window.open(`/file/${e.currentTarget.classList[0]}`, 'blank')} title='Share File?' width={'70%'} className={`${file.filename} quick-share`} src={'/share.webp'} alt={`share ${file.filename}`}/>
                                        <img onClick={(e) => download(e.currentTarget.classList[0])} title='Download File?' width={'70%'} className={`${file.filename} quick-download`} src={'/download.webp'} alt={`download ${file.filename}`}/>
                                        <img onClick={(e) => favorite(e.currentTarget.classList[0])} title='Favorite File?' width={'70%'} className={`${file.filename} quick-star`} src={`${starByAuth ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`favourite ${file.filename}`}/>
                                        <img onClick={(e) => del(e.currentTarget.classList[0])} title='Delete File?' width={'70%'} className={`${file.filename} quick-delete`} src={'/trash.webp'} alt={`delete ${file.filename}`}/>
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
            <div>

            </div>
        </Wrapper>
    )
}

export default RecentFiles;