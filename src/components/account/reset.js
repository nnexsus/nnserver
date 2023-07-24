import { useNavigate, useParams } from 'react-router';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 50px;

    div {
        background-color: var(--baseThemeDarker);
        padding: 10px;
        border: solid var(--accentTheme) 1px;
        margin: 10px;
    }

    p, h1, h2, h3 {
        font-family: "Comp";
    }

    p, h1, h2, h3 {
        color: var(--white);
    }

    a {
        color: var(--accentTheme);
    }

    .formContainer {
        background-color: var(--baseThemeEvenDarker);
        input, button {
            font-family: "Comp";
            color: var(--black);
        }

        input {
            margin: 5px;
            padding: 10px 0 10px 0;
            border: solid var(--accentTheme) 1px;
            text-align: center;
            background-color: var(--accentThemeDarker);
        }

        button {
            padding: 10px;
            background-color: var(--accentThemeEvenDarker);
            border: solid var(--accentTheme) 1px;
            margin: 5px;
            transition: 0.3s ease-in-out;
            cursor: pointer;

            :hover {
                background-color: var(--accentThemeDarker);
            }
        }
    }
`;

const Reset = () => {

    const [state, dispatch] = useContext(LinkContext);

    const [pass, setPass] = useState('');
    const [togglePass, setTogglePass] = useState(false);

    const navigate = useNavigate()
    var token = useParams()

    const rstPass = async (e) => {
        e.preventDefault();

        await bcrypt.hash(`${pass}`, 0, (err, hash) => {
            if (err) {
                dispatch({type: 'update_message', message: err})
            }
            const data = {
                "newpass": hash
            }
            axios.post(`https://${address.address}/api/reset/${token.id}`, data).then((response) => {
                if (response.status !== 200) {
                    dispatch({type: 'update_message', message: response.data})
                    return
                }
                navigate('/home')
            })
        })


    }

    return (
        <Wrapper>
            <h1>Reset Password</h1>
            <div>
                <div className='formContainer'>
                    <input type={togglePass ? "text" : "password"} placeholder='New Password' onChange={(e) => setPass(e.target.value)} /><button onClick={() => setTogglePass(!togglePass)}>Show Password</button>
                    <button onClick={(e) => rstPass(e)}>Reset</button>
                </div>
            </div>
        </Wrapper>
    )

}

export default Reset;