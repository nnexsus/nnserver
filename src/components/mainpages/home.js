import styled from 'styled-components'
import Cookies from 'js-cookie';

import RecentFiles from '../subpages/recentfiles';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Wrapper = styled.div`

    p, h1, h2, h3, h4, h5, a {
        font-family: "Comp";
    }

    .main {
        margin: 20px 5% 20px 5%;
        margin-top: 40px;
        display: flex;
        background-color: var(--baseThemeDarker);
        border: solid 2px black;
    }

    .starred {
        background-color: var(--baseThemeDarker);
        padding: 10px;
        margin: 10px;
        border: solid var(--accentTheme) 2px;
        box-shadow: 0px 0px 6px 3px black;
        transition: 0.5s ease-in-out;

        :hover {
            box-shadow: 0px 0px 12px 3px black;
        }
    }

    .welcome {
        text-align: center;
        color: var(--accentTheme);
        padding: 10px;
        background-color: var(--baseThemeEvenDarker);
        border: solid white 4px;
        box-shadow: var(--accentTheme) 0 0 4px 4px;
        animation: welcomegrow 2s forwards;
    }

    @media screen and (max-width: 675px) {
        .main {
            display: flex;
            flex-direction: column;
            margin: 3px;

            img {
                width: 60%;
            }
        }
    }

    .test2 {
        --aug-inlay-bg: rgba(0,0,0,0);
    }

    @keyframes welcomegrow {
        0% {
            letter-spacing: 6px;
        } 100% {
            letter-spacing: 1px;
        }
    }
`;

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (Cookies.get('cG9zdFVzZXJuYW1l') === null) {
            return navigate("/signin")
        }
    }, [])

    return (
        <Wrapper>
            <iframe title='cookie for visited panel on my site' style={{display: 'none'}} src='https://nnexsus.net/setcookie/nnserver'/>
            <div>
                <div style={{background: 'var(--baseThemeEvenDarker)', backgroundSize: 'cover', margin: '40px 10px', border: 'var(--accentTheme) 1px solid'}}>
                    <div className='test2' style={{backdropFilter: 'blur(8px)', padding: '40px'}}>
                        <h1 className='welcome'>Welcome back, {Cookies.get('dXNlcm5hbWU=') ? Cookies.get('dXNlcm5hbWU=').split(".")[0] : null}.</h1>
                        <div style={{border: 'solid white 4px', padding: '10px', backgroundColor: 'var(--baseThemeDarker)', backgroundImage: 'url(/tri.webp)', backgroundSize: 'contain'}}>
                            <RecentFiles/>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Home;