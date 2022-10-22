import './dropdown-menu.style.scss'
import { Menu, SignInForm, SignUpForm } from '..'
import { useContext,useState } from 'react'
import { UserContext } from '../../contexts'
import { Container } from 'react-bootstrap'
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

        <Container className='container dropdown-menu dropdown-container border border-dark align-center rounded' >
            <div >
             {isAuthenticated ? (<Menu/>) : (signUpField ? <SignUpForm/>: (<SignInForm/>))}
             {!isAuthenticated && <p className='text-btm'onClick={onSubmit}>{text}</p> }
            </div>
        </Container>
           
    )
}

export default DropdownMenu;