import React from "react";
import { useState, useEffect} from "react";
import Navigations from "../components/Navigations";

import SideBar from "../components/SideBar";
import Main from "../components/Main";
import ModalNewChat from "../components/ModalNewChat";
import ModalAddFriends from "../components/ModalAddFriends";
import axios from "axios";
import {Cookies} from 'react-cookie'
import { useNavigate } from "react-router-dom";

var web_socket;
let localhost = 'http://127.0.0.1:8087' //localhost+'/auth/me','/api/v1/main-info/'
let localhost_ws = 'ws://together-chat.tk' //'ws://192.168.0.7:8087'//localhost_ws+'/ws/chat?token='+`${access_token}`)

function MainPage(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState("");
    const [rooms_info, setRoomsInfo] = useState("");
    const [room_watch_id, setRoomWatchId] = useState("");

    const [friend_list, setFriendList] = useState("");
    const [friend_pend_list, setFriendPendList] = useState("");
    const [profile_path,setProfilePath] = useState("");
    const [friend_add,setFriendAdd] = useState("");
    let token_type = cookies.get('Token-Type')
    let access_token = cookies.get('Access-Token')

    useEffect(()=>{
        if(token_type!==null && access_token!==null){
            web_socket = new WebSocket(
                process.env.REACT_APP_WEBSOCKET_URL+'/ws/chat?token='+`${access_token}`);
    
            function websocketConnect(){
                web_socket.onmessage = function(event){
                    let data = JSON.parse(event.data)
            
                    let room_id = data.room_id;
                    let state = data.state;
                    let date = data.date;
                    let content = data.content;
            
                    const chat = {
                        'state':state,
                        'content':content,
                        'date':date
                    }
                    let rooms_copy = {...rooms};
                    rooms_copy[room_id] = rooms_copy[room_id].concat(chat);
            
                    setRooms(rooms_copy);
                }
                web_socket.onclose = function(event){
                    console.log('Socket is closed. Reconnect will be attempted in 1 second.', event);
                    web_socket = new WebSocket(
                        process.env.REACT_APP_WEBSOCKET_URL+'/ws/chat?token='+`${access_token}`);
                    setTimeout(function() {
                        websocketConnect();
                    }, 1000);
                }
            }
        
            websocketConnect();
        }
    })

    useEffect(()=>{
        let token_type = cookies.get('Token-Type')
        let access_token = cookies.get('Access-Token')
        if(token_type!==null && access_token!==null){
            axios({
                method:'get',
                url:process.env.REACT_APP_HOST_URL+'/auth/me',
                headers:{
                    Authorization : `${token_type} ${access_token}`,
                }
            })
            .then(function(response){
                axios.get(
                    process.env.REACT_APP_HOST_URL+'/api/v1/main-info/',
                    {headers:{Authorization : `${token_type} ${access_token}`}})
                .then(function(response){
                    let data = response.data;

                    //rooms
                    let rooms_data = data.rooms_data;
                    sessionStorage.setItem('rooms',rooms_data);
                    setRooms(rooms_data);

                    //rooms_info
                    let rooms_info_data = data.rooms_info;
                    sessionStorage.setItem('rooms_info',rooms_data);
                    for(let room_id in rooms_data){
                        let room_watch_data = rooms_info_data[room_id];
                        setRoomWatchId(room_watch_data.room_id);
                        break;
                    }
                    setRoomsInfo(rooms_info_data);

                    //friend_list
                    let friend_list_data = data.friend_info;
                    sessionStorage.setItem('friend_list',friend_list_data);
                    setFriendList(friend_list_data);

                    //friend_pend_list
                    let friend_pend_list_data = data.friend_pend_list;
                    sessionStorage.setItem('friend_pend_list',friend_pend_list_data);
                    setFriendPendList(friend_pend_list_data);

                    //profile_path
                    let profile_path_data = data.profile_path;
                    sessionStorage.setItem('profile_path',profile_path_data)
                    setProfilePath(profile_path_data)

                    //username
                    let username = data.username;
                    sessionStorage.setItem('username',username);
                })
                .catch(function(error){
                    console.log("에러"+error)
                    navigate('/login')

                })
            })
            .catch(function(error){
                console.log("토큰:에러:",error)
                navigate('/login')
            })
        }
        
    },[]);

    return(
        <div>
            <main>
            <div className="layout">
				<Navigations username={sessionStorage.getItem('username')} profile_path={profile_path}/>
				<SideBar rooms_info={rooms_info} profile_path={profile_path} setRoomWatchId={setRoomWatchId} friend_list={friend_list} setFriendAdd={setFriendAdd} friend_pend_list={friend_pend_list}/>
				<ModalAddFriends ws={web_socket} />
				<ModalNewChat friend_add={friend_add}/>
				<Main rooms={rooms} setRooms={setRooms} room_watch_id={room_watch_id} rooms_info={rooms_info} profile_path={profile_path} friend_list={friend_list} ws={web_socket} />
			</div>
            </main>
        </div>
    );
}

export default MainPage;