import React from "react";
import Button from "react-bootstrap/esm/Button";
import '../css/sidebar.css'
function SideBar({rooms_info, setRoomWatchId, friend_list, profile_path, setFriendAdd, friend_pend_list}){
    function SideCarCreate(){
        let sidebar = []
        for(let room_id in rooms_info){
            let friend_name = rooms_info[room_id].friend_name
            let room_idx = "#"+room_id
            sidebar.push(
                <a href={room_idx} 
                className="filterDiscussions all unread single" 
                id="list-chat-list" data-toggle="list" role="tab"
                onClick={()=>{setRoomWatchId(rooms_info[room_id].room_id)}}>
                    <img className="avatar-md" src={process.env.REACT_APP_HOST_URL+profile_path[friend_name]} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar"/>
                    <div className="status">
                        <i className="material-icons online">fiber_manual_record</i>
                    </div>
                    <div className="data">
                        <h5>{friend_name}</h5>
                    </div>
                </a>
            )
        }
        return sidebar
    }

    function SideCarFriendRequestCreate(){
        let sidebar = []
        for(let idx in friend_list){
            let friend_name = friend_list[idx]
            sidebar.push(
                <a href="#" onClick={()=>{setFriendAdd(friend_name)}} className="filterMembers all online contact" data-toggle="modal" data-target="#startnewchat">
                    <img className="avatar-md" src={process.env.REACT_APP_HOST_URL+profile_path[friend_name]} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar"/>
                    <div className="status">
                        <i className="material-icons online">fiber_manual_record</i>
                    </div>
                    <div className="data">
                        <h5>{friend_name}</h5>
                    </div>
                    <div className="person-add">
                        <i className="material-icons">person</i>
                    </div>
                </a>
            )
        }
        return sidebar
    }

    function SideCarFriendPendCreate(){
        let sidebar = []
        for(let idx in friend_pend_list){
            let friend_name = friend_pend_list[idx]
            sidebar.push(
                <a className="filterMembers all online contact" data-toggle="modal">
                    <img className="avatar-md" src={process.env.REACT_APP_HOST_URL+profile_path[friend_name]} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar"/>
                    <div className="status">
                        <i className="material-icons online">fiber_manual_record</i>
                    </div>
                    <div className="data">
                        <h5>{friend_name}</h5>
                    </div>
                    <div className="person-add">
                        <i className="material-icons">person</i>
                    </div>
                </a>
            )

        }
        return sidebar
    }

    return(
        <div>
            <div className="sidebar" id="sidebar">
                <div className="container">
                    <div className="col-md-12">
                        <div className="tab-content">
                            <div className="tab-pane fade" id="members">
                                <div className="search">
                                    <form className="form-inline position-relative">
                                        <input type="search" className="form-control" id="people" placeholder="친구가 될 사람들을 검색해보세요.."></input>
                                        <Button variant="btn btn-link loop"><i className="material-icons">search</i></Button>
                                    </form>
                                    <Button variant="btn create" data-toggle="modal" data-target="#exampleModalCenter"><i className="material-icons">person_add</i></Button>
                                </div>
                                <div className="list-group sort">
                                    <Button variant="btn filterMembersBtn active show" data-toggle="list" data-filter="all">All</Button>
                                    <Button variant="btn filterMembersBtn" data-toggle="list" data-filter="online">Online</Button>
                                    <Button variant="btn filterMembersBtn" data-toggle="list" data-filter="offline">Offline</Button>
                                </div>						
                                <div className="contacts">
                                    <h1>친추 요청</h1>
                                    <div className="list-group" id="contacts" role="tablist">
                                        { SideCarFriendRequestCreate() }
                                    </div>
                                    <h1>친추 대기 목록</h1>
                                    <div className="list-group" id="contacts" role="tablist">
                                        { SideCarFriendPendCreate() }
                                    </div>
                                </div>
                            </div>
                            <div id="discussions" className="tab-pane fade active show">
                                <div className="search">
                                    <form className="form-inline position-relative">
                                        <input type="search" className="form-control" id="conversations" placeholder="친구들을 검색해보세요.."></input>
                                        <Button variant="btn btn-link loop"><i className="material-icons">search</i></Button>
                                    </form>
                                </div>
                                <div className="list-group sort">
                                    <Button variant="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">All</Button>
                                    <Button variant="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">Read</Button>
                                    <Button variant="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">Unread</Button>
                                </div>						
                                <div className="discussions">
                                    <h1>채팅방</h1>
                                    <div className="list-group" id="chats" role="tablist">
                                        { SideCarCreate() }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SideBar;