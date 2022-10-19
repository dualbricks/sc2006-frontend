import FormInput from '../form-input/form-input.component'

const SearchBar = ({text, setText, setLocation, ...otherStuff}) => {
    const handleChange = (e) => {
        setText(e.target.value);
        setLocation({});
    }
    return (
        <FormInput onChange={handleChange} name='enter address/postal code' value={text} />
    )
    
}


export default SearchBar