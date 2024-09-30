
import React from "react"
import './Dashboard.css'
import image from '../../assets/images/wordle.png'
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export const Dashboard = () => {

    const navigate = useNavigate();

    function callPlay() {
        navigate('/game')
    }

    function createRoom () {
        const roomId = uuidv4();
        sessionStorage.setItem('roomID', roomId)
        navigate(`/name/${roomId}`)
    }

    return (
        <div className="background-body">
        <div className="wordle-game-heading">
         Wordle 2.0
        </div>
        <div>
        <div>
            <img src={image} height="200px" width="200px" className="logo-bg" alt= "wordle logo"/>
        </div>
        <div className="dash-button-container">
            <div>
              <button onClick={callPlay} className="dashboard-button"> 
                Play 
              </button>
            </div>
            <div>
               <button onClick={createRoom} className="dashboard-button">
                Create Room
               </button>
            </div>
        </div>
        </div>
        </div>
    )
}