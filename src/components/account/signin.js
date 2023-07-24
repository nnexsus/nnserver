import styled from 'styled-components';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import bcrypt from 'bcryptjs';
import address from '../config.json';
import Cookies from 'js-cookie';
import { LinkContext } from '../states/context';

const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;

    div {
        background-color: var(--baseThemeEvenDarker);
        padding: 10px;
        border: solid var(--accentTheme) 1px;
        margin: 10px;
    }

    p, h1, h2, h3 {
        font-family: "Comp";
    }

    p, h1, h2 {
        color: var(--white);
    }

    .signup {
        div {
            background-color: var(--accentThemeEvenDarker);
            padding: 5px;
        }
        a {
            color: var(--accentTheme);
        }
    }

    .formContainer {
        input, button {
            font-family: "Comp";
            color: var(--black);
        }

        input {
            margin: 5px;
            padding: 10px 0 10px 0;
            text-align: center;
            background-color: var(--accentThemeEvenDarker);
            border: solid var(--accentTheme) 1px;
            :hover {
                background-color: var(--accentThemeDarker);
                border: solid var(--accentThemeDarker) 1px;
            }
            :active {
                background-color: var(--accentTheme);
                border: solid var(--accentThemeEvenDarker) 1px;
            }
        }

        button {
            padding: 10px;
            background-color: var(--accentTheme);
            border: solid var(--accentThemeEvenDarker) 1px;
            margin: 5px;
            transition: 0.3s ease-in-out;
            cursor: pointer;

            :hover {
                background-color: var(--accentThemeDarker);
                border: solid var(--accentThemeEven) 1px;
            }
            :active {
                background-color: var(--accentThemeEvenDarker);
                border: solid var(--accentTheme) 1px;
            }
        }
    }

`;

const Signin = () => {

    const [state, dispatch] = useContext(LinkContext);

    const [showpass, setShowpass] = useState(false);
    const visible = () => setShowpass(!showpass);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleInput = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    }

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();

        await bcrypt.hash(`${password}`, 10, (err, hash) => {
            if (err) {
                dispatch({type: 'update_message', message: err})
            }

            const data = {
                data: {
                "username": username,
                "password": password,
            }
        }
    
            axios.post(`https://${address.address}/api/signin`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                if(response.status !== 200) {
                    dispatch({type: 'update_message', message: response.data})
                    return
                }
                    Cookies.set('dXNlcm5hbWU=', response.data.username)
                    Cookies.set('cG9zdFVzZXJuYW1l', response.data.postToken)
                    Cookies.set('cGZw', response.data.pfp)
                    Cookies.set('X192bm4=', response.data.__vnn)
                    Cookies.set('ZW1haWw=', response.data.email)
                    Cookies.set('sesk', response.data.sesk)
                    Cookies.set('isadmin', response.data.isAdmin)
                    Cookies.set('adminkey', response.data.adminkey)
                    localStorage.setItem('favs', response.data.favs)
                    setTimeout(() => {
                        navigate('/home')
                    }, [1000])
                })
        })
    }

    return (
        <Wrapper>
            <div className='formContainer'>
                <form method='post' onSubmit={onSubmit}>
                    <input type={"text"} placeholder="Username/Email" name='username' onChange={handleInput}/>
                    <input type={showpass ? "text" : "password"} placeholder="Password" name='password' onChange={handleInput}/> 
                    <button type='button' value={"none"} onClick={visible} className='showpass'>Show Password</button>
                    <button type='submit' onClick={() => console.log("clicked")}>Sign In</button>
                </form>
                <p>This site uses cookies to sign in.</p>
                <a href='/forgot'><p>Forgot Password?</p></a>
            </div>
            <div className='signup'>
                <div>
                    <h2>Or, if you're new:</h2>
                    <a href='/signup'><h3>Sign Up</h3></a>
                </div>
            </div>
        </Wrapper>
    )
}

export default Signin;