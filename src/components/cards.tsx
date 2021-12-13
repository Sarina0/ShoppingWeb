// By Sarina Exam
/* By Yoonseo @Flaminglets
this file contains a card function that can be used to display each card
displays a post information including name, image, location, date, time
when the image is clicked, redirects to detail page with post id
when 'contact' button is click, displays contact information with popup */


import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, createTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import moment from "moment";

// for mui style
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

// @params: a post data
// @return: a post card
export default function PostCard(props) {
    // redirects to detail page of the post
    const handleCardClick = () => {
        location.href = `/detailpage/${props.id}`;
    }

    return (
        <Card className="home_cards" elevation={5} 
            sx={{[theme.breakpoints.down('sm')]: {padding: "1vw", height: "60vw"}, padding: "0.5rem", height: "20.5rem"}}>
            {/* redirect to detail page when clicked */}
            <CardActionArea onClick={handleCardClick} className="home_card"
            sx={{padding: "0", margin: "0"}}>
                <p className="home_card_title">
                    {/*Edited for card view*/}
                    {props.name}
                </p>
                <CardMedia className="home_card_media"
                    component="img"
                    image={props.images[0]}
                    alt="lost pet/person image"
                />
                <CardContent className="home_card_info_div"
                sx={{[theme.breakpoints.down('sm')]: {padding: "1vw", height: "10vw"}, padding: "0.7rem", height: "4rem"}}>
                <div className="home_card_info_div">
                    <p className="home_card_info">Width: {props.width} inches</p>
                    <p className="home_card_info">Length: {props.length} inches</p>
                    <p className="home_card_info">Weight: {props.weight} g</p>
                    <p className="home_card_info">Price: ${props.price}</p>
                    <p className="home_card_info type">{props.type}</p>
                </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
