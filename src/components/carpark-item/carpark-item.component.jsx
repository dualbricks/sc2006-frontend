

const CarParkItem = ({carpark}) => {
    const { AvailableLots, Development, _id} = carpark;
    return (
        <div className="carpark-container" key={_id}>
            <h2>{Development}</h2>
            <p>{AvailableLots[0].AvailableLots}</p>
        </div>
    )
}

export default CarParkItem