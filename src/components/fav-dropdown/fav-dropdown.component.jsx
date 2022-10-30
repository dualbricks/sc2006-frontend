import './fav-dropdown.style.scss'
import { Container } from "@mui/system"
import { useContext, useEffect, useState } from "react"
import { UserContext, CarParkContext } from "../../contexts"
import {CarParkItem} from '../index.js'

const FavDropdown = () => {    

    const {user} = useContext(UserContext);
    const {carParkList} = useContext(CarParkContext);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 650);
    const updateMedia = () => { 
        setIsDesktop(window.innerWidth > 650);
    }


    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const favList = carParkList.filter((carpark) => user.savedList.includes(carpark.CarParkID));
    return (
        <>
        {isDesktop ? (<Container className="fav-dropdown dropdown-container border dropdown-menu" maxWidth="md">
        {       favList.map((carpark) => (<CarParkItem className="border"key={carpark.CarParkID} carpark={carpark}/>))}
        </Container>):(<Container className="fav-dropdown dropdown-container border dropdown-menu" maxWidth="xs">
        {       favList.map((carpark) => (<CarParkItem className="border"key={carpark.CarParkID} carpark={carpark}/>))}
        </Container>)}
        </>

        
    )
}


export default FavDropdown;