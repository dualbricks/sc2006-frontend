import { useContext } from "react"
import { UserContext } from "../../contexts"
import UserIconImage from '../../assets/man.png'
import './user-icon.style.scss'
const UserIcon = () => {
    const {isIconOpen,setIsIconOpen} = useContext(UserContext);

    const iconToggler = () => setIsIconOpen(!isIconOpen);

    return(
        <div className='cart-icon-container' onClick={iconToggler}>
        <img className='user-icon' src={UserIconImage} alt="User-Icon" />;
    </div>
    )
    
}

export default UserIcon