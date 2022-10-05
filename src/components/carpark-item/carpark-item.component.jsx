

const CarParkItem = ({carpark}) => {
    if(carpark.error) return (
        <div className="carpark-container" key={carpark._id}>
            <h2>{carpark.error}</h2>
     
        </div>
    )
    const { AvailableLots, Development, _id} = carpark;
    return (
        <div className="carpark-container" key={_id}>
            <h2>{Development}</h2>
            <p>{AvailableLots[0].AvailableLots}</p>
        </div>
    )
}

export default CarParkItem