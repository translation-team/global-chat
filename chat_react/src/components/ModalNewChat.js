import axios from "axios";
import React from "react";
import {Cookies} from 'react-cookie'
function ModalNewChat({friend_add}){
    function add_friend(){
        let cookies = new Cookies();
        let token_type = cookies.get('Token-Type')
        let access_token = cookies.get('Access-Token')
        axios.put(
            process.env.REACT_APP_HOST_URL+'/api/v1/friend',
            {
                friend_name:friend_add
            },
            {
                headers:{
                    Authorization : `${token_type} ${access_token}`,
                },
                friend_name:friend_add
            }
        )
        .then(function(response){
            console.log("친추 요청 승인");

            window.location.replace('/');
        })
        .catch(function(error){
            console.log("친추 요청 승인 실패")
        })
    }
    return(
        <div className="modal fade" id="startnewchat" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="requests">
                    <div className="title">
                        <h1>친구 요청 승인</h1>
                        <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i className="material-icons">close</i></button>
                    </div>
                    <div className="content">
                        <button onClick={add_friend} className="btn button w-100">승인 완료</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalNewChat;