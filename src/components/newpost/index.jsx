/* By Yoonseo @Flaminglets
this file contains create new post form function
get post information inputs from user and creates new post data to database */

import * as React from "react";
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import moment from "moment";
import TextField from "@mui/material/TextField";
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import CardMedia from "@mui/material/CardMedia";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material";
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCGJg6E9WkiiIbbOhAWw_A0wSMS3YKaNBs");

const FlamingoSubmitButton = styled(Button)({
    "&:hover": {
        backgroundColor: "#EF7B27"
    },
})

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

// @return: create new post page with pages functions
// handle creating new post
export default function NewPost() {
    const [session] = useSession();
    const [createdAt, setCreatedAt] = useState(new Date());
    const [createdAtError, setCreatedAtError] = useState('');
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState('');
    const [witch, setWitch] = useState("");
    const [witchError, setWitchError] = useState('');
    const [material, setMaterial] = useState("");
    const [materialError, setMaterialError] = useState('');
    const [length, setLength] = useState("");
    const [lengthError, setLengthError] = useState('');
    const [width, setWidth] = useState("");
    const [widthError, setWidthError] = useState('');
    const [weight, setWeight] = useState("");
    const [weightError, setWeightError] = useState('');
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState('');
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState('');
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState("");
    const [images, setImages] = useState(['']);
    const [imagesError, setImagesError] = useState(['']);

    const onChangeName = (event) => {
        if (event) {
            setName(event.target.value);
            setNameError('');
        }
    }

    const onChangeWitch = (event) => {
        if (event) {
            setWitch(event.target.value);
            setWitchError('');
        }
    }

    const onChangeMaterial = (event) => {
        if (event) {
            setMaterial(event.target.value);
            setMaterialError('');
        }
    }

    const onChangeLength = (event) => {
        if (event) {
            setLength(event.target.value);
            setLengthError('');
        }
    }

    const onChangeWidth = (event) => {
        if (event) {
            setWidth(event.target.value);
            setWidthError('');
        }
    }

    const onChangeWeight = (event) => {
        if (event) {
            setWeight(event.target.value);
            setWeightError('');
        }
    }

    const onChangeLocation = (event) => {
        if (event) {
            setLocation(event.target.value);
            setLocationError('');
        }
    }

    const onAddImage = (event) => {
        if (event) {
            images.push('');
            setImages([...images]);
        }
    }

    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyCGJg6E9WkiiIbbOhAWw_A0wSMS3YKaNBs',
        onPlaceSelected: (place) => {
            if (place) {
                setLocation(place.formatted_address);
                setLocationError('');
            }
        },
    });

    const onUserMyLocation = async (event) => {
        await navigator.geolocation.getCurrentPosition(
            position => {
                if (position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    Geocode.fromLatLng(lat, lng).then((response) => {
                        const address = response.results[0].formatted_address;
                        setLocation(address);
                        setLocationError('');
                        console.log('geocode ====>', address);
                    })
                }

            });
    }

    const onChangePrice = (event) => {
        if (event) {
            setPrice(event.target.value);
            setPriceError('');
        }
    }

    const onChangeDescription = (event) => {
        if (event) {
            setDescription(event.target.value);
            setDescriptionError('');
        }
    }

    // using the async function getImageToBase64(imageURL) converts the image url to base64 string of image
    const handleSetImage = async (event, index) => {
        await getImageToBase64(event.target.files[0], (result) => {
            images[index] = result;
            setImages([...images]);
            imagesError[index] = '';
            setImagesError([...imagesError]);
        });
    };
    const getImageToBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    // submit the new post data to the database
    // this is called in lastPage
    const onSubmit = async () => {

        var isValid = true;
        if (name == '' || name == null) {
            setNameError('Please input a name');
            isValid = false;
        }
        if (witch == '' || witch == null) {
            setWitchError('Please input a witch');
            isValid = false;
        }
        if (material == '' || material == null) {
            setMaterialError('Please input a material');
            isValid = false;
        }
        if (length == '' || length == null) {
            const lengthNumber = Number(length);
            if (!lengthNumber) {
                setLengthError('Please input a valid length');
                isValid = false;
            } else {
                if (lengthNumber <= 0) {
                    setLengthError('Please input length than 0.');
                    isValid = false;
                }
                if (lengthNumber > 100) {
                    setLengthError('Please input price less than 100');
                    isValid = false;
                }
            }
        }
        if (width == '' || width == null) {
            const widthNumber = Number(width);
            if (!widthNumber) {
                setWidthError('Please input a valid width');
                isValid = false;
            } else {
                if (widthNumber <= 0) {
                    setWidthError('Please input width than 0.');
                    isValid = false;
                }
                if (widthNumber > 100) {
                    setWidthError('Please input width less than 100');
                    isValid = false;
                }
            }
        }
        if (weight == '' || weight == null) {
            const weightNumber = Number(weight);
            if (!weightNumber) {
                setWeightError('Please input a valid weight');
                isValid = false;
            } else {
                if (weightNumber <= 0) {
                    setWeightError('Please input weight than 0.');
                    isValid = false;
                }
                if (weightNumber > 100000) {
                    setWeightError('Please input weight less than 100000');
                    isValid = false;
                }
            }
        }
        if (location == '' || location == null) {
            setLocationError('Please input a location');
            isValid = false;
        }
        if (description == '' || description == null) {
            setDescriptionError('Please input a description');
            isValid = false;
        }
        if (price == '' || price == null) {
            setPriceError('Please input a price');
            isValid = false;
        } else {
            const priceNumber = Number(price);
            if (!priceNumber) {
                setPriceError('Please input a valid price');
                isValid = false;
            } else {
                if (priceNumber <= 0) {
                    setPriceError('Please input price than 0.');
                    isValid = false;
                }
                if (priceNumber > 10000) {
                    setPriceError('Please input price less than 10000');
                    isValid = false;
                }
            }
        }
        for (let i = 0; i < images.length; i++) {
            if (images[i] == '' || images[i] == null) {
                imagesError[i] = 'Please upload a image';
                setImagesError([...imagesError]);
                isValid = false;
            }
        }

        if (isValid) {
            const data = {
                name,
                witch,
                material,
                length,
                width,
                weight,
                description,
                location,
                images: JSON.stringify(images),
                price,
                user: session._id
            };
            const body = JSON.stringify(data);

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            };

            const response = await fetch(`/api/post`, requestOptions);
            window.location.href = "/";
        }
    }

    return(
        <div className="new_div">
            <div className="newpost">
                {/* mobile size window */}
                <div className="post_mobile">
                    <p className="newpost_title">Upload my Scarf</p>
                </div>
                {/* web size window */}
                <div className="post_web">
                    <p className="newpost_title">Upload my Scarf</p>
                    <TextField
                        required
                        name="name_scarf"
                        id="outlined-required"
                        label="Name of your scarf"
                        variant="outlined"
                        color="primary"
                        className="newpost_form_element"
                        inputProps={{ maxLength:  25}}
                        onChange={onChangeName}
                        value={name}
                        error={!!nameError}
                        helperText={nameError}
                        sx={{margin: "0.5rem 0"}}
                    />
                    <TextField
                        required
                        name="name_witch"
                        id="outlined-required"
                        label="Name of witch"
                        variant="outlined"
                        color="primary"
                        className="newpost_form_element"
                        inputProps={{ maxLength:  25}}
                        onChange={onChangeWitch}
                        value={witch}
                        error={!!witchError}
                        helperText={witchError}
                        sx={{margin: "0.5rem 0"}}
                    />
                    <TextField
                        required
                        name="material"
                        id="outlined-required"
                        label="Material"
                        variant="outlined"
                        color="primary"
                        className="newpost_form_element"
                        inputProps={{ maxLength:  25}}
                        onChange={onChangeMaterial}
                        value={material}
                        error={!!materialError}
                        helperText={materialError}
                        sx={{margin: "0.5rem 0"}}
                    />
                    <div className="row-center">
                        <TextField
                            required
                            name="length"
                            id="outlined-required"
                            label="Length (inches)"
                            variant="outlined"
                            color="primary"
                            className="newpost_form_element"
                            inputProps={{ maxLength:  4}}
                            onChange={onChangeLength}
                            value={length}
                            error={!!lengthError}
                            helperText={lengthError}
                            sx={{margin: "0.5rem 0"}}
                        />
                        <TextField
                            required
                            name="width"
                            id="outlined-required"
                            label="Width (inches)"
                            variant="outlined"
                            color="primary"
                            className="newpost_form_element right-item"
                            inputProps={{ maxLength:  4}}
                            onChange={onChangeWidth}
                            value={width}
                            error={!!widthError}
                            helperText={widthError}
                            sx={{margin: "0.5rem 0"}}
                        />
                    </div>
                    <div className="row-center">
                        <TextField
                            required
                            name="weight"
                            id="outlined-required"
                            label="Weight (g)"
                            variant="outlined"
                            color="primary"
                            className="newpost_form_element"
                            inputProps={{ maxLength:  6}}
                            onChange={onChangeWeight}
                            value={weight}
                            error={!!weightError}
                            helperText={weightError}
                            sx={{margin: "0.5rem 0"}}
                        />
                        <TextField
                            required
                            name="price"
                            id="outlined-required"
                            label="Price"
                            variant="outlined"
                            color="primary"
                            className="newpost_form_element right-item"
                            inputProps={{ maxLength:  25}}
                            onChange={onChangePrice}
                            value={price}
                            error={!!priceError}
                            helperText={priceError}
                            sx={{margin: "0.5rem 0"}}
                        />
                    </div>
                    <input ref={ref} style={{ width: "100%" }} value={location} onChange={onChangeLocation}/>
                    {/*<Autocomplete*/}
                    {/*    apiKey={'AIzaSyCGJg6E9WkiiIbbOhAWw_A0wSMS3YKaNBs'}*/}
                    {/*    onPlaceSelected={(place) => {*/}
                    {/*        if (place) {*/}
                    {/*            setLocation(place.formatted_address);*/}
                    {/*            setLocationError('');*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    defaultValue={location}*/}
                    {/*/>*/}
                    <div className="row-center">
                        <div className="location-error">{locationError}</div>
                        <Button className="location-button" onClick={onUserMyLocation}>Use my location</Button>
                    </div>

                    <TextField
                        required
                        name="description"
                        id="outlined-required"
                        label="Description"
                        variant="outlined"
                        color="primary"
                        multiline={true}
                        minRows={5}
                        className="newpost_form_element"
                        onChange={onChangeDescription}
                        value={description}
                        error={!!descriptionError}
                        helperText={descriptionError}
                        sx={{margin: "0.5rem 0"}}
                    />
                    <div className="newpost_form_image">
                        {images && images.map((image, index) => {
                           return (
                               <>
                                   <input
                                       name="image"
                                       id="outlined-required"
                                       type="file"
                                       accept="image/*"
                                       className="myimage"
                                       onChange={(event) => handleSetImage(event, index)}
                                       required
                                   />
                                   {image == "" && (
                                       <p className="newpost_image_error">{imagesError[index]}</p>
                                   )}
                                   {image != "" && (
                                       <div className="input_image_div">
                                           <p>Chosen image</p>
                                           <CardMedia className="input_image"
                                                      component="img"
                                                      image={image}
                                                      alt="missing pet/person image"
                                                      sx={{width: "13rem", height: "10rem"}}
                                           />
                                       </div>
                                   )}
                               </>
                           )
                        })}
                        <Button className="add-image-button" onClick={onAddImage}>
                            +
                        </Button>
                    </div>
                    <div className="newpost_buttons">
                        <FlamingoSubmitButton type="submit" variant="contained" color="success" onClick={onSubmit} className="newpost_button_next newpost_button_submit"
                                              sx={{[theme.breakpoints.down('sm')]: {margin: "1vw", width: "40vw", fontSize: "2.5vw", height: "2.3rem"},
                                                  [theme.breakpoints.down('md')]: {margin: "1.5vw 0 1.5vw 1.5vw"},
                                                  backgroundColor: "#5F7470", margin: "1rem 0 1rem 1rem", color:"white", minHeight: "1.6rem", width: "6.5rem", fontSize: "0.7rem"}}>
                           UPLOAD
                        </FlamingoSubmitButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
