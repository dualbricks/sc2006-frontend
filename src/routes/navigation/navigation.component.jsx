import { Fragment, useContext } from "react"
import {Outlet,Link} from 'react-router-dom'
import './navigation.style.scss'
import { DropdownMenu, UserIcon } from "../../components"
import { UserContext } from "../../contexts"
const Navigation = () => {
    const {user,isIconOpen}  = useContext(UserContext)
    console.log(user);
    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to='/'>
                    <p>PlaceHolder</p>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/placeholder'>
                        PlaceHolder
                    </Link>
                </div>
                <UserIcon/>
               { isIconOpen && <DropdownMenu/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation