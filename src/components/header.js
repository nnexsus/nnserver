import Cookies from "js-cookie";

import './css/header.css';

const Header = () => {

    return (
        <div className="header-container">
            <div className="header">
                    <div className="links">
                        <h1 className="title" style={{margin: 0, marginLeft: "-20px", color: "white"}}>nnserver</h1>
                        <a className="navbutton" href="/home"><img src="/home.webp" alt={"home"}/><p>Home</p></a>
                        <a className="navbutton" href="/folder/0"><img src="/folder.webp" alt={"files"}/><p>Files</p></a>
                        <a className="navbutton" href="/favorites"><img src="/starEmpty.webp" alt={"favorite files"}/><p>Saved</p></a>
                        <a className="navbutton" href="/about"><img src="/logo.webp" alt="about link"/><p>About</p></a>
                        {Cookies.get('isadmin') > 0 ? <a className="navbutton" href="/admin"><img src="/logofull.webp" alt="admin link"/><p>Admin</p></a> : null}
                        <div className="navbutton acc">
                            <img width={'100%'} src="/basic.webp" className="pfp" alt={"account"}/>                       
                            <div className="dropdown">
                                <a style={{color: 'white'}} href="/account"><p>{Cookies.get('cG9zdFVzZXJuYW1l') ? (Cookies.get('dXNlcm5hbWU=')) : null}</p></a>
                                {Cookies.get('cG9zdFVzZXJuYW1l') ? <a style={{color: 'white'}} href="/signout"><p>Signout</p></a> 
                                : <a style={{color: 'white'}} href="/signin"><p>Sign in</p></a>}
                            </div>
                        </div>
                    </div>
            </div>
            <h1 className="menu-hint" style={{WebkitTextStroke: 'black 0.1px'}}>Menu</h1>
        </div>
    )
}

export default Header;