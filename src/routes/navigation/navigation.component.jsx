import { Fragment, useContext } from "react"
import {Outlet,Link} from 'react-router-dom'
import './navigation.style.scss'
import { DropdownMenu, NavIcon, UserIcon, FavDropdown } from "../../components"
import { UserContext } from "../../contexts"
import {Box, AppBar, Toolbar, Typography, IconButton,} from '@mui/material'
import TrafficIcon from '@mui/icons-material/Traffic';

const Navigation = () => {
    const {user,isIconOpen, isFavIconOpen, isAuthenticated}  = useContext(UserContext)
    console.log(user);
    return (
        <Fragment>
            <Box sx={{flexGrow:1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="textPrimary" component={Link} to='/' sx={{flexGrow:1, textDecoration:"none", boxShadow:"none"}}>
                            SG ParkWhere
                        </Typography>
                        {<IconButton color="inherit" component={Link} to='/traffic'> <TrafficIcon/> </IconButton>}
                        { isAuthenticated && <NavIcon icon="favorite" text="Favourite"/>}
                        <UserIcon/>
                    </Toolbar>
                </AppBar>
            </Box>
            { isIconOpen && <DropdownMenu/>}
            {isFavIconOpen && <FavDropdown/>}
            <Outlet />
        </Fragment>
    )
}

export default Navigation