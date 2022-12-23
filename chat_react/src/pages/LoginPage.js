import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import {Cookies} from 'react-cookie'
let localhost = 'http://127.0.0.1:8087' //localhost+'/auth/me', localhost+'/api/v1/login
function LoginPage(){
    const navigate = useNavigate();
    const cookies = new Cookies()
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();

    let token_type = cookies.get('Token-Type')
    let access_token = cookies.get('Access-Token')

    if(token_type!==null && access_token!==null){
        axios({
            method:'get',
            url:process.env.process.env.REACT_APP_HOST_URL+'/auth/me',
            headers:{
                Authorization : `${token_type} ${access_token}`,
            }
        })
        .then(function(response){
            window.location.replace('/');
        })
        .catch(function(error){
            console.log("로그인 하삼");
        })
    }

    function login(){
        axios.post(process.env.process.env.REACT_APP_HOST_URL+'/api/v1/login',{
            "username":username,
            "password":password
        }).then(function(response){
            try{
                let data = response.data;
                cookies.set('Access-Token',data.access_token)
                cookies.set('Token-Type',data.token_type)

                axios.defaults.headers.common['Authorization'] = `${cookies.get('Token-Type')} ${cookies.get('Access-Token')}`;
               
                navigate('/')
            }
            catch(error){

            }
        }).catch(function(error){
            console.log("로그인 실패");
        })
    }
    return(
        <div>
            <div className="layout">
                <div className="main order-md-1">
                    <div className="start">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="content">
                                    <h1>글로벌 채팅 서비스</h1>
                                    <div className="third-party">
                                        <Button variant="btn item bg-blue">
                                            <i className="material-icons">pages</i>
                                        </Button>
                                        <Button variant="btn item bg-teal">
                                            <i className="material-icons">party_mode</i>
                                        </Button>
                                        <Button variant="btn item bg-purple">
                                            <i className="material-icons">whatshot</i>
                                        </Button>
                                    </div>
                                    <p></p>
                                    <form>
                                        <div className="form-group">
                                            <input type="text" id="inputEmail" className="form-control" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} required></input>
                                            <Button variant="btn icon"><i className="material-icons">perm_identity</i></Button>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required></input>
                                            <Button variant="btn icon"><i className="material-icons">lock_outline</i></Button>
                                        </div>
                                        <Button onClick={login} variant="btn button">Sign In</Button>
                                        <div className="callout">
                                            <span>Don't have account? <Link to='/signup'>Create Account</Link></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aside order-md-2">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="preference">
                                <h2>Hello, Friend!</h2>
                                <p>여러분과 같이 함께 하고 싶어요! 가입해주세요~</p>
                                <Link to='/signup' className="btn button">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div> 
        </div>
    );
}

export default LoginPage;