'./fav-dropdown.style.scss'
import { Paper } from "@mui/material"
import { Container } from "@mui/system"
import { useContext } from "react"
import { UserContext, CarParkContext } from "../../contexts"
import {CarParkItem} from '../index.js'

const FavDropdown = () => {

    const {user} = useContext(UserContext);
    const {carParkList} = useContext(CarParkContext);
    console.log(user)
    const favList = carParkList.filter((carpark) => user.savedList.includes(carpark.CarParkID));
    return (
        <Container className="fav-dropdown dropdown-container border dropdown-menu">
            <Container className="fav-items">
                {favList.map((carpark) => (<Paper><CarParkItem key={carpark.CarParkID} carpark={carpark}/></Paper>))}
            </Container>
            
        </Container>
    )
}


export default FavDropdown;