import React, { useState } from 'react';
import { 
    Button,
    Grid,
    Typography,
    TextField,
 } from '@mui/material';
 import {Link, useNavigate} from 'react-router-dom';

export default function RoomJoinPage(props){

    const [roomCode, setRoomCode] = useState('');
    const [error, seterror] = useState('');
    const navigate = useNavigate();

    const handleTextFieldChange = (input) =>{
        setRoomCode(input.target.value);
    };

    const handleJoinRoomPress = () =>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: roomCode
            }),
        };

        fetch('/api/join-room', requestOptions).then((response) => {
            if (response.ok){
                navigate(`/room/${roomCode}`);
            } else{
                seterror("Room not found.");
            }
        }).catch((error) => {console.log(error);});
    };

    return (
        <Grid container spacing={1}>

            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4"> Join a Room </Typography>
            </Grid>

            <Grid item xs={12} align='center'>
                <TextField error={!!error} label="Code" placeholder='Enter a Room Code' value={roomCode} helperText={error} variant='outlined' onChange={handleTextFieldChange}/>
            </Grid>

            <Grid item xs={12} align='center'>
                <Button variant='contained' color = 'success' onClick={handleJoinRoomPress}> Join Room </Button>
            </Grid>

            <Grid item xs={12} align='center'>
                <Button variant='contained' color = 'error' to="/" component={Link}> Back </Button>
            </Grid>

        </Grid>
    );

}