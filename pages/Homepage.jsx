import React from "react";
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
// import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
// import Paper from '@mui/material/Paper';
import {Stack, Container, CardHeader, Typography, CardContent, Card, Button, Paper, Box, Grid}from '@mui/material';
import park from '../creativeAssets/image_processing20201103-8805-fkmj5v.png'

const HomePage = () => {

    return (
        <Box
       styles={{
     display: 'flex', 
     alignItems: 'center', 
     justifyContent:'center'
}}>
        
        {/* <Paper elevation={10} centered> */}

        <Typography variant="h2">BenchIt </Typography>
        <img src={park} width="600" height='auto'></img>

        {/* <CardContent> */}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            HEY FRIENDS
        </Typography>
        {/* </CardContent> */}
        <Button variant="contained" spacing={2}>Sign in</Button>
        <Button variant="contained">Sign up</Button>


        {/* </Paper> */}
    </Box>
        )
}

export default HomePage