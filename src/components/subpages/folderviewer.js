import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import JSZip from 'jszip';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        grid-template-columns: repeat(5, calc(90% / 5));
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

const FolderViewer = () => {

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

        const sort = (value) => {
            const data = {
                'username': username,
                'sesk': sesk
            }
            if (value === 'default') {
                axios.get(`https://${address.address}/api/folder/${username}`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('storedFiles', `${t}`)
                })
            } else if (value === 'date') {
                axios.get(`https://${address.address}/api/folder/${username}/date`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('storedFiles', `${t}`)
                })
            } else if (value === 'size') {
                axios.get(`https://${address.address}/api/folder/${username}/size`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('storedFiles', `${t}`)
                })
            } else if (value === 'favorite') {
                axios.get(`https://${address.address}/api/folder/${username}/favorite`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('storedFiles', `${t}`)
                })
            }
        }
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

            if (localStorage.getItem('storedFiles') === null) {
                const data = {
                    'username': username
                }
                async function render() {
                    await axios.get(`https://${address.address}/api/folder/${username}/${id.id}`, data).then((response) => {
                        if (response.status !== 200) {
                            dispatch({type: 'update_message', message: response.data})
                            return
                        }
                        var t = JSON.stringify(response.data)
                        localStorage.setItem('storedFiles', `${t}`)
                        setFiles(response.data)
                        setFileStore(response.data)
                    })
                }
                render()
            } else {
                setFiles(JSON.parse(localStorage.getItem('storedFiles')))
                setFileStore(JSON.parse(localStorage.getItem('storedFiles')))
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
          localStorage.removeItem('storedFiles')
          localStorage.removeItem('favoriteStore')
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
          localStorage.removeItem('storedFiles')
          localStorage.removeItem('favoriteStore')
          localStorage.removeItem('recentStored')
            axios.post(`https://${address.address}/api/favorite/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                localStorage.setItem('favs', response.data.favs)
                dispatch({type: 'update_message', message: response.data.message})
            })
      }

      const downloadAll = () => {
        if (files.length > 1) {
            const zip = new JSZip()
            files.forEach(fi => {
                if (fi.isfolder !== 1) {
                    fetch(`https://${address.address}/api/get/user/acfile/${screenname}/${fi.filename}`).then(async (res) => {
                        if (res.status !== 200) {
                            dispatch({type: 'update_message', message: res.data})
                            return
                        }
                        const imgdata = await res.blob()
                        zip.file(`${fi.filename}`, imgdata)
                    })
                }
            });
    
            setTimeout(() => {
                zip.generateAsync({ type:'blob' }).then((cont) => {
                    saveAs(cont, 'download.zip')
                })
            }, [5000])
        } else {
            dispatch({type: 'update_message', message: "There are no files man."})
        }
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
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('recentStored')
        axios.post(`https://${address.address}/api/folder/sync`, data).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const refresh = () => {
        localStorage.removeItem('storedFiles')
        async function render() {
            await axios.get(`https://${address.address}/api/folder/${username}/${id.id}`).then((response) => {
                if (response.status !== 200) {
                    dispatch({type: 'update_message', message: response.data})
                    return
                }
                var t = JSON.stringify(response.data)
                localStorage.setItem('storedFiles', `${t}`)
                setFiles(response.data)
                setFileStore(response.data)
            })
        }
        render()
    }

    return (
        <Wrapper>
            <div style={{display: 'grid', gridTemplateColumns: '40% 60%', gridTemplateRows: '100%', padding: '10px 0', height: '50px'}}>
                <input autoComplete='false' className='searchbar' id='search' type={"text"} placeholder="Search for files." value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
                <div id='rowSelect' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', border: 'solid 2px var(--baseTheme)', background: 'var(--baseThemeEvenDarker)', padding: '10px 10px 10px 0'}}>
                    <div style={{display: 'flex', height: '100%'}}>
                        <div className='refresh-div'>
                            <img alt='decor' title='Refresh Files' className='refresh' id='refresh' onClick={() => refresh()} height={'100%'} src='/refresh.webp'/>
                            <p style={{color: 'white', background: 'var(--baseThemeEvenDarker)', padding: '3px'}}>Refresh Files</p>
                        </div>
                        <div className='downall-div'>
                            <img alt='decor' title='Download All Files' className='downall refresh' id='downall' onClick={() => downloadAll()} height={'100%'} src='/download.webp'/>
                            <p style={{color: 'white', background: 'var(--baseThemeEvenDarker)', padding: '3px'}}>Download All Files</p>
                        </div>
                    </div>
                    <label htmlFor='rowSelect' style={{color: "white", fontFamily: "Comp", marginLeft: "30px"}}>Sort By:</label>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='default' className='sort-button' title='Sort by Default?' width={'30px'} src='/default.webp'/><p style={{color: 'white', margin: 0}}>None</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='date' className='sort-button' title='Sort by Date?' width={'30px'} src='/date.webp'/><p style={{color: 'white', margin: 0}}>Date</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='size' className='sort-button' title='Sort by Size?' width={'30px'} src='/download.webp'/><p style={{color: 'white', margin: 0}}>Size</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='favorite' className='sort-button' title='Sort by Favorites?' width={'30px'} src='/starFilled.webp'/><p style={{color: 'white', margin: 0}}>Star</p></div>
                </div>
            </div>
            <div className='fileContainer'>
                {files && files.length > 0 ? files.map((file) => {
                    var starByAuth = false
                    AsyncStorage.getItem('favs', (err, res) => {
                        res.split(",").forEach((el) => {
                            if (el === file.filename) starByAuth = true;
                        })
                    })
                    return (
                        <div draggable
                        onContextMenu={(e) => contextMenu(e)}
                        onDragStart={(e) => onUpdate(e.currentTarget.id)}
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
                                        <img onClick={(e) => window.open(`/file/${e.currentTarget.name}`, 'blank')} title='Share File?' width={'70%'} name={`${file.filename}`} className={`quick-share`} src={'/share.webp'} alt={`share ${file.filename}`}/>
                                        <img onClick={(e) => download(e.currentTarget.name)} title='Download File?' width={'70%'} name={`${file.filename}`} className={`quick-download`} src={'/download.webp'} alt={`download ${file.filename}`}/>
                                        <img onClick={(e) => favorite(e.currentTarget.name)} title='Favorite (star) File?' width={'70%'} name={`${file.filename}`} className={`quick-star`} src={`${starByAuth ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`favourite ${file.filename}`}/>
                                        <img onClick={(e) => del(e.currentTarget.name)} title='Delete File?' width={'70%'} name={`${file.filename}`} className={`quick-delete`} src={'/trash.webp'} alt={`delete ${file.filename}`}/>
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
        </Wrapper>
    )
}

export default FolderViewer;