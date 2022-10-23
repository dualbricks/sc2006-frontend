
import react, {useEffect, useState} from 'react'
import { fetchAvailabilityByOptions } from '../../utils/db/fetchAvailabilityLog';
import PopupComponent from '../PopupDialog/PopupComponent';
import './carpark-item.style.scss';
import { timeConverterForPrediction } from '../../utils/timeConverter';
import { CostCalculator, CarparkCard} from "../index"


const CarParkItem = ({carpark}) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [predicted, setPredicted] = useState({});
    const [heavy, setHeavy] = useState(0);
    const [normal, setNormal] = useState(0);
    const [motorcycle, setMotorcycle] = useState(0);
    const { AvailableLots, Development, _id, CarParkID} = carpark;
    const [isOpenInner, setIsOpenInner] = useState(false);
    // first render 
    useEffect(()=>{
        try{
            setAvailability();

        }catch(e) {
            alert("Not able to fetch availability");
        }
        
    },[]);
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

    const innerToggler = () => {
        setIsOpenInner(!isOpenInner);
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
    
    return (
        <div className="" key={_id}>
            <CarparkCard Development={Development} normal={normal} heavy={heavy} motorcyle={motorcycle} onClick={togglePopup}/>
            {isOpen&& <PopupComponent className = "desc" carpark={carpark} isOpen={isOpen} innerToggler={innerToggler} closeHander ={togglePopup} predicted={predicted} normal={normal} heavy={heavy} motorcycle={motorcycle} />}
            {isOpenInner && <CostCalculator isOpen={isOpenInner} closeHandler={innerToggler} carParkID={CarParkID}/>}
        </div>    
    )
}

export default CarParkItem