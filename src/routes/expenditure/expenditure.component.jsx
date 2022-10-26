import {ExpenditureListContainer, ExpenditureOverviewContainer} from '../../components'
import { useContext, useEffect, useState } from 'react';
import './expenditure.style.scss'
import { UserContext } from '../../contexts';
import { getExpenditures, getExpendituresByYear } from '../../utils/db/expenditureTracker';
import { Grid } from '@mui/material';
// generate data array 

const Expenditure = () => {

    // form handling
    const [month, setMonth] = useState('');
    const [records, setRecords] = useState([]);
    const {token} = useContext(UserContext)
    const [filterRecords, setFilterRecords] = useState([]);
    const [yearRecords, setYearRecords] = useState([]);
    const [year, setYear] = useState('');
    const dateNow = new Date();
    const lastestMonth  = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1);
    const lastestYear = dateNow.getFullYear();
    const {refresh} = useContext(UserContext);
    //initialise records
    useEffect(() => {
        // fetch records from db
        const fetchRecords = async () => {
            try{
                const data = await getExpenditures(token, 100, 0);
                setRecords(data);
                setFilterRecords(data);
            }catch(e) {
                alert(e.message);
            }
        }
        fetchRecords();
        // setRecords(records);

    },[refresh])
    function handleInput (event) {
        setMonth(event.target.value);
    }
    useEffect(()=>{
        console.log(month)
        if(month.length === 0) {
            setFilterRecords(records);
            return;
        }
        const newRecords = records.filter((record)=>{
            let monthString = record.startTime.split('-')[0] +"-"+ record.startTime.split('-')[1];
            console.log(monthString);
            return monthString === month;
        });
        console.log(newRecords);
        setFilterRecords(newRecords);
    },[month])

    const handleYearInput = async (event) => {
        event.preventDefault();
        try {
            const year = document.getElementById('year-filter').value;
            setYear(year);
            const data = await getExpendituresByYear(token, year);
            setYearRecords(data);
        }catch(e) {
            alert(e.message);
        }
    }
    // fetch data based on year
    return (
        <div>
            <Grid className="container flex"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
            <Grid item xs className='expenditure-container'>
            <h1>Expenditure Records</h1>
            <form>
                <label for='month-filter'>Filter by month: </label>
                <input type="month" id='month-filter' name='month-filter' onChange={handleInput} />
            </form>
            <ExpenditureListContainer expenditures={filterRecords} handleInput={handleInput} />
            </Grid>
            <Grid marginTop='70px' className='border rounded'>
            <form onSubmit={handleYearInput}>
                    <label for="year-filter">Filter by year for expenditure graph: </label>
                    <input type="number" id="year-filter" min="2000" max={lastestYear}/>
                    <button>Submit</button>
            </form>
            <ExpenditureOverviewContainer yearRecords={yearRecords} year={year}/>
            </Grid>
        </Grid>

        </div>
    )
}

export default Expenditure