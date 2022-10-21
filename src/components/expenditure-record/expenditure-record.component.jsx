import './expenditure-record.style.scss'

const ExpenditureRecord = ({record}) => {
    const {carParkID, startTime, endTime, cost,createdAt } = record;
   
    return (
        <div className="expenditure-record">
            <p>Carpark ID: {carParkID}</p>
            <p>Date: {new Date(createdAt).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
            <p>Start Time: {new Date(startTime).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
            <p>End Time: {new Date(endTime).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
            <p>Cost: ${cost}</p>
        </div>)
}

export default ExpenditureRecord