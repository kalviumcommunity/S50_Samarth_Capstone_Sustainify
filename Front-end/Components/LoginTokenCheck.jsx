import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookies'

function LoginTokenCheck() {

    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = Cookies.getItem('token');
        // const token2 = Cookies.getItem('connect.sid')
        console.log(token)
        if( token){
            setLogin(true);
            // console.log(token2)
        }
        else {
            // console.log(token2)
            setLogin(false);
        }
    },[])

    return login;
}

export default LoginTokenCheck;
