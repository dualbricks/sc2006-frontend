import './location-button.style.scss'
import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const LocationButton = ({setlocation})=> {
    //onClick function
    const onGeoButtonClick = () => {
        if(!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setlocation({latitude: position.coords.latitude, 
                longitude: position.coords.longitude});
        }, () => {
            alert('Unable to fetch location');
        })
    }
    return (
            <IconButton onClick={onGeoButtonClick}> 
                <LocationOnIcon/>
            </IconButton>

    )

}

export default LocationButton