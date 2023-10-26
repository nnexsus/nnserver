import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

import '../css/account.css';

const RadialProgress = styled.div`

    .circle-wrap {
        margin: 20px;
        width: 150px;
        height: 150px;
        background: var(--baseThemeEvenDarker);
        border: solid 10px var(--accentThemeDarker);
        box-shadow: 0 0 0 5px black;
    }
    .circle-wrap .circle .mask, .circle-wrap .circle .fill {
        width: 150px;
        height: 150px;
        position: absolute;
    }
    .circle-wrap .circle .mask {
        clip: rect(0px, 150px, 150px, 75px);
    }
    .circle-wrap .inside-circle {
        width: 122px;
        height: 122px;
        background: var(--baseTheme);
        line-height: 120px;
        text-align: center;
        margin-top: 14px;
        margin-left: 14px;
        font-family: "Comp";
        color: ${prop => `rgba(${(prop.size / 1000000000) * 5},${(255 - (prop.size / 1000000000) * 5)},${(255 - (prop.size / 1000000000) * 5)},1)`};
        position: absolute;
        z-index: 100;
        font-weight: 700;
        font-size: 3em;
        -webkit-text-stroke: black 0.1px;
        text-shadow: 0px 0px 2px black;
    }
    .mask .fill {
        clip: rect(0px, 75px, 150px, 0px);
        background-color: ${prop => `rgba(${(prop.size / 1000000000) * 5},${(255 - (prop.size / 1000000000) * 5)},${(255 - (prop.size / 1000000000) * 5)},1)`};
        border: solid 2px ${prop => `rgba(${(prop.size / 1000000000) * 5},${(255 - (prop.size / 1000000000) * 5)},${(255 - (prop.size / 1000000000) * 5)},1)`};
    }
    .mask.full, .circle .fill {
        animation: fill ease-in-out 3s;
        transform: ${prop => `rotate(${prop.value * 1.8}deg)`};
    }
    @keyframes fill{
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: ${prop => `rotate(${prop.value * 1.8}deg)`};
        }
    }
`;

const Account = () => {

    const [state, dispatch] = useContext(LinkContext);

    const [usageset, setUsageSet] = useState(false);
    const [usage, setUsage] = useState([]);
    const [del, setDel] = useState(false);
    const [password, setPassword] = useState('');
    const [publicP, setPublicP] = useState(null);

    const ping = useRef(false)
    const navigate = useNavigate()

    const username = Cookies.get('cG9zdFVzZXJuYW1l')
    const screenname = Cookies.get('dXNlcm5hbWU=')
    const sesk = Cookies.get('sesk')

    const deleteAccount = () => {
        const data = {
            "username": username,
            "screenname": screenname,
            "password": password,
            "sesk": sesk
        }

        axios.post(`https://${address.address}/api/deleteall`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            if (response.status === 200) {
                dispatch({type: 'update_message', message: response.data})
                setTimeout(() => {
                    navigate('/signout')
                }, [1000])
            }
        })
    }

    const sendEmail = () => {
        const email = Cookies.get('ZW1haWw=')
        const data = {
            "email": email,
            "sesk": sesk
        }

        axios.post(`https://${address.address}/api/forgot/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const contextMenu = (e) => {
        e.preventDefault()
        dispatch({type: 'update_context', contextID: e.currentTarget.id, contextLoc: [e.pageX, e.pageY], contextType: e.currentTarget.classList})
    }

    const download = (filename) => {
        const username = Cookies.get('dXNlcm5hbWU=') //this is the display username, like nnexsus to us
        saveAs(`https://arina.lol/api/get/user/acfile/${username}/${filename}`, `${filename}`)
        dispatch({type: 'update_message', message: 'Downloading File...'})
    }

    const delP = (filename) => {
        const data = {
            "author": username,
            "filename": filename,
            "screenname": screenname,
            "sesk": sesk
        }
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
      axios.post(`https://${address.address}/api/favorite/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
          localStorage.setItem('favs', response.data.favs)
          dispatch({type: 'update_message', message: response.data.message})
      })
    }

    const lock = (filename) => {
        const file = filename;
        const data = {
            "author": username,
        }
        axios.post(`https://${address.address}/api/private/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    useEffect(() => {
        setUsageSet(true)
    }, [usage])

    useEffect(() => {
        if (ping.current) return;
        ping.current = true;

        if (Cookies.get('cG9zdFVzZXJuYW1l') === null) {
           return navigate("/signin")
        }

        const data = {
            "username": username,
            "sesk": sesk
        }
        axios.get(`https://${address.address}/api/get/user/${username}/public`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            if (response.status !== 200) {
                dispatch({type: 'update_message', message: response.data})
                return
            }
            setPublicP(response.data);
        })
        axios.get(`https://${address.address}/api/user/data/${username}/${sesk}`, {headers: {'content-type': "application/json"}}).then((response) => {
            if (response.status !== 200) {
                dispatch({type: 'update_message', message: response.data})
                return
            }
            setUsage(response.data)
        })
        
    }, [])

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

        axios.post(`https://${address.address}/api/folder/sync`, data).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const changeColor = (color, color2, color3) => {
        localStorage.setItem('defaultTheme', `${color}`)
        localStorage.setItem('defaultThemeDarker', `${color2}`)
        localStorage.setItem('defaultThemeEvenDarker', `${color3}`)
        dispatch({type: 'update_message', message: "Theme updated (refresh to apply)!"})
    }

    return (
        <div className='account-container'>
            <div>
                {usageset ? 
                <div className='usage'>
                    <h1 style={{fontSize: '54px', color: 'white'}}>Account</h1>
                    <hr style={{height: '0px', width: '100%', border: 'solid var(--accentTheme) 1px'}}/>
                <div className='account-flex-container' style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--baseThemeEvenDarker)', padding: '8px', border: 'solid 2px var(--baseTheme)'}}>
                        <h2>Storage Used</h2>
                        <label htmlFor="usage">[{(usage.size / 1000000000).toFixed(3)} Gb / {usage.totalSize / 1000000000} Gb]</label>
                        <RadialProgress id="radial" value={usage.percentUsed * 100} size={usage.size}>
                            <div className="circle-wrap">
                                <div className="circle">
                                    <div className="mask full">
                                        <div className="fill"></div>
                                    </div>
                                    <div className="mask half">
                                        <div className="fill"></div>
                                    </div>
                                    <div style={{zIndex: 1}} className="inside-circle"> {usage.percentUsed * 100}% </div>
                                </div>
                            </div>
                        </RadialProgress>
                        <p>If you need additional storage, please contact <i>nnexsus.service@gmail.com</i> with the header: <i>Storage Addition Needed for nnexsus-server</i>.</p>
                    </div>
                <div className='settings' style={{backgroundColor: 'var(--baseThemeEvenDarker)', flexDirection: 'column'}}>
                    <h2>Account Options</h2>

                    <div className="color-selector" style={{display: 'flex', border: 'groove black 2px', padding: '3px', backgroundColor: 'var(--accentThemeEvenDarker)'}}>
                        <h4>Default Color (requires refresh after change)</h4>
                        <div style={{background: 'var(--baseThemeEvenDarker)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'}}>
                            <button title='Status Code Green (Default)' className={'#03fc17 #0cab31 #07611c'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#03fc17', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Dessert Cherry Red' className={'#F94144 #ba2326 #7d1314'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#F94144', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Watercolor Canvas Orange' className={'#F3722C #c4581d #994314'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#F3722C', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Crayon Collage Orange' className={'#F9844A #cc6735 #853f1c'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#F9844A', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Sweet Spring Orange' className={'#F8961E #d47d13 #a15d0b'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#F8961E', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Specular Sunset Yellow' className={'#F9C74F #d4a73b #917123'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#F9C74F', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Summer Leafbud Green' className={'#90BE6D #6c944d #415c2d'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#90BE6D', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Carribean Shore Seagreen' className={'#43AA8B #328f73 #216651'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#43AA8B', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Frozen River Blue' className={'#4D908E #397371 #244f4e'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#4D908E', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Midday Icicle Blue' className={'#577590 #415a70 #2d4154'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#577590', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Spring Sky Blue' className={'#277DA1 #1c6b8c #13536e'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#277DA1', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                            <button title='Dark Lily Purple' className={'#4e27a1 #3c1b85 #2a1061'} onClick={(e) => changeColor(e.currentTarget.classList[0], e.currentTarget.classList[1], e.currentTarget.classList[2])} style={{background: '#4e27a1', width: '30px', height: '30px', borderRadius: '50%'}}></button>
                        </div>
                    </div>

                    <button className='password' onClick={() => sendEmail()}><p>Change Password</p></button>
                    <button className='delete' onClick={() => setDel(!del)}><p>Delete Account</p></button>
                    {del ? 
                        <form onSubmit={() => deleteAccount()}>
                            <input value={password} placeholder="Password" type="password" style={{background: 'black'}} onChange={(e) => setPassword(e.currentTarget.value)}/>
                            <button className='deleteConfirm'><p>Confirm Deletion</p></button> 
                            <p style={{color: "var(--alert)", backgroundColor: "var(--black)", padding: "10px"}}>This will delete all your uploaded files! Recovery will not be availble!</p>
                        </form>
                    : null}
                </div>
                </div>
                </div>
                : null}
            </div>
            <div className='fileContainer'>
                <h1 fileContainerTitle style={{color: 'white', textAlign: 'center', background: 'var(--baseThemeEvenDarker)', border: 'solid var(--accentTheme) 1px', padding: '10px 0'}}>Public Files</h1>
                {publicP && publicP.length >= 0 ? publicP.map((file) => {
                    var starByAuth = false
                    localStorage.getItem('favs').split(",").forEach((el) => {
                        if (el === file.filename) starByAuth = true;
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
                                        <img onClick={(e) => lock(e.currentTarget.name)} title='Private File?' width={'70%'} name={`${file.filename}`} className={`quick-private`} src={'/lock.webp'} alt={`private ${file.filename}`}/>
                                        <img onClick={(e) => window.open(`/file/${e.currentTarget.name}`, 'blank')} title='Share File?' width={'70%'} name={`${file.filename}`} className={`quick-share`} src={'/share.webp'} alt={`share ${file.filename}`}/>
                                        <img onClick={(e) => download(e.currentTarget.name)} title='Download File?' width={'70%'} name={`${file.filename}`} className={`quick-download`} src={'/download.webp'} alt={`download ${file.filename}`}/>
                                        <img onClick={(e) => favorite(e.currentTarget.name)} title='Favorite (star) File?' width={'70%'} name={`${file.filename}`} className={`quick-star`} src={`${starByAuth ? "/starFilled.webp" : "/starEmpty.webp" }`} alt={`favourite ${file.filename}`}/>
                                        <img onClick={(e) => delP(e.currentTarget.name)} title='Delete File?' width={'70%'} name={`${file.filename}`} className={`quick-delete`} src={'/trash.webp'} alt={`delete ${file.filename}`}/>                                    
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
    )

}

export default Account;