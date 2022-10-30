import IconButton from '@mui/material/IconButton';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import { common } from '@mui/material/colors';
const NavIcon = () => {
    const {isFavIconOpen, setIsFavIconOpen} = useContext(UserContext);
    const iconToggler = () => setIsFavIconOpen(!isFavIconOpen);
    return (
        <IconButton size="large" onClick={iconToggler}>
            <FavoriteSharpIcon />
        </IconButton>
    )
}


export default NavIcon