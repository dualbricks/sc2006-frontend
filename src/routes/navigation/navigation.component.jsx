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
                    <p>Home</p>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/traffic'>
                        Traffic Image
                    </Link>
                    <Link className="nav-link" to='/expenditure'>
                        expenditure
                    </Link>
                    <Link className="nav-link" to='/settings'>
                        settings
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