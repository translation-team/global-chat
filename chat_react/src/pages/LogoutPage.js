import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie'

function LogoutPage(){
    const navigate = useNavigate();
    let cookies = new Cookies();

    useEffect(()=>{
        let token_type = cookies.get('Token-Type')
        let access_token = cookies.get('Access-Token')
        if(token_type!==null && access_token!==null){
            cookies.remove('Token-Type')
            cookies.remove('Access-Token')
            navigate('/login')
        }
    },[])
}

export default LogoutPage;