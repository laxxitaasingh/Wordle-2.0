import React, {useState, useEffect} from 'react'
import './Chatbox.css'
import avatar from '../../assets/images/avatar.jpg'
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
export const ChatBox = () => {
    console.log('I am called')
    const socket = io('http://localhost:3200')
    const [message,setMessage] = useState('')
    const [user, setUser]= useState('')
    const [room, setRoom] = useState('')
    const roomOwner = useSelector((state) => state.roomOwner.owner?.username);
    //  socket.broadcast.emit("message", "world");
    const [messageList, setMessageList] = useState([])

    function onMessageInput (e){
       setMessage(e.target.value)
    } 

    useEffect(() => {
        console.log("hello")
        let storedChats = JSON.parse(sessionStorage.getItem('Chats') || '[]')
        if (storedChats && storedChats.length > 0) {
            setMessageList(storedChats)
        }
        const roomId = sessionStorage.getItem('roomID')
        setRoom(`http://localhost:3000/name/${roomId}`)
        setUser(sessionStorage.getItem('username'))
        socket.on('receiveMessage', (user) => {
            let tempMessageList = [...JSON.parse(sessionStorage.getItem('Chats') || '[]')]
            tempMessageList.push({message: user.message, username: user.username})
            sessionStorage.setItem('Chats', JSON.stringify(tempMessageList))
            setMessageList((prevMessages) => [...prevMessages, {message: user.message, username: user.username}]);
        });
    },[]);

    function sendMessage () {
        const username = sessionStorage.getItem('username')
        const roomId = sessionStorage.getItem('roomID')
        if (message && roomId) {
            socket.emit('sendMessage', { roomId, message, username });
            setMessage('');
        }
    }

    return (
        <div className='chatbox'>
            <div className='user-info'> 
                <div className='copy-url-container'>
                <span className='copy-url'>
                 {room}
                </span>
                </div>
                <div className='url-info'>
                <img src={avatar} alt='avatar' height="50px" width="50px" className='avatar'/>
                <span className='profile-user'>{user}</span>
                </div>
            </div>
            <div className='message-container'>
                <h5>Room Owner is: {roomOwner}</h5>
                {messageList.map((eachMessage,index)=> {
                    return (
                        <div key = {index} className='text-container'>
                            <div className='message-user'>
                              {eachMessage.username}
                            </div>    
                            <div className='text-message'>
                                {eachMessage.message}
                            </div>    
                        </div>
                    )
                })}
            </div>
            <div className='input-message'>
                <input type='text' className='chat-input' value={message} onChange={(e)=>{onMessageInput(e)}} placeholder='Write word here'/>
                <button className='send-message' onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
