import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { saveAs } from 'file-saver';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

const Wrapper = styled.div`
    background-color: var(--baseThemeDarker);
    margin: 30px 250px 30px 250px;
    border: solid var(--accentTheme) 2px;
    padding: 15px;

    p, h1, h2, h3, h4 {
        font-family: "Comp";
    }

    .hidden {
        display: none;
    }

    .file {
        width: 100%;
        aspect-ratio: 1;
        padding: 0px;
        margin: 5px;

        display: flex;
        flex-direction: column-reverse;

        border: solid var(--accentTheme) 1px;
        background: var(--baseTheme);
        color: white;
        text-align: center;
        transition: 0.1s ease-in-out;
        z-index: 0;
        overflow: hidden;
        image-rendering: pixelated;

        :hover {
            transform: scale(1.025);
            z-index: 5;
        }

        p {
            text-shadow: 0 0 3px black;
            font-size: 13px;
        }
    }

        .srcImg {
            margin: auto;
            width: 80%;
            cursor: pointer;
        }

        .mediaFrame {
            background-color: white;
            margin: auto;
            width: 95%;
            grid-column-start: 1;
            grid-column-end: 3;
        }

        .author {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px;

            img {
                margin: 15px;
                width: 60px;
                height: 60px;
            }
        }

    .quick-star, .quick-download, .quick-flag, .quick-share {
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
    .quick-flag {
        background: var(--fsLarge); 
        :hover {
            background: var(--fsVeryLarge); 
        }
    }

    .unlock {
        padding: 10px;
        background-color: var(--accentTheme);
        border: solid var(--accentThemeEvenDarker) 1px;
        margin: 5px;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        :hover {
            background-color: var(--accentThemeDarker);
            border: solid var(--accentThemeEven) 1px;
        }
        :active {
            background-color: var(--accentThemeEvenDarker);
            border: solid var(--accentTheme) 1px;
        }
    }
`;

const FileSize = styled.p`
    color: ${prop => `rgba(${(prop.size / 10000000) * 5},${(255 - (prop.size / 10000000) * 5)},${(255 - (prop.size / 10000000) * 5)},1)`};
`;


const SingleFile = () => {

    const [state, dispatch] = useContext(LinkContext);

    const [file, setFile] = useState(null)
    const [auth, setAuth] = useState(null)

    var author = Cookies.get('cG9zdFVzZXJuYW1l')
    const id = useParams()
    const data = {
        author: author
    }

    if (!file) {
        axios.get(`https://${address.address}/api/get/${id.id}`, data).then((res) => {
            if (res.status !== 200) {
                dispatch({type: 'update_message', message: res.data})
                return
            }
            setFile(res.data[0])
        })
    }

    useEffect(() => {
        if (file) {
            axios.get(`https://${address.address}/api/user/${file.author}`).then((response) => {
                if (response.status !== 200) {
                    dispatch({type: 'update_message', message: response.data})
                    return
                }
                setAuth(response.data[0])
            })
        }
    }, [file, setFile])

    const download = (filename, downloads) => {
        saveAs(`https://arina.lol/api/get/user/acfile/${filename}`, `${filename}`)
        dispatch({type: 'update_message', message: 'Downloading File...'})
        axios.post(`https://${address.address}/api/download/${downloads}/${filename}`)
    }

    const unlock = () => {
        const file = id.id;
        const username = Cookies.get("cG9zdFVzZXJuYW1l")
        const sesk = Cookies.get('sesk')
        const data = {
            "author": username,
            "sesk": sesk
        }
        axios.post(`https://${address.address}/api/private/${file}`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const flag = (filename) => {
        const username = Cookies.get("cG9zdFVzZXJuYW1l")
        const sesk = Cookies.get('sesk')
        const data = {
            "author": username,
            "sesk": sesk,
            "filename": filename
        }
        axios.post(`https://${address.address}/api/flag`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    const copyLink = async (filename) => {
        await navigator.clipboard.writeText(`https://nnexsus-server.netlify.app/file/${filename}`);
        dispatch({type: 'update_message', message: "Copied link to clipboard."})
    }

    return (
        <Wrapper>
            <div>
                {file ? 
                    <div className={`${file.type} ${file.starByAuth} ${file.size} ${file.uploadDate} ${file.public}`} key={file.filename} id={file.filename} style={{width: '100%', border: 'solid 2px white'}}>
                        <div className="file" title='Right click to select.' style={{backgroundImage: `url(https://${address.address}/api/get/user/preview/${file.filename})`, backgroundSize: '90%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%'}}>
                                <p style={{overflowWrap: 'anywhere', background: 'rgba(0,0,0,0.8)', padding: '2px 4px', border: 'solid white 2px', marginTop: '-10px'}}>{file.filename.slice(13)}</p>
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 25%)', zIndex: 1}}>
                                    <img onClick={(e) => copyLink(e.currentTarget.name)} name={`${file.filename}`} title='Share File?' width={'70%'} className={`quick-share`} src={'/share.webp'} alt={`share ${file.filename}`}/>
                                    <img onClick={(e) => download(e.currentTarget.name, e.currentTarget.classList[1])} name={`${file.filename}`} title='Download File?' width={'70%'} className={`${file.downloads} quick-download`} src={'/download.webp'} alt={`download ${file.filename}`}/>
                                    <div style={{display: 'flex', flexDirection: 'column', padding: '5px'}}>
                                        <p style={{color: 'white', margin: 0}}>{file.uploadDate ? file.uploadDate.split("T")[0] : "Unknown"}</p>
                                        <FileSize size={file.size}>{file.size > 1000 ? 
                                        file.size > 1000000 ? 
                                        file.size > 1000000000 ? 
                                        (file.size / 1000000000).toFixed(2) + "GB" : 
                                        (file.size / 1000000).toFixed(2) + "MB" : 
                                        (file.size / 1000).toFixed(2) + "KB" : 
                                        file.size + "B"}</FileSize>
                                    {file.type.includes("image") || file.type.includes("video") ?
                                        <p style={{color: 'var(--10blue)', cursor: 'pointer', textDecoration: 'underline'}} id={`https://${address.address}/api/get/user/acfile/${file.filename}`} onClick={(e) => dispatch({type: 'update_previewLink', previewLink: e.currentTarget.id})}>Preview</p>
                                    :null}
                                    </div>
                                    <img onClick={(e) => flag(e.currentTarget.name)} name={`${file.filename}`} title='Flag (report) File?' width={'70%'} className={`quick-flag`} src={'/download.webp'} alt={`flag ${file.filename}`}/>
                                </div>
                            </div>
                        </div>
                            <div style={{background: 'var(--baseThemeEvenDarker)', margin: '20px', border: 'solid black 2px'}}>
                            {auth && auth.pfp ? 
                                <div className='author' style={{color: 'white'}}>
                                    <p style={{color: 'white'}}>Uploaded by:</p><img src={`https://${address.address}/api/get/user/pfp/${auth.pfp}`} alt="author profile"/><p style={{color: 'white'}}>{auth.username}</p> 
                                </div>
                            : null}
                            <div className='author'>
                                <p style={{color: 'white'}}>Downloads: {file.downloads}</p>
                            </div>
                        </div>
                        {Cookies.get('cG9zdFVzZXJuYW1l') === file.author ? <h2 style={{color: "white", textAlign: "center"}}>This link is public and secured. Copy, and send it to your friends!</h2> : null}
                        </div>
                : <div>
                    <p style={{color: 'white'}}>File is privated. If you're the author, you can make it public by hitting the unlock button below, or, right click a file in the fileviewer and hit the 'Unlock' button there.</p>
                    <button className='unlock' onClick={() => unlock()}><p>Unlock</p></button>
                  </div>
                }
            </div>
        </Wrapper>
    )

}

export default SingleFile;