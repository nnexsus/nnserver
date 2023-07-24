import { useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { LinkContext } from '../states/context';
import address from '../config.json';

const Wrapper = styled.div`
    margin-top: 50px;
    border-radius: 50px;

    a:visited {
        color: white;
    }

    p, h1, h2, h3 {
        font-family: "Comp";
    }

    p, h1, h2 {
        color: var(--white);
    }

    .pad {
        margin: 0 150px;
        background-color: var(--baseThemeEvenDarker);
        border: solid 1px var(--accentTheme);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .pad2 {
        margin: 5px;
        padding: 15px 5px;
        background-color: var(--baseThemeDarker);
        border: solid 1px var(--accentTheme);
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
`;

const Forgot = () => {

    const [state, dispatch] = useContext(LinkContext);

    const [email, setEmail] = useState("");
    const sendEmail = (e) => {
        e.preventDefault()
        const send = {"email": email}
        axios.post(`https://${address.address}/api/forgot`, send).then((result) => {
            dispatch({type: 'update_message', message: result.data})
        })
    }

    return (
        <Wrapper>
            <div className='pad'>
                <div style={{padding: '10px'}}>
                    <h2>Password Reset</h2>
                    <p>Enter your email and hit submit. Then, head to your email inbox and look for an email from nnexsus.service@gmail.com, and be sure to check the spam folder!</p>
                </div>
                <div className='pad2'>
                    <input type={"text"} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={sendEmail}>Submit</button>
                </div>
            </div>
        </Wrapper>
    )

}

export default Forgot;