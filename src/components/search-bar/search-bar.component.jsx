
import SearchIcon from '@mui/icons-material/Search';
import { Input, InputAdornment } from '@mui/material';
const SearchBar = ({text, setText, setLocation, ...otherStuff}) => {
    const handleChange = (e) => {
        setText(e.target.value);
        setLocation({});
    }
    return (
        <Input fullWidth placeholder='Search' value={text} onChange={handleChange} endAdornment={<InputAdornment position='end'>
            <SearchIcon/>
        </InputAdornment>} {...otherStuff}/>
        
    )
    
}


export default SearchBar