import FormInput from '../form-input/form-input.component'

const SearchBar = ({text, setText}) => {
    const handleChange = (e) => {
        setText(e.target.value);
    }
    return (
        <FormInput onChange={handleChange} name='enter address/postal code' value={text} />
    )
    
}


export default SearchBar