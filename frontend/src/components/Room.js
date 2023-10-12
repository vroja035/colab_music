import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Room(props) {
    
    const [votesToSkip, setvotesToSkip] = useState(2);
    const [guestCanPause, setguestCanPause] = useState(false);
    const [isHost, setisHost] = useState(false);
    const {roomCode} = useParams();
   
    
    const getRoomDetails = () =>{
        fetch('/api/get-room' + '?code=' + roomCode).then((response) => response.json()).then((data) => {
            setvotesToSkip(data.votes_to_skip);
            setguestCanPause(data.guest_can_pause);
            setisHost(data.is_host);

        });
    };

    
    getRoomDetails();

    return (<div> 
        <h3> {roomCode.toString()}</h3>
        <p> Votes: {votesToSkip} </p> 
        <p> Guest Can Pause: {guestCanPause.toString()} </p>
        <p> Host: {isHost.toString()} </p>
    </div>);
    
}