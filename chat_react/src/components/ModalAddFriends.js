import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
function ModalAddFriends(){
    let [friend_name,setFriendName] = useState();
    let [warning,setWarning] = useState("");
    const cookies = new Cookies();
    let token_type = cookies.get('Token-Type')
    let access_token = cookies.get('Access-Token')
    function sendMessage(){
        axios
        .post(process.env.REACT_APP_HOST_URL+'/api/v1/friend',{
            friend_name:friend_name
        }, {headers:{Authorization : `${token_type} ${access_token}`}} )
        .then(function(response){
            let data = response.data;

            console.log("친구 추가");
            window.location.replace('/');
        })
        .catch(function(error){
            console.log("유저가 없습니다.");
            setWarning(<h1 style={ {textAlign:'center',color:'#E83712'}}>해당 유저는 없습니다.</h1>)
        })
    }

    return(
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="requests">
                    <div className="title">
                        <h1>새로운 친구 추가</h1>
                        <Button variant="btn" data-dismiss="modal" aria-label="Close" onClick={()=>{setWarning("")}}><i className="material-icons">close</i></Button>
                    </div>
                    <div>
                        {warning}
                    </div>
                    <div className="content">
                        <div className="form-group">
                            <label htmlFor="user">Username:</label>
                            <input type="text" className="form-control" id="user" placeholder="친구 닉네임 넣어주세요~" onChange={(e)=>{setFriendName(e.target.value)}} required />
                        </div>
                        <Button type="submit" variant="btn button w-100" onClick={sendMessage}>친추 요청 보내기</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAddFriends;