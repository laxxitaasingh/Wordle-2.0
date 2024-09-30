import React from "react";
import './Room.css'
import { Game } from "../Game/Game";
import { ChatBox } from "../../components/Chatbox/Chatbox";

export const Room = () => {
    return (
        <div className="room-container">
            <div className="room-each">
                <Game/>
            </div>
            <div className="room-each">
                <ChatBox/>
            </div>
        </div>
    )
}