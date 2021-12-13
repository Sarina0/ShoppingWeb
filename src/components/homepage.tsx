//  unnecessary code been removed or edited Sarina Mock exam
/* By Yoonseo @Flaminglets
this file contains function for dashboard for the homepage
dashboard displays 8 recent posts
if the number of posts in database is less then 8, it will only show that number of posts on dashboard */

import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { createTheme } from '@mui/material';

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

// @params: all the posts data from database
// @return: displays most recent posts on dashboard
export default function Homepage(props) {
    props = props.props
    return (
        <div className="home_div">
            <div className="home_backcolor">
            <h1 className="home_title">Want to show your cursed 
                </h1>
                <h1 className="home_title2" >knitted scarves?</h1>
            </div>
        </div>
    );
};
