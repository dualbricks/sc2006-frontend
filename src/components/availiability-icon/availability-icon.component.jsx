import { IconButton } from "@mui/material"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import { red, orange, green } from "@mui/material/colors";

const AvailabilityIcon = ({ availability, lotType }) => {

    const getIcon = () => { 
        if(lotType === "Normal") {
            return <DirectionsCarIcon/>
        }
        if(lotType === "Heavy") {
            return <LocalShippingIcon/>
        }
        if(lotType === "Motorcycle") {
            return <TwoWheelerIcon/>
        }
    }
    const getColour = () => {
        if (availability < 10) {
            return red[500];
        }
        if (availability < 50) {
            return orange[500];
        }
        return green[500];
    }

    return(
        <IconButton
        aria-label="favorite"
        sx={{
        color: getColour(),
        }}
        size="large"
        >
            {availability}
            {getIcon()}
        </IconButton>

    )

}

export default AvailabilityIcon;