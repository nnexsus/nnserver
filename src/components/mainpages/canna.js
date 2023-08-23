import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

const Wrapper = styled.div`
    .verify {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background-color: var(--baseThemeDarker);

        font-family: "Comp";
        p {
            color: white;
        }
        a {
            color: white;
            padding: 10px;
            border: var(--accentTheme) solid 1px;
            background-color: var(--baseThemeEvenDarker);
            margin: 10px;
        }

        margin: 10px;
        padding: 10px;

        background-color: var(--baseThemeDarker);
        border: solid var(--accentTheme) 2px;
    }
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
        background-color: var(--baseThemeDarker);
        background-image: url('/tri.webp');
        background-size: 15vw;
        border: solid black 2px;
        margin-top: 10px;
        text-align: center;
        display: grid;
        grid-template-columns: 80% 20%;
        grid-template-rows: 8% 92%;
    }
    @media screen and (max-width: 675px) {
        p {
            font-size: 12px;
        }
        h1, form {
            font-size: 70%;
        }
        h2 {
            font-size: 16px;
        }
    }
    #form-file-upload {
        max-width: 100%;
        text-align: center;
        position: relative;
    }
    #input-file-upload {
        display: none;
    }
    #label-file-upload {
        display: flex;
        align-items: center;
        justify-content: center;
        border: dashed 2px var(--accentTheme);
        background-color: var(--baseThemeEvenDarker);
        color: white;
        button {
            color: white;
        }
    }
    .upload-button {
        cursor: pointer;
        padding: 0.25rem;
        font-size: 1rem;
        border: none;
        font-family: 'Oswald', sans-serif;
        background-color: transparent;
    }
    .upload-button:hover {
        text-decoration-line: underline;
    }
    .drag-active {
        background-color: var(--baseThemeDarker);
    }
    #drag-file-element {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    }
    .folder {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 1px; 
        margin: 8px; 
        margin-left: 0; 
        background-color: var(--accentTheme); 
        background-size: 100%;
        background-repeat: no-repeat;
        border: var(--baseThemeEvenDarker) solid 3px;
        cursor: pointer;
        transition: 0.2s ease;
        p {
            color: white;
            background-color: black;
            padding: 2px;
        }
        :hover {
            scale: 1.1;
            background-color: var(--accentThemeDarker); 
            border: var(--baseThemeEvenDarker) solid 3px;
        }
        :active {
            scale: 0.9;
            background-color: var(--accentThemeEvenDarker); 
            border: var(--baseTheme) solid 3px;  
        }
    }
    .newfold {
        background-color: var(--accentThemeDarker);
        transition: 0.2s ease-in-out;
        :hover {
            background-color: var(--accentTheme);
        }
    }
    .addfold-button {
        margin: 0;
        padding: 0px 5px;
        background: var(--accentThemeEvenDarker);
        color: white;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        :hover {
            scale: 1.1;
            background: var(--accentThemeDarker);
        }
        :active {
            scale: 0.9;
            background: var(--accentTheme);
        }
    }
    .delete-folder {
        background-color: var(--baseThemeEvenDarker);
        border: solid var(--accentThemeEvenDarker) 1px;
        cursor: pointer;
        transition: 0.3s ease;
        :hover {
            scale: 1.1;
            background-color: var(--baseThemeDarker);
            border: solid var(--accentThemeDarker) 1px;
        }
        :active {
            scale: 0.9;
            background-color: var(--baseTheme);
            border: solid var(--accentThemeEvenDarker) 1px;
        }
    }
`;

const Canna = () => {

    const [loading, setLoading] = useState(false);
    const [folders, setFolders] = useState(false)

    const [state, dispatch] = useContext(LinkContext);
    const id = useParams()

    const ping = useRef(false)
    const navigate = useNavigate()

    const username = Cookies.get('cG9zdFVzZXJuYW1l')
    const sesk = Cookies.get('sesk')

    useEffect(() => {
        if (ping.current) return;
        ping.current = true;
        if (Cookies.get('cG9zdFVzZXJuYW1l') === null) {
            return navigate("/signin")
        }
        const data = {
            'username': username
        }
        axios.get(`https://${address.address}/api/folders/${username}`, data).then((response) => {
            if (response.status !== 200) {
                dispatch({type: 'update_message', message: response.data})
                return
            }
            setFolders(response)
        })
    }, [])

    const DragDropFile = () => {

        const [dragActive, setDragActive] = useState(false)
        const inputRef = useRef(null)
        const id = useParams()
        
        const handleDrag = function(e) {
            e.preventDefault()
            e.stopPropagation()
            if ((e.type === "dragenter" || e.type === "dragover") && !e.shiftKey) {
                setDragActive(true)
            } else if (e.type === "dragleave" || e.shiftKey) {
                setDragActive(false)
            }
        }

        function handleFiles(files) {
            for (var x = 0; x < files.length; x++) {
                dispatch({type: 'start_upload'})
                const config = {
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 50;
                        dispatch({type: 'update_progress', progress: progress})
                    }
                }
                var data = new FormData()
                data.append('file', files[x])
                data.append('username', Cookies.get('cG9zdFVzZXJuYW1l')) //this is the post-username
                data.append('screenname', Cookies.get('dXNlcm5hbWU=')) //this is the actual username
                data.append('infolder', id.id)
                data.append('sesk', sesk)
                axios.post(`https://${address.address}/api/canna/create`, data, config).then((response) => {
                    dispatch({type: 'update_message', message: "File upload queued."})
                })
            }
        }

        const handleDrop = function(e) {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
        };

        // triggers when file is selected with click
        const handleChange = function(e) {
            e.preventDefault();
            if (e.target.files && e.target.files[0]) {
                handleFiles(e.target.files);
            }
        };

        const onButtonClick = () => {
            inputRef.current.click();
          };

        return (
            <form id="form-file-upload" className={dragActive ? "drag-active" : ""} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                <label style={{background: 'var(--baseThemeEvenDarker)'}} id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                    <div>
                        <p style={{color: 'white'}}>Drag and drop your file or</p>
                        <button style={{color: 'white'}} className="upload-button" onClick={onButtonClick}>Click here to upload a file</button>
                    </div> 
                </label>
                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>
        )
      }

    return (
        <Wrapper>
            <div>
                <div className='form'>
                    <DragDropFile/>
                </div>
            </div>
            <div id='refresh'></div>
        </Wrapper>
    )
}

export default Canna;