import { useState, useEffect } from 'react'
import Cookies from 'js-cookies'

function LoginTokenCheck() {

    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = Cookies.getItem('token');
        const userData = Cookies.getItem('userData ');
        // const accessToken = Cookies.getItem('accessToken')

        if(token || userData){
            setLogin(true);
        }
        else {
            setLogin(false);
        }
    },[])

    return login;
}

export default LoginTokenCheck;
