const ExpenditureOverviewContainer = (costObj) => {
    // somehow filter by month?
    // and make stats??
    const costArray = Object.values(costObj)
    let total =0
    for (let i = 0; i<costArray.length; i++){
        total += Number(costArray[i])
    }
    return(
        <div>
            <h1>Expenditure Overview Container</h1>
            <p>Total expenditure: ${total}</p>
            <p>Average expenditure: ${(total/costArray.length).toFixed(2)}</p>
        </div>
    )
}

export default ExpenditureOverviewContainer