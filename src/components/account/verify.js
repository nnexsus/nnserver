import { useParams } from 'react-router';
import styled from 'styled-components';
import { useContext } from 'react';
import axios from 'axios';
import address from '../config.json';
import { LinkContext } from '../states/context';
import Cookies from 'js-cookie';

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
        border-radius: 10px;
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
            border: solid black 1px;
            border-radius: 5px;
            text-align: center;
            background-color: var(--accentTheme);
        }

        button {
            padding: 10px;
            background-color: var(--accentThemeEvenDarker);
            border: solid var(--accentTheme) 1px;
            border-radius: 10px;
            margin: 5px;
            transition: 0.3s ease-in-out;
            cursor: pointer;

            :hover {
                background-color: var(--accentThemeDarker);
            }
        }
    }
`;

const Verify = () => {

    const [state, dispatch] = useContext(LinkContext);

    var token = useParams()

    const verify = () => {
        axios.post(`https://${address.address}/api/verify/${token.id}`).then((response) => {
            Cookies.set('X192bm4=', "1")
            dispatch({type: 'update_message', message: response.data})
        })
    }

    return (
        <Wrapper>
            <h1>Verify Account</h1>
            <div>
                <div className='formContainer'>
                    <h3>By verifying your account. You agree to the <a href='/tos'>terms of service</a>.</h3>
                    <button onClick={() => verify()}>Verify Account</button>
                </div>
            </div>
        </Wrapper>
    )

    
}

export default Verify;