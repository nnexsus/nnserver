import styled from "styled-components";
import { useContext, useEffect } from "react";

import { LinkContext } from "./context";

const Wrapper = styled.div`

.toaster {
    animation: fade 3s forwards;
    //transition: 0.3s ease;
    :hover {
        animation: fadein 0.5s forwards;
    }
}

@keyframes fade {
    0% {
        opacity: 1;
    } 100% {
        opacity: 0.2;
    }
}

@keyframes fadein {
    0% {
        opacity: 0.2;
    } 100% {
        opacity: 1;
    }
}

    .upload-progress  {
        background-color: var(--baseThemeEvenDarker);
    }
    .upload-progress::-webkit-progress-bar {
        border: solid var(--baseTheme) 1px;
        background-color: ${props => props.prog > 45 ? 'var(--baseTheme)' : props.prog > 45 ? 'var(--baseThemeDarker)' : 'var(--baseThemeEvenDarker)'};
        background-image: url('/triheader.webp');
        background-position: center;
        background-size: 200%;
    }
    .upload-progress::-webkit-progress-value {
        border: solid var(--accentTheme) 1px;
        background-color: ${props => props.prog > 45 ? 'var(--accentTheme)' : props.prog > 45 ? 'var(--accentThemeDarker)' : 'var(--accentThemeEvenDarker)'};
    }
    .upload-progress::-moz-progress-bar {
        border: solid var(--accentTheme) 1px;
        background-color: ${props => props.prog > 45 ? 'var(--accentTheme)' : props.prog > 45 ? 'var(--accentThemeDarker)' : 'var(--accentThemeEvenDarker)'};
    }
`;

const Toaster = () => {

    const [state, dispatch] = useContext(LinkContext)

    return (
        <Wrapper className="toaster-container" style={{position: 'fixed', top: 0}}>
            {state.toaster ? 
                <div className="toaster" style={{background: 'var(--baseThemeEvenDarker)', border: 'solid black 2px', width: '30vw', opacity: 0.8, padding: '5px', position: 'absolute', top: '5vh', right: '-95vw', zIndex: '10', display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                    <button style={{background: 'var(--accentTheme)', color: 'white', border: 'solid black 2px', padding: '5px', margin: '5px', cursor: 'pointer'}} onClick={() => dispatch({type: 'update_toaster', toaster: false})}><p style={{margin: 0, color: 'black'}}>X</p></button>
                    <h2 style={{fontFamily: 'Comp', color: 'white', textAlign: 'center', margin: '0 10px 5px', padding: '15px 20px', background: 'var(--accentThemeEvenDarker)', border: 'var(--accentTheme) 1px solid'}}>{state.message}</h2>
                    <div>
                        {state.uploading ?
                            <progress className='upload-progress' prog={parseFloat(state.progress)} value={parseFloat(state.progress)} max={50}></progress>
                        : null}
                    </div>
                </div>
            : null}
        </Wrapper>
    )
}

export default Toaster;