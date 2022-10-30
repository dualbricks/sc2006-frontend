import React from 'react';
import { addExpenditure, updateExpenditure } from '../../utils/db/expenditureTracker';
import { useContext } from 'react';
import { UserContext, CarParkContext } from '../../contexts';
import './cost-calculator.style.scss'
import { Autocomplete, Dialog, Paper, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import  SaveIcon  from '@mui/icons-material/Save'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { calculateById } from '../../utils/calculator';


const CostCalculator = ({isOpen, closeHandler, carParkID, record}) => {

    const [startDate, setStartDate] = useState(record? new Date(record.startTime).toISOString().split('T')[0]: '');
    const {token} = useContext(UserContext);
    const {carParkList} = useContext(CarParkContext);
    const [loading, setLoading] = useState(false)
    const [cost, setCost] = useState(record ? record.cost : 0);
    const [startTime, setStartTime] = useState(record? new Date(record.startTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).split(' ')[0]: '');
    const [endTime, setEndTime] = useState(record? new Date(record.endTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).split(' ')[0]:"");
    const [endDate, setEndDate] = useState(record? new Date(record.endTime).toISOString().split('T')[0]: '');
    const [specific, setSpecific] = useState(carParkID? true: false);
    const [autoCompleteValue, setAutoCompleteValue] = useState('');
    const {refresh, setRefresh} = useContext(UserContext);
    const nameArray = carParkList.map((carPark)=>{
         const option ={
             carpark: carPark.Development,
             id: carPark.CarParkID
         }
         return option
     });
     const key = "carpark";
     const arrayUniqueByKey = [...new Map(nameArray.map(item =>
        [item[key], item])).values()];

     const [carPark, setCarPark] = useState(specific? {id: carParkID}:arrayUniqueByKey[0]);

     const defaultOption = {
         options: arrayUniqueByKey,
         getOptionLabel: (option) => option.carpark ? option.carpark : option,
         isOptionEqualToValue: (option, value) => {
           return option.id === value.id;} 
     }
    // reset all form states in costForm
    const resetAll = () => {
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
        setCost(0);
        setCarPark(arrayUniqueByKey[0]);
    }

    const onCostCalculatorSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();
        const startDateTime = new Date(startDate + ' ' + startTime);
        const endDateTime = new Date(endDate+' '+endTime);
        const diff = endDateTime.getTime() - startDateTime.getTime();
        if(diff < 0) {
            alert('End date and time should be greater than start date and time');
            return;
        }
        let  expenditureRecord = {}
        if(specific) {
             expenditureRecord = {
                carParkID: carParkID,
                startTime: startDateTime,
                endTime: endDateTime,
                cost: cost,
            }

        }else {
            if(!carPark.id) {

                alert('Please select a valid carpark ');
                return;
            }
             expenditureRecord = {
                carParkID: carPark.id,
                startTime: startDateTime,
                endTime: endDateTime,
                cost: cost,
            }
        }

        if(record) {
            try{
                setLoading(true);
                await updateExpenditure(token, record._id, expenditureRecord);
                setLoading(false);
                alert("Expenditure record updated successfully");
                resetAll();
                setRefresh(!refresh);
            }catch(e) {
                setLoading(false);
                alert(e);
            }
            return;
        }

        try{
            setLoading(true);
            await addExpenditure(token, expenditureRecord);
            alert('expense added successfully');
            setLoading(false);
            resetAll();
        }catch(e) {
            alert(e);
            setLoading(false);
        }
    }
    const isCalculationAuto = carParkID === '1' || carParkID === '2' || carPark.id === '1' || carPark.id === '2' || carParkID === '3' || carPark.id === '3';
    useEffect(()=>{
        console.log(isCalculationAuto)
        if(isCalculationAuto) {
            if(startDate.length > 0 && endDate.length > 0 && startTime.length > 0 && endTime.length > 0) {
                const startDateTime = new Date(startDate + ' ' + startTime);
                const endDateTime = new Date(endDate+' '+endTime);
                const calculatedCost = calculateById(startDateTime, endDateTime, carParkID? carParkID: carPark.id);
                setCost(Number(calculatedCost.toFixed(2)));
            }
        }
    }, [startDate, endDate, startTime, endTime, carParkID, carPark.id, isCalculationAuto])
    return (
        <Dialog variant="outlined"
            open={isOpen}
            maxWidth="sm"
            onClose={closeHandler} 
        
        >
            {specific ? (<Paper className='border rounded'>
            <Form id='costForm' onSubmit={onCostCalculatorSubmit}>
                <Form.Group className="mb-3">
                    <TextField type="text" name='id' value={carParkID} label="Car Park ID" variant="outlined" disabled/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <TextField type="date" name="startDate" onChange={(e)=>setStartDate(e.target.value)} value={startDate} label="Start Date" required />
                    <TextField type="time" name="stime"  onChange={(e)=>setStartTime(e.target.value)} value={startTime} min="00:00" max="23:59" label="Start Time" required />

                </Form.Group>

                <Form.Group className="mb-3">
                    <TextField type="date" name="endDate" min={startDate} onChange={(e)=>setEndDate(e.target.value)} value={endDate} required label="End Date"/>
                    <TextField type="time" name="etime" min="00:00" max="23:59" onChange={(e)=>setEndTime(e.target.value)} value={endTime} required label="End TIme"/>
                    
                </Form.Group>

                <Form.Group className="mb-3">
                    <TextField type="number" min="0" step="any" name="cost" onChange={(e)=>setCost(e.target.value)} value={cost} required label="cost"/>
                    
                </Form.Group>

                <Form.Group className="mb-3">
                    <LoadingButton 
                        size="large"
                        loadingPosition='start'
                        loading={loading}
                        startIcon={<SaveIcon/>} 
                        variant='outlined'
                        form='costForm'
                        type='submit'
                        >
                        Save
                    </LoadingButton>
                </Form.Group>   
            </Form>
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
        </Paper>) : (<Paper className='border rounded'>
            <Form id='costForm' onSubmit={onCostCalculatorSubmit}>
                <Form.Group className="mb-3">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        {...defaultOption}
                        sx={{ width: 300 }}
                        value={carPark}
                        onChange={(event, newValue) => {
                            setCarPark(newValue);
                        }}
                        inputValue={autoCompleteValue}
                        onInputChange={(event, newInputValue) => {
                            setAutoCompleteValue(newInputValue);
                        }}
                        renderInput={(params) => <TextField {...params}
                            onInput={(e)=>setCarPark(e.target.value)} 
                            label="Carpark Name" required/>}
                    />

                </Form.Group>

                <Form.Group className="mb-3">
                    <TextField type="date" name="startDate" onChange={(e)=>setStartDate(e.target.value)} value={startDate} label="Start Date" required />
                    <TextField type="time" name="stime"  onChange={(e)=>setStartTime(e.target.value)} value={startTime} min="00:00" max="23:59" label="Start Time" required />

                </Form.Group>

                <Form.Group className="mb-3">
                    <TextField type="date" name="endDate" min={startDate} onChange={(e)=>setEndDate(e.target.value)} value={endDate} required label="End Date"/>
                    <TextField type="time" name="etime" min="00:00" max="23:59" onChange={(e)=>setEndTime(e.target.value)} value={endTime} required label="End TIme"/>
                    
                </Form.Group>

                <Form.Group className="mb-3">
                    <TextField type="number" min="0" step="any" name="cost" onChange={(e)=>setCost(e.target.value)} value={cost} required label="cost"/>
                    
                </Form.Group>

                <Form.Group className="mb-3">
                    <LoadingButton 
                        size="large"
                        loadingPosition='start'
                        loading={loading}
                        startIcon={<SaveIcon/>} 
                        variant='outlined'
                        form='costForm'
                        type='submit'
                        >
                        Save
                    </LoadingButton>
                </Form.Group>   
            </Form>
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
        </Paper>)}
    </Dialog>
    );
};

export default CostCalculator;