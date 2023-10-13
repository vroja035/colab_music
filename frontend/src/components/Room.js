import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';


export default function Room(props) {
    
    const [votesToSkip, setvotesToSkip] = useState(2);
    const [guestCanPause, setguestCanPause] = useState(false);
    const [isHost, setisHost] = useState(false);
    const {roomCode} = useParams();
    const navigate = useNavigate();
   
    
    useEffect(() =>{
        fetch('/api/get-room' + '?code=' + roomCode)
        .then((response) => {
           
            if (!response.ok){
                props.leaveRoomCallback();
                navigate('/');
            }
            
            return response.json();
            
        })
        .then((data) => {
            setvotesToSkip(data.votes_to_skip);
            setguestCanPause(data.guest_can_pause);
            setisHost(data.is_host);
        });
    },[]);

    const handleLeaveButtonPress = () =>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        fetch('/api/leave-room', requestOptions).then((_response) => {
            props.leaveRoomCallback();
            navigate('/');
        });
    };

    return (
        <Grid container spacing={1}>

            <Grid item xs={12} align='center'>
                <Typography variant='h4' component='h4'>
                    Code: {roomCode}
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <Typography variant='h6' component='h6'>
                    Votes: {votesToSkip}
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <Typography variant='h6' component='h6'>
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <Typography variant='h6' component='h6'>
                    Host: {isHost.toString()}
                </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <Button variant='contained' color = 'error' onClick={handleLeaveButtonPress} > Leave Room </Button>
            </Grid>

        </Grid>
    );
    
    
    
}