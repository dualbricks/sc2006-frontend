import { Container, Dialog, Paper } from '@mui/material';
import React from 'react';
import { CostCalculator, Map} from '../';
import './PopupComponent-style.scss';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext, FeesContext } from '../../contexts';
import { favouriteHandler } from '../../utils/db/favouritehandler';
import {red} from '@mui/material/colors';
import CalculateIcon from '@mui/icons-material/Calculate';
import InfoIcon from '@mui/icons-material/Info';
import blue from '@mui/material/colors/blue';

const PopupComponent = ({carpark, isOpen, closeHander, infoToggler, innerToggler, predicted, normal, heavy, motorcycle}) => {
    const {Area, Development, Agency, } = carpark;
    const {user, token, setUser, isAuthenticated} = useContext(UserContext)
    const {feesList} = useContext(FeesContext);
    const [isfav, setIsfav] = React.useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 650);
    const [isFeesAvailable, setIsFeesAvailable] = useState(false);
    
    useEffect(()=> {
        if(!user) return;
        if(user.length !== 0) {
            const fav = user.savedList.includes(carpark.CarParkID);
            setIsfav(fav);
        }
    },[])
    // check if the carpark has fees
    useEffect(() => {
        const fees = feesList.filter((fee)=> fee.CarParkID.toString() === carpark.CarParkID);
        if(fees.length !== 0) {
            setIsFeesAvailable(true);
        }
    }, [feesList])

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
                <p>Area: {Area}</p>
                <p>Development: {Development}</p>
                <p>Available Normal Lots: {normal}</p>
                <p>Available Heavy Vehicle Lots: {heavy}</p>
                <p>Available Motorcycle Lots: {motorcycle}</p>
                <p>Agency: {Agency}</p>
                <p className="prediction">Predicted Lots for next 30mins: Normal: {predicted.C}, Motorcycle: {predicted.Y}, Heavy: {predicted.H}</p>

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
                {isFeesAvailable && <IconButton
                        sx={{
                            position: 'absolute',
                            right: 90,
                            bottom: 8,
                            color: (theme) => blue[500],
                        }}
                        size="large"
                    onClick={infoToggler}
                    >
                    <InfoIcon/>
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
                <p>Area: {Area}</p>
                <p>Development: {Development}</p>
                <p>Available Normal Lots: {normal}</p>
                <p>Available Heavy Vehicle Lots: {heavy}</p>
                <p>Available Motorcycle Lots: {motorcycle}</p>
                <p>Agency: {Agency}</p>
                <p className="prediction">Predicted Lots for next 30mins: Normal: {predicted.C}, Motorcycle: {predicted.Y}, Heavy: {predicted.H}</p>

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
                    {isFeesAvailable && <IconButton
                        sx={{
                            position: 'absolute',
                            right: 90,
                            bottom: 8,
                            color: (theme) => blue[500],
                        }}
                        size="large"
                    onClick={infoToggler}
                    >
                    <InfoIcon/>
                    </IconButton>
                    }
                </div>
            </Paper>)}
        </Dialog>
        
    )
        
}

export default PopupComponent