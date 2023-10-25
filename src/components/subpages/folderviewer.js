import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { saveAs } from 'file-saver';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from '../states/context';
import ContextMenu from '../states/contextMenu';
import address from '../config.json';

import '../css/file.css';

const FolderViewer = () => {

        const [state, dispatch] = useContext(LinkContext);

        const [files, setFiles] = useState([]);
        const [fileStore, setFileStore] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [currSort, setCurrSort] = useState('');
        const [dir, setDir] = useState(true)

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
                axios.get(`https://${address.address}/api/folder/${username}/${id.id}`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('storedFiles', `${t}`)
                })
            } else {
                var direction = dir ? 'DESC' : 'ASC';
                if(value === currSort) setDir(!dir); 
                axios.get(`https://${address.address}/api/folder/${username}/${id.id}/${value}/${direction}`, data).then((response) => {
                    if (response.status !== 200) {
                        dispatch({type: 'update_message', message: response.data})
                        return
                    }
                    setFiles(response.data)
                    setFileStore(response.data)
                    var t = JSON.stringify(response.data)
                    localStorage.setItem('storedFiles', `${t}`)
                })
                setCurrSort(value)
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
                removeFiles()
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

    const fileClick = (filename, type, starByAuth, size, uploadDate, id, publics) => {
        document.getElementById(filename).classList.contains('selected') ? 
        removeFiles() : addFile(filename, type, starByAuth, size, uploadDate, id, publics)
    }

    const addFile = (filename, type, starByAuth, size, uploadDate, id, publics) => {
        document.getElementById(filename).classList.add('selected')
        sessionStorage.setItem('contextID', sessionStorage.getItem('contextID') + filename + ",")
        sessionStorage.setItem('filetypes', sessionStorage.getItem('filetypes') + type + ",")
        sessionStorage.setItem('favorited', sessionStorage.getItem('favorited') + starByAuth + ",")
        sessionStorage.setItem('filesizes', sessionStorage.getItem('filesizes') + size + ",")
        sessionStorage.setItem('uploadDates',sessionStorage.getItem('uploadDates') + uploadDate + ",")
        sessionStorage.setItem('fileids', sessionStorage.getItem('fileids') + id + ",")
        sessionStorage.setItem('public', sessionStorage.getItem('public') + publics + ",")
    }

    const removeFiles = () => {
        sessionStorage.setItem('contextID', '')
        sessionStorage.setItem('filetypes', '')
        sessionStorage.setItem('favorited', '')
        sessionStorage.setItem('filesizes', '')
        sessionStorage.setItem('uploadDates', '')
        sessionStorage.setItem('fileids', '')
        sessionStorage.setItem('public', '')
        document.querySelectorAll('.selected').forEach((el) => {
            el.classList.remove('selected')
        })
    }

    const [contextMenuCount, setContextMenuCount] = useState(0)
    var contextChildren = []

    const contextMenu = (e) => {
        //dispatch({type: 'update_browserCount', browser: state.browser - 1})
        e.preventDefault()
        if (sessionStorage.getItem('contextID').split(',').length < 3) {
            sessionStorage.setItem('contextID', e.currentTarget.id + ",")
            sessionStorage.setItem('filetypes', e.currentTarget.classList[0] + ",")
            sessionStorage.setItem('favorited', e.currentTarget.classList[1] + ",")
            sessionStorage.setItem('filesizes', e.currentTarget.classList[2] + ",")
            sessionStorage.setItem('uploadDates', e.currentTarget.classList[3] + ",")
            sessionStorage.setItem('fileids', e.currentTarget.classList[4] + ",")
            sessionStorage.setItem('public', e.currentTarget.classList[5] + ",")
        }
        setContextMenuCount(contextMenuCount + 1)
    }

    for(var x = 0; x < contextMenuCount; x++) {
        var totalspace = 0;
        sessionStorage.getItem('filesizes').split(',').forEach((el) => {
            if (!isNaN(el) && parseInt(el) >= 0) {
                totalspace += parseInt(el)
            }
        })
        contextChildren = [<ContextMenu 
        uploadDates={sessionStorage.getItem('uploadDates')}
        filetypes={sessionStorage.getItem('filetypes')}
        favorited={sessionStorage.getItem('favorited')}
        filesizes={sessionStorage.getItem('filesizes')}
        fileids={sessionStorage.getItem('fileids')}
        publics={sessionStorage.getItem('public')}
        contextID={sessionStorage.getItem('contextID')} 
        number={x}
        totalspace={totalspace}
        />]
    } //a little odd, but it works the way i intended! its also a hell of a lot better than the context version

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e, id) => {
        e.preventDefault()
        dispatch({type: 'update_message', message: "Moving to folder."})
        sessionStorage.getItem('contextID').split(',').forEach((el) => {
            if (el.length > 0) {
                const data = {
                    filename: el,
                    foldername: id,
                    mode: false
                }
                axios.post(`https://${address.address}/api/folder/sync`, data).then((response) => {
                    dispatch({type: 'update_message', message: response.data})
                })
            }
        })
        localStorage.removeItem('storedFiles')
        localStorage.removeItem('favoriteStore')
        localStorage.removeItem('recentStored')
    }

    const refresh = () => {
        localStorage.removeItem('storedFiles')
        removeFiles()
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

    useEffect(() => {
        removeFiles()
    }, [])

    return (
        <div className='scrollbar fileviewer-container'>
            <div>
                {contextChildren.map((el) => {
                    return (
                        <div key={`browser-${el.props.number}`} style={{position: 'absolute', top: '0'}} id={`context-window-${el.props.number}`} className='window'>
                            {el}
                        </div>
                    )
                })}
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '40% 60%', gridTemplateRows: '100%', padding: '10px 0', height: '50px'}}>
                <input autoComplete='false' className='searchbar' id='search' type={"text"} placeholder="Search for files." value={searchTerm} onChange={(e) => setSearchTerm(e.currentTarget.value)}/>
                <div id='rowSelect' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', border: 'solid 2px var(--baseTheme)', background: 'var(--baseThemeEvenDarker)', padding: '10px 10px 10px 0'}}>
                    <label style={{color: "white", fontFamily: "Comp", marginLeft: "30px"}}>Sort By:</label>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='default' className='sort-button' title='Sort by Default (id), double click to invert.' width={'30px'} src='/default.webp'/><p style={{color: 'white', margin: 0}}>None</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='uploadDate' className='sort-button' title='Sort by closest sate, double click to sort by furthest date.' width={'30px'} src='/date.webp'/><p style={{color: 'white', margin: 0}}>Date</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='size' className='sort-button' title='Sort by smallest, double click to sort by largest size.' width={'30px'} src='/upload.webp'/><p style={{color: 'white', margin: 0}}>Size</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='type' className='sort-button' title='Sort by filetype, double click to invert.' width={'30px'} src='/folder.webp'/><p style={{color: 'white', margin: 0}}>Type</p></div>
                    <div className='sort-div'><img alt='decor' onClick={(e) => sort(e.currentTarget.id)} id='downloads' className='sort-button' title='Sort by most downloads?, double click to sort by least downloads.' width={'30px'} src='/download.webp'/><p style={{color: 'white', margin: 0}}>Save</p></div>
                    <div style={{display: 'flex', height: '100%'}}>
                        <div className='refresh-div'>
                            <img alt='decor' title='Refresh Files' className='refresh' id='refresh' onClick={() => refresh()} height={'25px'} src='/refresh.webp'/>
                            <p style={{color: 'white', background: 'var(--baseThemeEvenDarker)', padding: '3px 0 15px 0'}}>Refresh Files</p>
                        </div>
                    </div>
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
                        onClick={() => fileClick(file.filename, file.type, starByAuth, file.size, file.uploadDate, file.id, file.public)}
                        key={file.filename}
                        id={file.filename}
                        style={{width: '100%', border: 'solid 2px white', cursor: 'pointer', backgroundColor: `${file.isfolder ? file.type.split('.')[1] : 'transparent'}`}}>
                            {file.isfolder !== 1 ?
                            <div className="file" title='Click to select, right click for info. Drag + Hold Shift to move to a folder.' style={{backgroundImage: `url(https://${address.address}/api/get/user/preview/${file.filename})`}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                    <p className='silent-scroll' style={{overflowWrap: 'anywhere', overflowY: 'scroll', overflowX: 'hidden', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.filename.slice(13)}</p>
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
                                    <p className='silent-scroll' style={{overflowWrap: 'anywhere', overflowY: 'scroll', overflowX: 'hidden', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px', color: 'white'}}>{file.filename}</p>
                                </div></a>
                            </div>}
                        </div>
                    )
                })
                : null}
            </div>
        </div>
    )
}

export default FolderViewer;