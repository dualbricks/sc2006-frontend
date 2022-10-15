import './expenditure-record.style.scss'

const ExpenditureRecord = (props) => {
    if (props.recordId === null){
        return <p>No expenditure records available</p>
    }
    return (<div className="expenditure-record">
                <p className="identifier">Record ID: {props.recordId}</p>
                <p>Carpark ID: {props.carparkId}</p>
                <p>Start: {props.start}</p>
                <p>End: {props.end}</p>
                <p>Cost: ${props.cost.toFixed(2)}</p>
            </div>)
}

ExpenditureRecord.defaultProps = {
    recordId: null,
    carparkId: null,
    start: 0,
    end: 0,
    cost: 0,
}

export default ExpenditureRecord