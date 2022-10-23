import React from 'react';
import { addExpenditure } from '../../utils/db/expenditureTracker';
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


const CostCalculator = ({isOpen, closeHandler, carParkID}) => {

    const [startDate, setStartDate] = useState('');
    const {token} = useContext(UserContext);
    const {carParkList} = useContext(CarParkContext);
    const [loading, setLoading] = useState(false)
    const [cost, setCost] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [specific, setSpecific] = useState(false);
    const [autoCompleteValue, setAutoCompleteValue] = useState('');
    
    useEffect(()=>{
        if(carParkID) {
            setSpecific(true);
        }

    },[])
    const nameArray = carParkList.map((carPark)=>{
         const option ={
             carpark: carPark.Development,
             id: carPark.CarParkID
         }

         return option
     });

     const [carPark, setCarPark] = useState(nameArray[0]);

     const defaultOption = {
         options: nameArray,
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
        setCarPark(nameArray[0]);
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