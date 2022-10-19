import './location-button.style.scss'
import {Button} from '../index'
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
        <div className="location-button-container">
            <Button className="location-button" onClick={onGeoButtonClick}/>
        </div>
    )

}

export default LocationButton