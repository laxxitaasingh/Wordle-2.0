import { useEffect, useState } from "react"
import './UserName.css'
import { useNavigate } from "react-router-dom"
import { io } from 'socket.io-client';
import { useParams}from 'react-router-dom';
import { setRoomOwner } from '../../redux/slice/roomOwnerSlice';
import { useDispatch } from 'react-redux';
export const UserName = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name,setName]= useState('')
    const socket = io('http://localhost:3200')
    const id  = useParams();
    function onInput(e) {
        setName(e.target.value)
    }
    useEffect(()=> {
        socket.on('roomOwner', ({username }) => {
            let user = sessionStorage.getItem('username')
           let isOwner = username === user;
            console.log(isOwner, username )
            dispatch(setRoomOwner({ isOwner, username }))
            sessionStorage.setItem('room_owner', username)
            sessionStorage.setItem('is_owner', isOwner)
        });          
    },[])
    function submitForm () {
        sessionStorage.setItem('username', name)
        sessionStorage.setItem('roomID', id.id)
        if (id && name) {
            socket.emit('joinRoom',{ roomId: id.id , username: name } );
        }
        navigate(`/game/${id.id}`)
    }
    return (
        <div className="username-form-container">
           <div className="form">
            <input className="input-name" type="text" defaultValue={name} onChange={(e)=>{onInput(e)}} placeholder="Your Name"/>
            <button onClick={submitForm} className="submit-btn">Submit</button>
           </div>
        </div>
    )
}