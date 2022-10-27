import CarParkItem from "../carpark-item/carpark-item.component";
import './result-container.style.scss'
const ResultContainer = ({CarparkList}) => (
    <div className="result-container">
        {Array.isArray(CarparkList) ? CarparkList.map((carpark)=>(
            <CarParkItem className='rounded' carpark={carpark} key={carpark._id} />
        )): <div className='no-result'>No Result</div>}
    </div>
)

export default ResultContainer
