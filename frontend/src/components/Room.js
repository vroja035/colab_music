import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';


export default function Room(props) {
    
    const [votesToSkip, setvotesToSkip] = useState(2);
    const [guestCanPause, setguestCanPause] = useState(false);
    const [isHost, setisHost] = useState(false);
    const [showSettings, setshowSettings] = useState(false);
    const [spotifyAuthenticated, setspotifyAuthenticated] = useState(false);
    const [song, setsong] = useState({});
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
    },[showSettings]);

    useEffect(() =>{
        if (isHost == true){
            fetch('/spotify/is-authenticated').then((response) => response.json()).then((data) => {
                setspotifyAuthenticated(data.status);
                console.log(data.status);
                if (!data.status){
                    fetch('/spotify/get-auth-url').then((response) => response.json()).then((data) => {
                        window.location.replace(data.url);
                    });
                }
            });
        }

    },[isHost]);

    useEffect(() => {
        //fetches song info every second
        const interval = setInterval(() => {
            fetch('/spotify/current-song').then((response) => {
                if (!response.ok){
                    return {};
                } else {
                    return response.json();
                }
            }).then((data) => {
                setsong(data);
                console.log(data);
            });
        }, 1000);

        return () => clearInterval(interval)

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

    const UpdatesetshowSettings = () =>{
        setshowSettings(!showSettings);
    };

    const showSettingsButton = () =>{
        return(
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary'  onClick={UpdatesetshowSettings}> Settings </Button>
            </Grid>
        );
    };

    const showSettingsPage = () =>{
        return(
            <Grid container spacing = {1}>
                <Grid item xs={12} align='center'>
                    <CreateRoomPage update={true} votesToSkip={votesToSkip} guestCanPause={guestCanPause} roomCode={roomCode}/>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color = 'error' onClick={UpdatesetshowSettings} > Close </Button> 
                </Grid>
            </Grid>
        );
    };

    if(showSettings){
        return showSettingsPage();
    } else {

        return (
            <Grid container spacing={1}>

                <Grid item xs={12} align='center'>
                    <Typography variant='h4' component='h4'>
                        Code: {roomCode}
                    </Typography>
                </Grid>

                <MusicPlayer {...song}/>

                {isHost ? showSettingsButton() : null}
                
                <Grid item xs={12} align='center'>
                    <Button variant='contained' color = 'error' onClick={handleLeaveButtonPress} > Leave Room </Button>
                </Grid>

            </Grid>
        );
    
    }
    
}

/*<Grid item xs={12} align='center'>
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
                </Grid>*/