import React, { useState } from 'react';
import { 
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    Collapse,
 } from '@mui/material';
 import {Link, useNavigate} from 'react-router-dom';
 import { Alert } from '@mui/lab';

export default function CreateRoomPage(props){
    
    const [guestCanPause, setguestCanPause] = useState(true);
    const [votesToSkip, setvotesToSkip] = useState(2);
    const [updateMsg, setupdateMsg] = useState('');
    const navigate = useNavigate();

    const handleVotesChange = (votes) =>{
        setvotesToSkip(votes.target.value);
    };

    const handleGuestsCanPauseChange = (e) =>{
        setguestCanPause(e.target.value === 'true' ? true : false);
    };


    const handleRoomButtonPressed = () =>{
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch('/api/create-room', requestOptions).then((response) => response.json()).then((data) => navigate(`/room/${data.code}`));
    };

    const handleUpdateRoomButtomPressed = () =>{
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: props.roomCode,
            }),
        };
        fetch('/api/update-room', requestOptions).then((response) => {
            if(response.ok){
                setupdateMsg('Successfully updated room!');
            } else{
                setupdateMsg('Error updating room.');
            }
        });
    }

    const title = props.update ? "Update Room" : "Create a Room";

    const showCreateButtons = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Button color='success' variant='contained' onClick={handleRoomButtonPressed}> Create a Room </Button>
                </Grid>

                <Grid item xs={12} align='center'>
                    <Button color='error' variant='contained' to='/' component={Link}> Back </Button>
                </Grid>
            </Grid>
        );
    };

    const showUpdateButtons = () => {
        return(
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <Button color='success' variant='contained' onClick={handleUpdateRoomButtomPressed}> Update Room </Button>
                </Grid>
            </Grid>
        );
    };
        
        return (
        
        <Grid container spacing={1}> 
            
            <Grid item xs={12} align='center'>
                <Collapse in={updateMsg != ''}>
                    {updateMsg == 'Successfully updated room!' ? 
                        (<Alert severity='success' onClose={() => {setupdateMsg('')}}>{updateMsg}</Alert>) : 
                            (<Alert severity='error' onClose={() => {setupdateMsg('')}} >{updateMsg}</Alert>)}
                </Collapse>
            </Grid>

            <Grid item xs={12} align='center'>
                <Typography component='h4' variant='h4'>
                    {title}   
                </Typography>
            </Grid>
            
            <Grid item xs={12} align='center'>
                
                <FormControl component='fieldset'>
                    
                    <FormHelperText component='div'> Guest Control of Playback State </FormHelperText>
                    
                    <RadioGroup row defaultValue={props.guestCanPause} onChange={handleGuestsCanPauseChange}>
                        <FormControlLabel value='true' control={<Radio color='success'/>}  label='Play/Pause' labelPlacement='bottom'/>
                        <FormControlLabel value='false' control={<Radio color='secondary'/>}  label='No Control' labelPlacement='bottom'/>                      
                    </RadioGroup>

                </FormControl>
            </Grid>

            <Grid item xs={12} align='center'>
                <FormControl>
                    <TextField required={true} onChange={handleVotesChange} type='number' defaultValue={props.votesToSkip} inputProps={{min: 1, style:{textAlign: 'center'}}}/>
                        <FormHelperText component='div'> Votes Required to Skip Song </FormHelperText>
                </FormControl>
            </Grid>

            {props.update ? showUpdateButtons() : showCreateButtons()}

        </Grid>);
}


