import CanvasJSReact from '../../assets/canvasjs.react';
    // var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    console.log("herehere")
const canvasjs = () => {
    console.log("herehere2")

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
            text: "Monthly Sales - 2017"
        },
        axisX: {
            valueFormatString: "MMM"
        },
        axisY: {
            title: "Sales (in USD)",
            prefix: "$"
        },
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: data
        }]
    }
    return (
        <div>
            <CanvasJSChart options = {options}
                /* onRef = {ref => this.chart = ref} */
            />
            {console.log("returning canvasjs")}
        </div>
    );
}
    
export default canvasjs;