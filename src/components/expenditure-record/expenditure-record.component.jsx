
// takes each input item ExpenditureRecord w props {recordId, start, end, carpark, cost}
// from ExpenditureRecordList (ERL) (array)
// ^ is created by cost-calculator component?
// do i need a new context? expenditures.context?


// add var recordId?? or how to derive unique id?
const ExpenditureRecord = (props) => {
    if (props.recordId === null){
        return <p>No expenditure records available</p>
    }
    return (<div>
                <h1>This is an ExpenditureRecord</h1>
                <p>Record ID: {props.recordId}</p>
                <p>Start: {props.start}</p>
                <p>End: {props.end}</p>
                <p>Cost: ${props.cost.toFixed(2)}</p>
            </div>)
}

ExpenditureRecord.defaultProps = {
    recordId: null,
    start: 0,
    end: 0,
    cost: 0,
}

export default ExpenditureRecord