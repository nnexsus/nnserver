import styled from 'styled-components';

const Wrapper = styled.div`

    margin: 60px 70px 0 70px;

    .footer {
        display: grid;
        grid-template-columns: repeat(2,50%);
        background-color: var(--baseThemeEvenDarker);
        padding: 0 30px 10px 30px;
        
        border: solid 2px var(--accentTheme);

    .social, .about, .linkContainer, .other {
        font-family: "Comp";
    }
    h1, p, li{
        color: white;
    }
    li {
        list-style-type: none;
        margin-bottom: 8px;
        margin-left: -30px;
        text-indent: 15px;
    }
    .linkContainer {
        text-align: right;
        padding-right: 5px;
    }
    .links {
        display: grid;
        grid-template-columns: repeat(3, 33%);
        a {
            background-color: var(--baseThemeEvenDarker);
            margin: 3px;
            border: solid 2px var(--accentTheme);
            padding-right: 5px;
            transition: 0.2s ease-in-out;
            text-decoration: none;
            :hover {
                background-color: var(--baseThemeDarker);
                border: solid 2px var(--accentThemeDarker);
            }
            :active {
                background-color: var(--baseTheme);
                border: solid 2px var(--accentThemeEvenDarker);                
            }
        }
        .gridSpacer {
            grid-column: 1;
            grid-row-start: 1;
            grid-row-end: 4;
        }
    }
    .social {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row: 3;
        display: flex;
        margin-left: -10px;

        img {
            width: 40px;
            height: 40px;
            background-color: var(--baseThemeDarker);
            padding: 0px;
            border: solid 2px black;
            margin: 15px 10px 0 10px;
            box-shadow: 0px 0px 0px 3px white;
            transition: 0.4s ease-in-out;

            :hover {
                background-color: var(--accentTheme);
                box-shadow: 0px 0px 0px 8px white;
                padding: 5px;
            }
        }
    }

    .other {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row: 3;
        display: flex;
        align-items: center;
        text-align: center;
        margin: 4px 0px 20px 0px;

        a {
            background-color: var(--baseThemeEvenDarker);
            margin: 10px;
            padding: 3px;
            color: var(--10blue);
            border: solid 2px black;
            transition: 0.4s ease-in-out;

            :hover {
                background-color: var(--accentTheme);
            }
        }

        p {
            font-size: 12px;
        }
    }

    }

    .expand {
        letter-spacing: 1px;
        :hover {
            letter-spacing: 5px;
        }
    }


    @media screen and (max-width: 860px) {
        margin: 0 1% 0 1%;
        .footer {
            --aug-t-extend1: 30%;
        }
    }

    @media screen and (max-width: 675px) {
        margin: 0 1% 0 1%;
        .footer {
            --aug-t-extend1: 30%;
            .other {
                grid-column-start: 1;
                grid-column-end: 3;
                grid-row: 4;
                margin: 5px -20px 15px 3px;
            }
        }
    }
`;

const Footer = () => {

    return (
        <Wrapper>
            <div className='footer'>
                <div className='about'>
                    <h1>About</h1>
                    <ul>
                        <li>The nnexsus server (nn-server) is a simple file hosting cloud server for all your files!</li>
                        <li>nnserver is designed especially for large files that needlessly take up space on your drives.</li>
                        <li>The nnserver front and backend is updated frequently to bring new features and QOL to the webapp.</li>
                    </ul>
                </div>
                <div className='linkContainer'>
                    <h1>Links</h1>
                        <div className='links'>
                            <div className='gridSpacer'>
                                <p></p>
                            </div>
                        <a className='expand' href='/home'><p>Home</p></a>
                        <a className='expand' href='/about'><p>About</p></a>
                        <a className='expand' href='/account'><p>Account</p></a>
                        <a className='expand' href='/folder/0'><p>Files</p></a>
                        <a className='expand' href='/discordfiles'><p>Saved Files</p></a>
                    </div>
                </div>
                <hr style={{width: "100%"}}></hr>
                <div className='social'>
                    <a href='https://twitter.com/_nnexsus' target="blank"><img src='/Twitter-Logo-circle.webp' alt='twitter link'/></a>
                    <a href='https://youtube.com/c/nnexsus' target="blank"><img src='/Youtube-Logo-circle.webp' alt='youtube link'/></a>
                    <a href='https://github.com/nnexsus' target="blank"><img src='/Github-Logo.webp' alt='github link'/></a>
                    <a href='https://discord.gg/d8R2tDaBK2' target="blank"><img src='/Discord-Logo.webp' alt='discord invite link'/></a>
                    <a href='https://nnexsus.net' target="blank"><img src='/moon.webp' alt='my homepage link'/></a>
                </div>
                <div className='other'>
                    <a href='mailto:nnexsus.service@gmail.com'><p>nnexsus.service@gmail.com</p></a>
                    <a href="/tos"><p>Terms of Service</p></a>
                </div>
            </div>
        </Wrapper>
    )
}

export default Footer;