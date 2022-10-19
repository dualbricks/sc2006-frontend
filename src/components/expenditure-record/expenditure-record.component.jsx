import './expenditure-record.style.scss'

const ExpenditureRecord = (props) => {
    return (<div className="expenditure-record">
                <p className="identifier">Record ID: {props.recordId}</p>
                <p>Carpark ID: {props.carparkId}</p>
                <p>Date: {props.date.toDateString()}</p>
                <p>Start Time: {props.start}</p>
                <p>End Time: {props.end}</p>
                <p>Cost: ${props.cost}</p>
            </div>)
}

export default ExpenditureRecord