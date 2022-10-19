import {ExpenditureOverviewContainer, ExpenditureRecord} from '../../components'
import { useState } from 'react';
import './expenditure.style.scss'

// generate data array 
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function getRndDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const array =[];
var entry ={};
for (let i =1; i<=30; i++){
    entry = {
        recordId: i,
        carparkId: getRndInteger(1,2000),
        date: getRndDate(new Date(2022, 0, 1), new Date()),
        start: getRndInteger(0,23),
        end: getRndInteger(0,23),
        cost: (getRndInteger(0,23) + Math.random()).toFixed(2),
    }
    array.push(entry)
}
const monthCostArray = array.map(({date, cost}) => ({x: date.getMonth(), y: cost}))

const Expenditure = () => {

    // form handling
    const [month, setMonth] = useState('');
    let monthValue = Number(month.slice(5))
    function handleInput (event) {
        setMonth(month => event.target.value)
        // console.log("handling...")    
    }
    // console.log("month is "+monthValue)
    let toRenderArray = array;
    if (monthValue){
        toRenderArray = array.filter(allObjs => allObjs.date.getMonth() === monthValue-1);
    }

    return (
        <div className="container">
            <section className='overview-container'>            
                <ExpenditureOverviewContainer {...monthCostArray}/>
            </section>
            <section className="records">
                <h1>Expenditure Records</h1>
                <form>
                    <label for="month-filter">Filter by month: </label>
                    <input type="month" id="month-filter" max={"2022-10"} onInput={handleInput}/>
                </form>
                {toRenderArray.map(object => <ExpenditureRecord {...object} />)}                
                </section>

        </div>
    )
}

export default Expenditure