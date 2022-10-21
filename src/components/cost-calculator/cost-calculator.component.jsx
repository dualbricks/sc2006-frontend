import React from 'react';
import { Button } from '..';
import { addExpenditure } from '../../utils/db/expenditureTracker';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
const CostCalculator = () => {

    const [startDate, setStartDate] = React.useState('');
    const {token} = useContext(UserContext);
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
        <div className="costCalculator">
            <form id='costForm' onSubmit={onCostCalculatorSubmit}>
                <div className="carparkID">
                    <label>CarPark ID </label>
                    <input type="text" name="carparkID" required />
                </div>
                
                <div className="startTime">
                    <label>Start Date: </label>
                    <input type="date" name="startDate" onChange={dateOnChangeHandler} required />
                    <label>Start Time: </label>
                    <input type="time" name="stime" min="00:00" max="23:59" required />
                </div>
                <div className="endTime">
                    <label>End Date: </label>
                    <input type="date" name="endDate" min={startDate}  required />
                    <label>End Time: </label>
                    <input type="time" name="etime" min="00:00" max="23:59" required />
                </div>
                <div className="cost">
                    <label>Cost: </label>
                    <input type="number" min="0" step="any" name="cost" required />
                </div>
                <Button>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CostCalculator;