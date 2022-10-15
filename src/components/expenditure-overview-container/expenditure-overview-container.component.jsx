import './expenditure-overview-container.style.scss'
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ExpenditureOverviewContainer = (costObj) => {
    const costArray = Object.values(costObj)
    let total =0
    for (let i = 0; i<costArray.length; i++){
        total += Number(costArray[i])
    }

    // placeholder data, replace y values with total monthly
    // idk how to do more than 1y
    const data = [
        { x: new Date(2017, 0), y: 25060 },
        { x: new Date(2017, 1), y: 27980 },
        { x: new Date(2017, 2), y: 42800 },
        { x: new Date(2017, 3), y: 32400 },
        { x: new Date(2017, 4), y: 35260 },
        { x: new Date(2017, 5), y: 33900 },
        { x: new Date(2017, 6), y: 40000 },
        { x: new Date(2017, 7), y: 52500 },
        { x: new Date(2017, 8), y: 32300 },
        { x: new Date(2017, 9), y: 42000 },
        { x: new Date(2017, 10), y: 37160 },
        { x: new Date(2017, 11), y: 38400 }
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
            yValueFormatString: "$#,###.00",
            xValueFormatString: "MMMM",
            type: "spline",
            color: "pink",
            dataPoints: data
        }]
    }
    

    return(
        <div class="overview-container">          
            <h1>Expenditure Overview Container</h1>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />  
            <section className='statistics'>
                <p>Total expenditure: ${total}</p>
                <p>Average expenditure: ${(total/costArray.length).toFixed(2)}</p>
            </section>
        </div>
    )
}

export default ExpenditureOverviewContainer