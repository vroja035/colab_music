import React, {useEffect, useState} from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress, } from '@mui/material';
import { PlayArrow, SkipNext, Pause } from "@mui/icons-material";

export default function MusicPlayer(props){
    
    const songProgress = (props.time / props.duration) * 100;

    const pauseSong = () =>{
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/son'},
        };
        fetch('/spotify/pause', requestOptions);
    };

    const playSong = () =>{
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/son'},
        };
        fetch('/spotify/play', requestOptions);
    };

    const skipSong = () =>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/son'},
        };
        fetch('/spotify/skip', requestOptions);
    };
    
    return(
        <Card>
            <Grid container alignItems='center'>

                <Grid item align='center' xs={4}>
                    <img src={props.image_url} height='100%' width='100%'/>
                </Grid>

                <Grid item align='center' xs={8}>

                    <Typography component='h5' variant='h5'> {props.title} </Typography>

                    <Typography color='textSecondary' variant='subtitle1'> {props.artist} </Typography>

                    <div>
                        
                        {props.is_playing ? <IconButton onClick={pauseSong}><Pause/></IconButton> : <IconButton onClick={playSong}><PlayArrow/></IconButton>}

                        <IconButton onClick={skipSong}> <SkipNext/> {props.votes} /{' '}{props.votes_needed} </IconButton>
                    </div>

                </Grid>

            </Grid>

            <LinearProgress variant='determinate' value={songProgress}/>

        </Card>
    );
}