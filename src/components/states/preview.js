import styled from "styled-components";

import { useContext, useEffect } from "react";
import { LinkContext } from "./context";

const Wrapper = styled.div`

    .blur-container {
        position: absolute;
        width: 96%;
        height: 96vh;
        top: 0;
        left: 0;
        z-index: 11;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        margin: 2vh 2%;
        border: solid 3px var(--accentTheme);
        transition: 1s ease;
    }

    .preview-container {
        margin: 5vh 5%;
        width: 90%;
        height: 90vh;
    }

    .preview-hide {
        //height: 0vh;
        display: none;
        opacity: 0;
    }

    .preview-show {
        //height: 100vh;
        display: block;
        opacity: 1;
        animation: grow-in 1s forwards;
    }

    iframe {
        width: 100%;
        height: 85vh;
        border: solid 6px var(--10blue);
    }

    @keyframes grow-in {
        0% {
            opacity: 0;
            height: 0vh;
        } 100% {
            opacity: 1;
            height: 100vh;
        }
    }
`;

const Preview = () => {

    const [state, dispatch] = useContext(LinkContext);

    useEffect(() => {
        if(!state.preview) {
            document.getElementById('preview').classList.add('preview-hide')
            document.getElementById('preview').classList.remove('preview-show')
        } else {
            document.getElementById('preview').classList.add('preview-show')
            document.getElementById('preview').classList.remove('preview-hide')
        }
      }, [state.preview])

    return (
        <Wrapper>
            <div id="preview" className="blur-container preview-hide">
                <div className="preview-container">
                    <button style={{background: 'red', border: 'solid black 2px', width: '50px', float: 'right', cursor: 'pointer', fontFamily: 'Comp'}} onClick={() => dispatch({type: 'update_preview', preview: false})}>X</button>
                    <div className="iframe-container">
                        <iframe title="File Preview" src={`${state.previewLink}`} />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Preview;