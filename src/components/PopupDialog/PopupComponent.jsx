import { Container, Dialog, Paper } from '@mui/material';
import React from 'react';
import { CostCalculator, Map} from '../';
import './PopupComponent-style.scss';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { favouriteHandler } from '../../utils/db/favouritehandler';
import {red} from '@mui/material/colors';
import CalculateIcon from '@mui/icons-material/Calculate';

const PopupComponent = ({carpark, isOpen, closeHander, innerToggler, predicted, normal, heavy, motorcycle}) => {
    const {Area, Development, Agency, } = carpark;
    const {user, token, setUser, isAuthenticated} = useContext(UserContext)

    const [isfav, setIsfav] = React.useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 650);


    useEffect(()=> {
        if(user.length !== 0) {
            const fav = user.savedList.includes(carpark.CarParkID);
            setIsfav(fav);
        }
    },[])

    const toggler = () => {
        innerToggler();
    }

    const updateMedia = () => { 
        setIsDesktop(window.innerWidth > 600);
    }



    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });
    const favOnclick = async (e) => {
        console.log("favOnclick");
        setDisabled(true);
        try {
            const data = await favouriteHandler(token, {carParkID:carpark.CarParkID}, isfav)
            if(data) {
                console.log(data)
                setUser(data);
                if(data.savedList.includes(carpark.CarParkID)) {
                    setIsfav(true);
                }else {
                    setIsfav(false);
                }
                setDisabled(false);
            }
        }catch(e) {
            console.log(e)
            alert(e.message);
            setDisabled(false);
        }

    }
    return (
            <Dialog variant="outlined" className="popup-container-car"
            open={isOpen}
            maxWidth="xl"
            onClose={closeHander}
        >
            {isDesktop ? (<Paper className='container paper-popup'>
                <IconButton
                    aria-label="close"
                    onClick={closeHander}
                    sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                <CloseIcon />
                </IconButton>
                <div>
                    <Map carpark={carpark} width="500" height="500" />
                </div>
                <Container>
                <h2>Area: {Area}</h2>
                <h2>Development: {Development}</h2>
                <h3>Available Normal Lots: {normal}</h3>
                <h3>Available Heavy Vehicle Lots: {heavy}</h3>
                <h3>Available Motorcycle Lots: {motorcycle}</h3>
                <h2>Agency: {Agency}</h2>
                <h3 className="prediction">Predicted Lots for next 30mins: {predicted.Y},{predicted.H},{predicted.C} </h3>

                </Container>
                <div>
                    <IconButton
                        aria-label="favorite"
                        onClick={favOnclick}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        color: (theme) => isfav ? red[500]: theme.palette.grey[500],
                        }}
                    disabled={disabled}
                    size="large"
                    >
                    <FavoriteIcon />
                </IconButton>
                {isAuthenticated && <IconButton
                        sx={{
                        position: 'absolute',
                        right: 50,
                        bottom: 8,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    size="large"
                    onClick={toggler}
                    >
                    <CalculateIcon/>
                    </IconButton>
                    }
                
                
                </div>
            </Paper>): (<Paper className='paper-popup'>
                <IconButton
                    aria-label="close"
                    onClick={closeHander}
                    sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                size="large"
                >
                <CloseIcon />
                </IconButton>
                <div>
                    <Map carpark={carpark} width="300" height="300"/>
                </div>
                <Container>
                <h2>Area: {Area}</h2>
                <h2>Development: {Development}</h2>
                <h3>Available Normal Lots: {normal}</h3>
                <h3>Available Heavy Vehicle Lots: {heavy}</h3>
                <h3>Available Motorcycle Lots: {motorcycle}</h3>
                <h2>Agency: {Agency}</h2>
                <h3 className="prediction">Predicted Lots for next 30mins: {predicted.Y},{predicted.H},{predicted.C} </h3>

                </Container>
                <div>
                    <IconButton
                        aria-label="favorite"
                        onClick={favOnclick}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        color: (theme) => isfav ? red[500]: theme.palette.grey[500],
                        }}
                    disabled={disabled}
                    size="large"
                    >
                    <FavoriteIcon />
                    </IconButton>
                    {isAuthenticated && <IconButton
                        sx={{
                        position: 'absolute',
                        right: 50,
                        bottom: 8,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    size="large"
                    onClick={toggler}
                    >
                    <CalculateIcon/>
                    </IconButton>
                    }
                </div>
            </Paper>)}
        </Dialog>
        
    )
        
}

export default PopupComponent