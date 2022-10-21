import {ExpenditureOverviewContainer, ExpenditureRecord} from '../../components'
import { useContext, useEffect, useState } from 'react';
import './expenditure.style.scss'
import { UserContext } from '../../contexts';
import { getExpenditures, getExpendituresByYear } from '../../utils/db/expenditureTracker';
import { Button } from 'bootstrap';
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

    },[])
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
    console.log(yearRecords);
    return (
        <div className="container">
            <section className='overview-container'>
                <form onSubmit={handleYearInput}>
                    <label for="year-filter">Filter by year for expenditure graph: </label>
                    <input type="number" id="year-filter" min="2000" max={lastestYear}/>
                    <button>Submit</button>
                </form>
                <ExpenditureOverviewContainer yearRecords={yearRecords} year={year}/>          
            </section>
            <section className="records">
                <h1>Expenditure Records</h1>
                <form>
                    <label for="month-filter">Filter by month: </label>
                    <input type="month" id="month-filter" max={lastestMonth} onInput={handleInput}/>
                </form>
                {filterRecords.map(record => <ExpenditureRecord record={record} key={record._id} />)}                
            </section>
        </div>
    )
}

export default Expenditure