import { Dialog, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import { FeesContext } from "../../contexts";
import { Box } from "@mui/system";

const ParkingFeeCost = ({carParkID, closeHandler, isOpen}) => {

    const {feesList} = useContext(FeesContext);
    console.log(toString(feesList[0].CarParkID))
    
    const CarParkInfo = feesList.find((carpark) => carpark.CarParkID.toString() === carParkID);
    return(
        <>
        <Dialog variant="outlined"
            open={isOpen}
            maxWidth="sm"
            onClose={closeHandler} 
 
        >

            <Paper
            sx={{
                "height": "300px",
            }}
            >
                <Box
                >
                    <p>Weekdays: {CarParkInfo.weekdays_rate_1} </p>
                    <p>{CarParkInfo.weekdays_rate_2}</p>
                    <p>Saturday: {CarParkInfo.saturday_rate}</p>
                    <p>Sunday: {CarParkInfo.sunday_publicholiday_rate}</p>
                </Box>

            </Paper>
            <IconButton
                aria-label="close"
                onClick={closeHandler}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
     </Dialog>
     </>
  
        
    )

}

export default ParkingFeeCost;