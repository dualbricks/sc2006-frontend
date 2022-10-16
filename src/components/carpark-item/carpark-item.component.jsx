
import react, {useState} from 'react'
import PopupComponent from '../PopupDialog/PopupComponent';
import './carpark-item.style.scss';


const CarParkItem = ({carpark}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const togglePopup = () =>{
        setIsOpen(!isOpen);
    }

    if(carpark.error) return (
        <div className="carpark-container" key={carpark._id}>
            <h2>{carpark.error}</h2>
     
        </div>
    )
    const { AvailableLots, Development, LotType, Agency, Area, _id} = carpark;

    //renders type C
    const renderNormal = () => {
        try{
            if(AvailableLots[0].AvailableLots > 0){
                return AvailableLots[0].AvailableLots;
            }else{
                return 0;
            }
        }catch{
            return 0;
        }
    }

    //renders type H
    const renderHeavy = () => {
        try{
            if(AvailableLots[1].AvailableLots > 0){
                return AvailableLots[1].AvailableLots;
            }else{
                return 0;
            }
        }catch{
            return 0;
        }
    }
    //Renders Type Y
    const renderMotorcycle = () => {
        try{
            if(AvailableLots[2].AvailableLots > 0){
                return AvailableLots[2].AvailableLots;
            }else{
                return 0;
            }
        }catch{
            return 0;
        }
    }
    //render Area
    const renderArea = () => {
        try{
            if(Area != ""){
                return Area;
            }else{
                return "";
            }
        }catch{
            return "";
        }
    }

    return (
        <div className="carpark-container" key={_id}>
            <main>
                <h2>Location: {Development}</h2>
                <p>Available Lots: {AvailableLots[0].AvailableLots}</p>
                <button className= "more-info" onClick={togglePopup}>More Info</button>
            </main>
            {isOpen&& <PopupComponent className = "desc" handleClose ={togglePopup} children = {
                        <div>
                            <h3>Area: {renderArea()}</h3>
                            <h3>Development: {Development}</h3>
                            <h3>Available Normal Lots: {renderNormal()}</h3>
                            <h3>Available Heavy Vehicle Lots: {renderHeavy()}</h3>
                            <h3>Available Motorcycle Lots: {renderMotorcycle()}</h3>
                            <p>ID: {_id}</p>
                            <p>Lot Type: {LotType}</p>
                            <p>Agency: {Agency}</p>
                            <button className="favourite-btn">Favourite</button>
                            <h3 classsName="prediction">Predicted Lots for next 30mins: </h3>
                        </div>
                    }/>}
        </div>
        
    )
}

export default CarParkItem