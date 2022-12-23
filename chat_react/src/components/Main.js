import React from "react";
import { useState,useEffect} from "react";

function Main({rooms, setRooms, room_watch_id, rooms_info, friend_list, profile_path, ws}){

    const [textValue, setTextValue] = useState("");


    useEffect(()=>{
        sessionStorage.setItem('rooms',JSON.stringify(rooms))
    },[rooms]);

    function sendMessage(event){
        console.log("메시지 전송");
        ws.send(JSON.stringify({'content':textValue,'room_id':room_watch_id}))
        event.preventDefault();

        let rooms_copy = {...rooms};
        rooms_copy["room-"+room_watch_id] = rooms_copy["room-"+room_watch_id].concat({
            'state':"message me",
            'content':textValue,
            'date': new Date().toDateString()
        });

        setRooms(rooms_copy);
    }

    
    function RoomCreate(){
        let room_list = []
        for(let room_id in rooms){
            room_list.push(
                <div className="babble tab-pane fade show" id={room_id} role="tabpanel" aria-labelledby="list-chat-list">
                    <div className="chat" id="chat1">
                        <div className="top">
                            <div className="container">
                                <div className="col-md-12">
                                    <div className="inside">
                                        <a href="#"><img className="avatar-md" src={process.env.REACT_APP_HOST_URL+profile_path[rooms_info[room_id].friend_name]} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar"/></a>
                                        <div className="status">
                                            <i className="material-icons online">fiber_manual_record</i>
                                        </div>
                                        <div className="data">
                                            <h5><a href="#">{rooms_info[room_id].friend_name}</a></h5>
                                            <span>Active now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content" id="content">
                            <div className="container">
                                <div className="col-md-12">
                                    {
                                        rooms === ""
                                        ?null
                                        : 
                                        rooms[room_id].map((chat)=>(
                                            <div className={chat.state}>
                                                <div className="text-main">
                                                    <div className="text-group me">
                                                        <div className="text me">
                                                            <p>{chat.content}</p>
                                                        </div>
                                                    </div>
                                                    <span><i className="material-icons">check</i>{chat.date}</span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="col-md-12">
                                <div className="bottom">
                                    <div className="position-relative w-100">
                                        <textarea className="form-control" placeholder="메세지를 작성해봐요!!" rows="1" onChange={(e)=>{setTextValue(e.target.value)}}></textarea>
                                        <button className="btn emoticons"><i className="material-icons">insert_emoticon</i></button>
                                        <button onClick={sendMessage} className="btn send"><i className="material-icons">send</i></button>
                                    </div>
                                    <label>
                                        <input type="file"/>
                                    </label> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return room_list;
    }
    return(
        <div className="main">
            <div className="tab-content" id="nav-tabContent">
                { RoomCreate() }
            </div>
        </div>
    );
}

export default Main;
