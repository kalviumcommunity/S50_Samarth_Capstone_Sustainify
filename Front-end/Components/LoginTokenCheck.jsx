import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookies'

function LoginTokenCheck() {

    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = Cookies.getItem('token');
        const token2 = Cookies.getItem('connect.sid')

        if(token2 || token){
            setLogin(true);
            console.log(token2)
        }
        else {
            console.log(token2)
            setLogin(false);
        }
    },[])

    return login;
}

export default LoginTokenCheck;
