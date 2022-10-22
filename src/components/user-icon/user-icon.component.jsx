import { useContext } from "react"
import { UserContext } from "../../contexts"
import UserIconImage from '../../assets/man.png'
import './user-icon.style.scss'
import { AccountCircle } from "@mui/icons-material"
const UserIcon = () => {
    const {isIconOpen,setIsIconOpen} = useContext(UserContext);

    const iconToggler = () => setIsIconOpen(!isIconOpen);

    return(
        <div className='cart-icon-container' onClick={iconToggler}>
            <AccountCircle className="user-icon"/>
        </div>
    )
    
}

export default UserIcon