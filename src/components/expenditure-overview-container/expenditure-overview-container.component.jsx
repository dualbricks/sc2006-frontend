import './expenditure-overview-container.style.scss'
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ExpenditureOverviewContainer = (costObj) => {
    // Calculate statistics - total and average (yet to filter by month)
    const costArray = Object.values(costObj)

    let total =0
    for (let i = 0; i<costArray.length; i++){
        total += Number(costArray[i].y)
    }

    // Graph 
    const monthlyCost = []
    for (let i = 0; i<12; i++){
            monthlyCost[i] = 0
    }
    for (let j = 0; j<costArray.length; j++){
        let month = costArray[j].x
        monthlyCost[month] += Number(costArray[j].y);
    }
    const data = [
        { x: new Date(2022, 0), y: monthlyCost[0] },
        { x: new Date(2022, 1), y: monthlyCost[1] },
        { x: new Date(2022, 2), y: monthlyCost[2] },
        { x: new Date(2022, 3), y: monthlyCost[3] },
        { x: new Date(2022, 4), y: monthlyCost[4] },
        { x: new Date(2022, 5), y: monthlyCost[5] },
        { x: new Date(2022, 6), y: monthlyCost[6] },
        { x: new Date(2022, 7), y: monthlyCost[7] },
        { x: new Date(2022, 8), y: monthlyCost[8] },
        { x: new Date(2022, 9), y: monthlyCost[9] },
    ]
    const options = {
        animationEnabled: true,
        title:{
            text: "Monthly Expenditure (2022)"
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
                <p>Total expenditure: ${total.toFixed(2)}</p>
                <p>Average expenditure: ${(total/costArray.length).toFixed(2)}</p>
            </section>
        </div>
    )
}

export default ExpenditureOverviewContainer