import styled from 'styled-components';
import axios from "axios";
import address from '../config.json';
import { useContext } from 'react';
import { LinkContext } from '../states/context';
import Cookies from 'js-cookie';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
    background-color: var(--baseThemeEvenDarker);
    padding: 10px;
    border: var(--accentTheme) black 1px;
    height: 200px;

    p, h1, h2, h3 {
        font-family: "Comp";
    }

    p, h1, h2, h3 {
        color: var(--white);
    }

    a {
        color: var(--accentTheme);
    }

    input, button {
        font-family: "Comp";
        color: var(--black);
    }
    input {
        margin: 5px;
        padding: 10px 0 10px 0;
        border: solid black 1px;
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
`;

const SendVerify = () => {

    const [state, dispatch] = useContext(LinkContext);

    const data = {
        email: `${Cookies.get('ZW1haWw=')}`
    }

    const onClick = (e) => {
        e.preventDefault()
        axios.post(`https://${address.address}/api/verify`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
        })
    }

    return (
        <Wrapper>
            <h1 style={{margin: 'auto'}}>Click here to send verifcation email to {Cookies.get('ZW1haWw=')}.</h1>
            <button onClick={(e) => onClick(e)}>Send</button>
        </Wrapper>
    )
}

export default SendVerify;