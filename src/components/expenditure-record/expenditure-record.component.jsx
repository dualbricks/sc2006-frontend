import { Paper } from '@mui/material';
import './expenditure-record.style.scss'
import { useState } from 'react';
import CostCalculator from '../cost-calculator/cost-calculator.component';
import CalculateIcon from '@mui/icons-material/Calculate';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import { deleteExpenditure } from '../../utils/db/expenditureTracker';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { Box } from '@mui/system';
const ExpenditureRecord = ({record}) => {
    const {carParkID, startTime, endTime, cost,createdAt, _id } = record;
    const [isOpen, setIsOpen] = useState(false);
    const {token} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const {refresh, setRefresh} = useContext(UserContext);
    const toggler = () => {
        setIsOpen(!isOpen);
    }

    const deleteHandler = async () => {
        setLoading(true);
        try {
            await deleteExpenditure(token, _id);
            alert("Expenditure deleted successfully");
            setRefresh(!refresh);
        }catch(e) {
            alert(e);
        }
        setLoading(false);
    }
    return (

        <Paper className="expenditure-record rounded rounded border">
            <Box textAlign='center'>
                <p>Carpark ID: {carParkID}</p>
                <p>Date: {new Date(createdAt).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
                <p>Start Time: {new Date(startTime).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
                <p>End Time: {new Date(endTime).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
                <p>Cost: ${cost}</p>
                <IconButton 
                    size="large"
                    onClick={toggler}
                    >
                    <CalculateIcon/>
            </IconButton>
            <IconButton 
                    size="large"
                    onClick={deleteHandler}
                    disabled={loading}
                    >
                    <DeleteIcon/>
            </IconButton>
            </Box>
 

            {isOpen && <CostCalculator carParkID={carParkID} isOpen={isOpen} closeHandler={toggler} record={record}/>}
        </Paper>)
}

export default ExpenditureRecord