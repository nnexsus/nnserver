import { useNavigate } from 'react-router';
import { useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { LinkContext } from "../states/context";
import address from '../config.json';

const Signout = () => {

    const [state, dispatch] = useContext(LinkContext);

    const navigate = useNavigate()

    const ping = useRef(false)

    useEffect(() => {
        if (ping.current) return;
        ping.current = true;
        signout()
    }, [])

    const signout = () => {
        var author = Cookies.get('cG9zdFVzZXJuYW1l')
        var sesk = Cookies.get('sesk')
        const data = {
            "author": author,
            "sesk": sesk
        }
        axios.post(`https://${address.address}/api/user/signout/`, data, {headers: {'content-type': "application/json"}}).then((response) => {
            dispatch({type: 'update_message', message: response.data})
            sessionStorage.clear();
            localStorage.clear();
    
            Cookies.remove('dXNlcm5hbWU=')
            Cookies.remove('cG9zdFVzZXJuYW1l')
            Cookies.remove('cGZw')
            Cookies.remove('X192bm4=')
            Cookies.remove('ZW1haWw=')
            setTimeout(() => {
                navigate("/home")
            }, [1500])
        })
    }
    
    return (
        <div style={{color: "var(--10purple)", fontFamily: "Comp", marginTop: "50px"}}>
            Signing out...
        </div>
    )
}

export default Signout;