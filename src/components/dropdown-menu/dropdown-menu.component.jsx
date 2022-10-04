import './dropdown-menu.style.scss'
import { Button, Menu, SignInForm, SignUpForm } from '..'
import { useContext,useState } from 'react'
import { UserContext } from '../../contexts'
const textList = ['Click here to sign Up', 'Already have an account? click here']

const DropdownMenu = () => {
    const {isAuthenticated} = useContext(UserContext);
    const [signUpField, setSignUpField] = useState(false);
    const [text, setText] = useState(textList[0])

    const onSubmit = () => {
        setSignUpField(!signUpField);
        if(!signUpField) setText(textList[1]);
        else setText(textList[0]);
    } 
    
    return (
        <div className='dropdown-container'>
            {isAuthenticated ? (<Menu/>) : (signUpField ? <SignUpForm/>: (<SignInForm/>))}
            {!isAuthenticated && <h2 className='text-btm'onClick={onSubmit}>{text}</h2> }
            
        </div>
    )
}

export default DropdownMenu;