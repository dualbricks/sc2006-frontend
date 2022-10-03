import CarParkItem from "../carpark-item/carpark-item.component";

const ResultContainer = ({CarparkList}) => (
    <div className="result-container">
        {CarparkList.map((carpark)=>(
            <CarParkItem carpark={carpark} key={carpark._id} />
        ))}
    </div>
)

export default ResultContainer
