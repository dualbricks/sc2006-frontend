import React from 'react';
import { Button } from '..';
import { addExpenditure } from '../../utils/db/expenditureTracker';
import { useContext } from 'react';
import { UserContext, CarParkContext } from '../../contexts';
import './cost-calculator.style.scss'
import { Autocomplete, TextField } from '@mui/material';
const CostCalculator = () => {

    const [startDate, setStartDate] = React.useState('');
    const {token} = useContext(UserContext);
    const {carParkList} = useContext(CarParkContext);
    console.log(carParkList);
    const nameArray = carParkList.map((carPark)=>carPark.Development);
    const dateOnChangeHandler = (e) => {
        setStartDate(e.target.value);
    }

    const onCostCalculatorSubmit = async (e) => {
        e.preventDefault();
        const startDateTime = new Date(startDate + ' ' + document.getElementsByName('stime')[0].value);
        const endDateTime = new Date(document.getElementsByName('endDate')[0].value + ' ' + document.getElementsByName('etime')[0].value);
        const diff = endDateTime.getTime() - startDateTime.getTime();
        if(diff < 0) {
            alert('End date and time should be greater than start date and time');
            return;
        }
        const expenditureRecord = {
            carParkID: document.getElementsByName('carparkID')[0].value,
            startTime: startDateTime,
            endTime: endDateTime,
            cost: document.getElementsByName('cost')[0].value,
        }
        try{
            await addExpenditure(token, expenditureRecord);
            alert('expense added successfully');
            document.getElementById('costForm').reset();
        }catch(e) {
            alert(e);
        }
    }
    return (
        <div className="costCalculator container-lg">
            <form id='costForm' onSubmit={onCostCalculatorSubmit}>
                <div className="carpark">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={nameArray}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Carpark Name" required/>}
                    />
                </div>
                
                <div className="startTime">
                    <TextField type="date" name="startDate" onChange={dateOnChangeHandler} label="Start Date" required />
                    <TextField type="time" name="stime" min="00:00" max="23:59" label="Start Time" required />
                </div>
                <div className="endTime">

                    <TextField type="date" name="endDate" min={startDate}  required label="End Date"/>
    
                    <TextField type="time" name="etime" min="00:00" max="23:59" required label="End TIme"/>
                </div>
                <div className="cost">
                    <TextField type="number" min="0" step="any" name="cost" required label="cost"/>
                </div>
                <Button>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CostCalculator;