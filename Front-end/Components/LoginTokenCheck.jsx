import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookies'

function LoginTokenCheck() {

    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = Cookies.getItem('token');

        if(token){
            setLogin(true);
        }
        else {
            setLogin(false);
        }
    },[])

    return login;
}

export default LoginTokenCheck;
