import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

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

    a:visited {
        color: white;
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

const Signup = () => {

    const [state, dispatch] = useContext(LinkContext);

    const [showpass, setShowpass] = useState(false);
    const visible = () => setShowpass(!showpass)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleInput = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
        if (name === 'email') setEmail(value);

    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validator.isEmail(email)) {
            setEmailError('Email Invalid')
        }

        await bcrypt.hash(`${password}`, 0, (err, hash) => {
            if (err) {
                setEmailError(err)
            }
            const data = {
                data: {
                'username': username,
                "email": email,
                "password": hash,
                }
            };

            axios.post(`https://${address.address}/api/createuser`, data, {headers: {'content-type': "application/json"}}).then((response) => {
                if (response.status !== 200) {
                    dispatch({type: 'update_message', message: response.data})
                    return
                }
                navigate('/signin')
            })
        })


    }

    return (
        <Wrapper>
            <div>
                <form className='formContainer' method='post' onSubmit={onSubmit}>
                    <input type={"text"} value={username} placeholder="Username" name='username' onChange={handleInput}/>
                    <input type={"text"} value={email} placeholder="Email" name='email' onChange={handleInput}/>
                    <input type={showpass ? "text" : "password"} value={password} placeholder="Password" name='password' onChange={handleInput}/> <button value={"none"} onClick={visible} className='showpass'>Show Password</button>
                    <button type='submit'>Sign Up</button>
                    <p style={{color: "white"}}>{emailError}</p>
                </form>
            </div>
            <div className='signin'>
                <div>
                    <h2>Or, if you already have an account:</h2>
                    <a href='/signin'><h3>Sign In</h3></a>
                </div>
            </div>
        </Wrapper>
    )
}

export default Signup;