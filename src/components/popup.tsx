//modified by Sarina for exam
/* By Harman, Yoonseo @Flaminglets
this file contains function to display detial information of one post */

import PrintIcon from '@mui/icons-material/Print';
import IosShareIcon from '@mui/icons-material/IosShare';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material';
import QRCode from 'qrcode.react';
import moment from "moment";

// for mui style
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 1024,
            lg: 1200,
            xl: 1536,
        },
    },
});

// @params: the post data that user clicked
// @return: displays all the data, print this page, copy link of this page
export default function PopUp(props) {

    props = props.data

    return (
        <div  >
            <div className="newpost">
                <div className="newpost_form" id="missing-card">
                    <div className="newpost_form_last_info">
                        <div className="newpost_lp_name">
                            <p>{props.name}</p>
                        </div>
                        <div className="lp_image_div">
                            {props.images.map((image, index) => (
                                <CardMedia className="lp_image"
                                           component="img"
                                           image={image}
                                           alt="missing pet/person image"
                                           sx={{
                                               [theme.breakpoints.down('sm')]: { width: "55vw", height: "45vw" },
                                               [theme.breakpoints.down('md')]: { width: "39vw", height: "31vw", borderRadius: "5px" },
                                               width: "25rem", height: "20rem", borderRadius: "5px"
                                           }}
                                />
                            ))}
                        </div>
                        <div className="lp_elements">
                            <div className="category-text">WITCH</div>
                            <div className="value-text">{props.witch}</div>
                            <div className="category-text">MATERIAL</div>
                            <div className="value-text">{props.material}</div>
                            <div className="category-text">WIDTH</div>
                            <div className="value-text">{props.width} (inches)</div>
                            <div className="category-text">LENGHT</div>
                            <div className="value-text">{props.length} (inches)</div>
                            <div className="category-text">WEIGHT</div>
                            <div className="value-text">{props.weight} (g)</div>
                            <div className="category-text">LOCATION</div>
                            <div className="value-text">{props.location}</div>
                            <div className="category-text">DESCRIPTION</div>
                            <div className="value-text">{props.description}</div>
                        </div>
                        <div className="price-text">${parseFloat(props.price).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
