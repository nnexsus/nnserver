import './css/footer.css';

const Footer = () => {

    return (
        <div className='footer-container'>
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
        </div>
    )
}

export default Footer;