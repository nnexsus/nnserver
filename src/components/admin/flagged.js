import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import JSZip from 'jszip';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

const Wrapper = styled.div`
    margin: 15px;
    border: solid black 2px;
    padding: 15px;
    height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;

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
        grid-template-columns: repeat(2, calc(90% / 2));
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

const Flags = () => {

        const [state, dispatch] = useContext(LinkContext);

        const [files, setFiles] = useState([]);
        const [fileStore, setFileStore] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');

        const onUpdate = (id) => sessionStorage.setItem('dragFile', id)
        const ping = useRef(false)

        const id = useParams() 

        const username = Cookies.get('cG9zdFVzZXJuYW1l')
        const screenname = Cookies.get('dXNlcm5hbWU=')
        const sesk = Cookies.get('sesk')
        const adminkey = Cookies.get('adminkey')

        useEffect(() => {
            if (!fileStore) {
                return
            }
            if (!searchTerm || searchTerm === '') {
                setFiles(fileStore)
            }
        }, [searchTerm, setSearchTerm])

        useEffect(() => {
            if (ping.current) return;
            ping.current = true;
            const data = {
                'username': username,
                "sesk": sesk,
                "adminkey": adminkey
            }
            async function render() {
                await axios.get(`https://${address.address}/api/admin/flags/${username}/${sesk}/${adminkey}`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                })
            }
            render()
        }, [files])


        const download = (link, name, type) => {
            saveAs(link, `${name}.${type}`)
        }

      const del = (filename) => {
        const data = {
            "username": username,
            "filename": filename,
            "screenname": screenname,
            "sesk": sesk,
            "adminkey": adminkey
        }
        axios.post(`https://${address.address}/api/admin/delete/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
      }

    const contextMenu = (e) => {
        e.preventDefault()
        dispatch({type: 'update_context', contextID: e.currentTarget.id, contextLoc: [e.pageX, e.pageY], contextType: e.currentTarget.classList})
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e, id) => {
        e.preventDefault()

        const data = {
            filename: sessionStorage.getItem('dragFile'),
            foldername: id,
            mode: false
        }

        axios.post(`https://${address.address}/api/folder/sync`, data).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    return (
        <Wrapper>
            <div style={{display: 'grid', gridTemplateColumns: '80% 20%', gridTemplateRows: '100%', padding: '10px 0', height: '50px'}}>
                <input autoComplete='false' className='searchbar' id='search' type={"text"} placeholder="Search flagged files." value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
                <div className='refresh-div'>
                    <img alt='decor' title='Refresh Files' className='refresh' id='refresh' onClick={() => setFiles([])} height={'100%'} src='/refresh.webp'/>
                    <p style={{color: 'white'}}>Refresh Flagged Files</p>
                </div>
            </div>
            <div className='fileContainer'>
                {files && files.length >= 0 ? files.map((file) => {
                    return (
                        <div draggable
                        onContextMenu={(e) => contextMenu(e)}
                        onDragStart={(e) => onUpdate(e.currentTarget.id)}
                        onDragEnd={() => onUpdate(null)}
                        onDragOver={(e) => file.isfolder === 1 ? onDragOver(e, e.currentTarget.classList[4]) : null}
                        onDrop={(e) => file.isfolder === 1 ? onDrop(e, e.currentTarget.classList[4]) : null}
                        className={`${file.type} ${file.starByAuth} ${file.size} ${file.uploadDate} ${file.id} ${file.public}`}
                        key={file.filename}
                        id={file.filename}
                        style={{width: '100%', border: 'solid 2px white'}}>
                            {file.isfolder !== 1 ?
                            <div className="file" title='Right click to select.' style={{backgroundImage: `url(https://${address.address}/api/get/user/preview/${file.filename})`, backgroundSize: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                    <p style={{overflowWrap: 'anywhere', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.filename.slice(13)}</p>
                                    <p style={{overflowWrap: 'anywhere', background: 'var(--alert)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.flags}</p>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', zIndex: 1}}>
                                        <img onClick={(e) => window.open(`/file/${e.currentTarget.classList[0]}`, 'blank')} title='Share File?' width={'70%'} className={`${file.filename} quick-share`} src={'/share.webp'} alt={`share ${file.filename}`}/>
                                        <img onClick={(e) => download(e.currentTarget.classList[0])} title='Download File?' width={'70%'} className={`${file.filename} quick-download`} src={'/download.webp'} alt={`download ${file.filename}`}/>
                                        <img onClick={(e) => del(e.currentTarget.classList[0])} title='Delete File?' width={'70%'} className={`${file.filename} quick-delete`} src={'/trash.webp'} alt={`delete ${file.filename}`}/>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="file" title='Right click to select, left click to enter.' style={{backgroundImage: `url(/folder.webp)`, backgroundSize: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                                <a style={{height: '90%', padding: '5px'}} href={`/folder/${file.id}`}><div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                    <p style={{overflowWrap: 'anywhere', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px', color: 'white'}}>{file.filename}</p>
                                    <p style={{overflowWrap: 'anywhere', background: 'var(--alert)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.flags}</p>
                                </div></a>
                            </div>}
                        </div>
                    )
                })
                : null}
            </div>
        </Wrapper>
    )
}

export default Flags;