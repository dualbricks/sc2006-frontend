import './expenditure-overview-container.style.scss'
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ExpenditureOverviewContainer = ({yearRecords, year}) => {
    let totalCost = 0;
    let monthlyCost = [];


    yearRecords.forEach((record) => {
        const month = parseInt(record.startTime.split('-')[1])-1;
        monthlyCost[month] = monthlyCost[month] ? monthlyCost[month] + record.cost : record.cost;
        totalCost += record.cost; 
    })



    const data = [
        { x: new Date(year, 0), y: monthlyCost[0] },
        { x: new Date(year, 1), y: monthlyCost[1] },
        { x: new Date(year, 2), y: monthlyCost[2] },
        { x: new Date(year, 3), y: monthlyCost[3] },
        { x: new Date(year, 4), y: monthlyCost[4] },
        { x: new Date(year, 5), y: monthlyCost[5] },
        { x: new Date(year, 6), y: monthlyCost[6] },
        { x: new Date(year, 7), y: monthlyCost[7] },
        { x: new Date(year, 8), y: monthlyCost[8] },
        { x: new Date(year, 9), y: monthlyCost[9] },
        { x: new Date(year, 10), y: monthlyCost[10] },
        { x: new Date(year, 11), y: monthlyCost[11] },
    ]

    const options = {
        animationEnabled: true,
        title:{
            text: `Monthly Expenditure (${year})`
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "Amount ($)",
            prefix: "$"
        },
        data: [{
            yValueFormatString: "$#,##0.00",
            xValueFormatString: "MMMM",
            type: "spline",
            color: "#5585b5",
            dataPoints: data
        }]
    }
    
    return(
        <div class="overview-container">          
            <h1>Expenditure Overview</h1>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />  
            <section className='statistics'>
                <p>Total expenditure: ${totalCost.toFixed(2)}</p>
                <p>Average expenditure: ${(totalCost/yearRecords.length).toFixed(2)}</p>
            </section>
        </div>
    )
}

export default ExpenditureOverviewContainer