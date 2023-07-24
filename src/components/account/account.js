import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
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
    h1, h2 {
        font-weight: 100;
    }
    .form {
        padding: 20px;
        margin: 0 auto;
        background-color: var(--baseThemeEvenDarker);
        border: solid var(--accentTheme) 2px;
        margin-top: 10px;
        text-align: center;
        color: white;
    }
    .formFloat {
        border: solid 1px black;
        padding: 0 50px;
        min-height: 150px;
        margin: 0 auto;
        --aug-inlay-bg: var(--baseThemeDarker);
        --aug-border-all: 1px;
        --aug-border-bg: rgba(0,0,0,0);
        filter: drop-shadow(0px 0px 10px black);
    }
    .fileForm {
        width: min-content;
        margin: 0 auto;
        margin-top: -15px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .fileInput {
        display: none;
    }
    .label {
        margin-bottom: 7px;
        padding: 10px;
        padding-bottom: 13px;
        inline-size: max-content;
        padding-right: 1000%;
        padding-left: 1000%;
        background: var(--accentThemeEvenDarker);
        box-shadow: 0px 0px 6px 0px black;
        font-family: 'Comp';
        transition: 0.3s ease-in-out;
        cursor: pointer;
        :hover {
            color: black;
            background-color: var(--accentTheme);
            transform: scale(1.01);
            box-shadow: 0px 0px 12px 0px black;
        }
    }
    .submit {
        background-color: var(--accentThemeEvenDarker);
        border: solid var(--baseThemeDarker) 1px;
        padding: 10px;
        box-shadow: 0px 0px 6px 0px black;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        :hover {
            background-color: var(--accentTheme);
            transform: scale(1.1);
            box-shadow: 0px 0px 12px 0px black;
        }
    }
    .usage {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url('/tri.webp');
        background-size: contain;
    }
    .settings {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .usage, .settings {
        margin: 50px;
        padding: 20px;
        background-color: var(--baseThemeDarker);
        font-family: "Comp";
        color: white;
        border: solid var(--accentTheme) 1px;
        button {
            margin: 10px;
            background-color: var(--accentThemeDarker);
            border: var(--baseTheme) solid 2px;
            padding: 5px;
            cursor: pointer;
            transition: 0.1s ease-in-out;
        }
        .deleteConfirm {
            background-color: var(--accentTheme);
        }
        input[type=password] {
            padding: 20px;
            background-color: var(--accentTheme);
            margin: 10px;
            border: solid black 2px;
            font-family: "Comp";
            color: var(--accentTheme);
        }
    }
    .password, .delete {
        :hover {
            background-color: var(--accentTheme);
        }
        :active {
            background-color: var(--alert);
        }
    }
    .fileContainer {
        display: grid;
        grid-template-columns: repeat(5, calc(90% / 5));
        gap: 15px;
        align-items: center;
        background-color: var(--baseTheme);
        margin: 15px 50px 0;
        padding: 5px;
        border: solid var(--accentThemeDarker) 2px;
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
    .quick-star, .quick-download, .quick-delete, .quick-share, .quick-private {
        cursor: pointer;
        aspect-ratio: 1/1;
        box-shadow: 0 0 2px 0px black;
        padding: 3px;
        transition: 0.1s ease;
    }
    .quick-star {
        background: var(--darkerTeal); 
        grid-row: 2;
        :hover {
            background: var(--evenDarkerTeal); 
        }
    }
    .quick-download {
        background: var(--darkerBlue);
        grid-row: 2;
        :hover {
            background: var(--evenDarkerBlue); 
        }
    }
    .quick-share {
        background: var(--10purple);
        grid-row: 2;
        :hover {
            background: var(--60); 
        }
    }
    .quick-delete {
        background: var(--fsLarge);
        grid-row: 2;
        :hover {
            background: var(--fsVeryLarge); 
        }
    }
    .quick-private {
        background: var(--accentRed);
        grid-row: 1;
        grid-column: 4;
        :hover {
            background: var(--accent); 
        }
    }
`;

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

    const download = (link, name, type) => {
        saveAs(link, `${name}.${type}`)
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

    return (
        <Wrapper>
            <div>
                {usageset ? 
                <div className='usage'>
                    <h1 style={{fontSize: '54px', color: 'white'}}>Account</h1>
                    <hr style={{height: '0px', width: '100%', border: 'solid var(--accentTheme) 1px'}}/>
                <div style={{display: 'flex'}}>
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
                                    <div className="inside-circle"> {usage.percentUsed * 100}% </div>
                                </div>
                            </div>
                        </RadialProgress>
                        <p>If you need additional storage, please contact <i>nnexsus.service@gmail.com</i> with the header: <i>Storage Addition Needed for nnexsus-server</i>.</p>
                    </div>
                <div className='settings' style={{backgroundColor: 'var(--baseThemeEvenDarker)'}}>
                    <h2>Account Options</h2>
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
                <h1 style={{color: 'white', textAlign: 'center', gridColumn: 'span 5', background: 'var(--baseThemeEvenDarker)', border: 'solid var(--accentTheme) 1px', padding: '10px 0'}}>Public Files</h1>
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
        </Wrapper>
    )

}

export default Account;