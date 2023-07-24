import styled from 'styled-components';

import Open from '../open';

const Wrapper = styled.div`

    margin: 0 auto;
    margin-top: 40px;
    padding: 10px;
    border: solid var(--accentTheme) 1px;
    border-radius: 10px;
    background-color: var(--baseThemeDarker);
    text-align: center;
    max-width: 90%;
    margin-top: 60px;
    transform: translate(0px, -25px);

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1, h2, h3, h4, p {
        font-family: "Comp";
    }

    .about {
        padding: 8px;
        background-color: var(--baseThemeEvenDarker);
        border-radius: 10px;
        width: 80%;
        border: solid 2px var(--accentTheme);
        transition: 0.3s ease-in-out;
        .aboutTitle {
            background-color: var(--accentThemeEvenDarker);
            border-radius: 15px;
        }
    }

    a {
        text-decoration: none;
        color: var(--accentThemeDarker);
        margin: 5px;
    }

    .mediaLink {
        margin: 10px;
        padding: 5px 75px 5px 75px;
        border: black solid 2px;
        background-color: var(--accentThemeDarker);
        height: 100%;
        transition: 0.3s ease;
        h2 {
            color: var(--accentThemeDarker);
            background-color: var(--baseThemeEvenDarker);
            transition: 0.3s ease;
            letter-spacing: 1px;
        }
        :hover {
            scale: 1.025;
            background-color: var(--accentTheme);
            h2 {
                color: var(--accentTheme);
                letter-spacing: 3px;
            }
        }
    }

    .daPlug {
        margin-top: 40px;
        width: 70%;
        color: white;
        background-color: var(--baseThemeEvenDarker);
        padding: 10px;
        border: var(--accentTheme) solid 1px;
    }
`;

const About = () => {

    return (
        <Wrapper>
            <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"></link>
            <Open/>
            <div className='container'>
                <div className='about'>
                    <h1 className='aboutTitle'>About</h1>
                    <p style={{color: 'white'}}>
                        nnserver is a cloud file-hosting server built off of the Arina-Server system (see <a target="_blank" rel="noreferrer" href="https://nnexsus.net">nnexsus.net</a> for more info). 
                        nnserver serves as a Google Drive mockup project for self-hosting files, my own little way to bypass having a 15Gb free limit, and google scanning my files.
                        While developing my original server (infrastructure), I felt that just using nextcloud or some other prebuilt was too easy and boring, as I wanted this to truly feel like my own server.
                        So, this is how we've ended up here! nnserver is a cloud file-hosting server, built by me, from bare-metal infrastructure to networking to back-end to front-end!
                        It's also nice to give friends 50Gb of free storage, lol.
                    </p>
                    <img style={{margin: '20px', padding: '10px', background: 'var(--baseThemeDarker)', border: 'solid var(--accentTheme) 1px'}} src='/logofull.webp' width={'50%'} height={'50%'} />
                </div>
                <div className='daPlug'>
                    <h1>Check out my site too!</h1>
                    <h4>More sites, projects, weather and game development related stuff, music, etc!!</h4>
                    <a target="_blank" rel="noreferrer" href="https://nnexsus.net"> <div className='mediaLink'> <h2>nnexsus.net</h2> <img style={{width: "60%"}} alt='portfolio (personal site) link' src="/solarbg.webp"></img>  </div> </a>
                </div>
            </div>
        </Wrapper>
    )

}

export default About;