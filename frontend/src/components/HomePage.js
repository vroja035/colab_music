import React, { Component, useEffect, useState } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Route, Link, Navigate, Routes, } from "react-router-dom";
import Room from "./Room";
import {Grid, Button, Typography, ButtonGroup } from '@mui/material';

export default function HomePage(props){
    
    const [roomCode, setRoomCode] = useState(null);

    useEffect (() =>{
        async function fetchData(){
            fetch('/api/user-in-room').then((response) => response.json()).then((data) => {setRoomCode(data.code)});
        };
        fetchData();
    },[]);

    const RenderHomePage = () => {
            return(
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} align='center'>
                        <Typography variant='h3' component='h3'>
                            Auditorium
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} align='center'>
                        <ButtonGroup disableElevation variant='contained' color='success'>
                            <Button color="primary" to='/join' component={Link}> Join a Room </Button>
                            <Button color="secondary" to='/create' component={Link}> Create a Room </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            );
    };

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={roomCode ? (<Navigate replace to={`/room/${roomCode}`} />) : RenderHomePage()} />
                <Route path='/join' element={<RoomJoinPage/>}/>
                <Route path='/create' element={<CreateRoomPage/>}/>
                <Route path='/room/:roomCode' element={<Room/>}/>
            </Routes>
        </Router>);
    
}