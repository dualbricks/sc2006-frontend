
import react, {useEffect, useState} from 'react'
import { fetchAvailabilityByOptions } from '../../utils/db/fetchAvailabilityLog';
import PopupComponent from '../PopupDialog/PopupComponent';
import './carpark-item.style.scss';
import { timeConverterForPrediction } from '../../utils/timeConverter';

const CarParkItem = ({carpark}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [predicted, setPredicted] = useState({});
    const [heavy, setHeavy] = useState(0);
    const [normal, setNormal] = useState(0);
    const [motorcycle, setMotorcycle] = useState(0);
    const { AvailableLots, Development, LotType, Agency, Area, _id, CarParkID} = carpark;
    // first render 
    useEffect(()=>{
        setAvailability();
    });
    //getting predicted and carpark data 
    const getPredicted = async () => {
            const {minute, hour, day} = timeConverterForPrediction();
            const options = {
                minute,
                hour,
                id:CarParkID
            }
            try {
                const data = await fetchAvailabilityByOptions(options);
                setPredicted(data);
            }catch(e) {
                console.log(e)
            }
    }

    const togglePopup = () =>{
        setIsOpen(!isOpen);
        setAvailability();
        getPredicted();
    }

    if(carpark.error) return (
        <div className="carpark-container" key={carpark._id}>
            <h2>{carpark.error}</h2>
     
        </div>
    )

    // setting availability for each type of carpark 
    const setAvailability = () => {
        setHeavy(0);
        setNormal(0);
        setMotorcycle(0);
        AvailableLots.forEach((lot) => {
            if(lot.lotType === "C") {
                setNormal(lot.AvailableLots);
            }
            if(lot.lotType === "H") {
                setHeavy(lot.AvailableLots);
            }
            if(lot.lotType === "Y") {
                setMotorcycle(lot.AvailableLots);
            }
        })
    }

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
                <p>Available Lots: {normal}</p>
                <button className= "more-info" onClick={togglePopup}>More Info</button>
            </main>
            {isOpen&& <PopupComponent className = "desc" handleClose ={togglePopup} children = {
                        <div>
                            <h3>Area: {Area}</h3>
                            <h3>Development: {Development}</h3>
                            <h3>Available Normal Lots: {normal}</h3>
                            <h3>Available Heavy Vehicle Lots: {heavy}</h3>
                            <h3>Available Motorcycle Lots: {motorcycle}</h3>
                            <p>Agency: {Agency}</p>
                            <button className="favourite-btn">Favourite</button>
                            <h3 className="prediction">Predicted Lots for next 30mins: {predicted.Y},{predicted.H},{predicted.C} </h3>
                        </div>
                    }/>}
        </div>
        
    )
}

export default CarParkItem