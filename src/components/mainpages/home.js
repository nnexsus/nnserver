import Cookies from 'js-cookie';

import RecentFiles from '../subpages/recentfiles';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import '../css/home.css';

const Home = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if (Cookies.get('cG9zdFVzZXJuYW1l') === null) {
            return navigate("/signin")
        }
    }, [])

    return (
        <div className='home-container'>
            <iframe title='cookie for visited panel on my site' style={{display: 'none'}} src='https://nnexsus.net/setcookie/nnserver'/>
            <div>
                <div style={{background: 'var(--baseThemeEvenDarker)', backgroundSize: 'cover', margin: '40px 10px', border: 'var(--accentTheme) 1px solid'}}>
                    <div className='test2' style={{backdropFilter: 'blur(8px)', padding: '40px'}}>
                        <h1 className='welcome'>{Cookies.get('dXNlcm5hbWU=') ? `Welcome back, ${Cookies.get('dXNlcm5hbWU=').split(".")[0]}.` : 'Welcome to nnserver!'}</h1>
                        <div style={{border: 'solid white 4px', padding: '10px', backgroundColor: 'var(--baseThemeDarker)', backgroundImage: 'url(/tri.webp)', backgroundSize: 'contain'}}>
                            <RecentFiles/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;