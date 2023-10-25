import '../css/about.css';

const About = () => {

    return (
        <div className="about-container">
            <link rel="stylesheet" type="text/css" href="https://unpkg.com/augmented-ui@2/augmented-ui.min.css"></link>
            <div className='container'>
                <div className='about'>
                    <h1 className='aboutTitle'>About</h1>
                    <p style={{color: 'white'}}>
                        nnserver is a cloud file-hosting server built off of the Arina-Server system (see <a target="_blank" rel="noreferrer" href="https://nnexsus.net">nnexsus.net</a> for more info). 
                        nnserver serves as a Google Drive mockup project for self-hosting files, my own little way to bypass having a 15Gb free limit, and google scanning my files.
                        While developing my original server (infrastructure), I felt that just using nextcloud or some other prebuilt was too easy and boring, as I wanted this to truly feel like my own server.

                        The frontend is available to view on <a target="_blank" rel="noreferrer" href="https://github.com/nnexsus/nnserver">this github repo</a>! It's built on React. The backend code is not
                        available for security reasons, but the infrastructure is a NodeJS Express server with an SFTP route to an external filebank, and an external MySQL2 database for just about everything else.

                        Files and databases are also backed up every few days to another external SFTP server!

                        Enjoy nnserver! 
                    </p>
                    <img style={{margin: '20px', padding: '10px', background: 'var(--baseThemeDarker)', border: 'solid var(--accentTheme) 1px'}} src='/logofull.webp' width={'50%'} height={'50%'} />
                </div>
                <div className='faq'>
                    <h1 style={{color: 'white', gridColumn: 'span 3'}}>FAQ & Issues</h1>
                    <div className='faq-div'>
                        <h4>I uploaded / updated a file and it won't appear!</h4>
                        
                        <p>Hit the 'Refresh Files' button next to the sorting options. The site doesn't always automatically refresh to help limit requests. This will happen for renames, favorites, uploads, etc. Deleting will automatically update, though.</p>
                    </div>

                    <div className='faq-div'>
                        <h4>I can't drag files into folders!</h4>
                        
                        <p>Hold shift after you begin dragging the files. The shift key is needed because typical file dragging is for uploading files. I may find a way around this in the future.</p>
                    </div>

                    <div className='faq-div'>
                        <h4>I dragged a file into a folder, how do I get it back out?</h4>
                        
                        <p>Drag + Shift it into the 'All Folders' quick access on the top right of the fileviewer. You can drag files into all of these quick access folders as well!</p>
                    </div>

                    <div className='faq-div'>
                        <h4>I uploaded a large file to the server and can't find it, where did it go? / When I try to download a large file it gives me a blank file!</h4>

                        <p>If the file is/was over 2Gb a single TCP connection cannot handle it, and it will fail. The databases will occasionally create a record of this file existing, even when it doesn't, leading to an empty file.
                        For now, just delete the file. I'm looking towards ways around the 2Gb file limit in the future.</p>
                    </div>

                    <div className='faq-div'>
                        <h4>My file is stuck at uploading at 99%!</h4>
                        
                        <p>Hit the 'Refresh Files' button next to the sorting options. If your file doesn't appear after that, you'll likely need to refresh and reupload it. If it still gets stuck after that, try signing out and signing back in to refresh your session key.
                        Finally, if it <i>still</i> gets stuck after <i>that</i>, go ahead and contact me.</p>
                    </div>

                    <div className='faq-div'>
                        <h4>I renamed a file and now the preview doesn't appear! Is my file lost?</h4>
                        
                        <p>This can occasionally happen if a lot of SFTP connections are open. If the file renamed on your side, then it is on the server too, occasionally the preview file won't be updated. If this is an issue, contact me at
                        <a title="nnexsus.service@gmail.com" href='mailto:nnexsus.service@gmail.com'>nnexsus.service@gmail.com</a> with the original filename and your account name, and I'll manually reset it.</p>
                    </div>

                    <div className='faq-div'>
                        <h4>There are folders that aren't visible in my fileviewer!</h4>
                        
                        <p>Those are nested folders. The folder section on the right of the fileviewer is supposed to be a quick access panel, so, if you see a folder there that isn't anywhere else, it's likely inside another folder.</p>
                    </div>

                    <div className='faq-div'>
                        <h4>I updated a folder color and it only changed in the fileviewer!</h4>
                        
                        <p>Refresh the whole page, the quick access panel is a seperate component, and may require that. If it's still different after a full page refresh, try changing it again, or contact me at <a title="nnexsus.service@gmail.com" href='mailto:nnexsus.service@gmail.com'>nnexsus.service@gmail.com</a>!</p>
                    </div>

                    <div className='faq-div'>
                        <h4>I changed the site theme but some things are still using the older colors!</h4>
                        
                        <p>Refresh the whole page. Some components won't re-render otherwise.</p>
                    </div>

                </div>
                <div className='daPlug'>
                    <h1>Check out my site too!</h1>
                    <h4>More sites, projects, weather and game development related stuff, music, etc!!</h4>
                    <a target="_blank" rel="noreferrer" href="https://nnexsus.net"> <div className='mediaLink'> <h2>nnexsus.net</h2> <img style={{width: "60%"}} alt='portfolio (personal site) link' src="/solarbg.webp"></img>  </div> </a>
                </div>
            </div>
        </div>
    )

}

export default About;