import './dropdown-menu.style.scss'
import { Menu, SignInForm, SignUpForm, CostCalculator } from '..'
import { useContext,useState } from 'react'
import { UserContext } from '../../contexts'
import { Container } from 'react-bootstrap'
import { Box } from '@mui/material'
const textList = ['Click here to sign Up', 'Already have an account? click here']

const DropdownMenu = () => {
    const {isAuthenticated} = useContext(UserContext);
    const [signUpField, setSignUpField] = useState(false);
    const [text, setText] = useState(textList[0])
    const [iscalculator, setCalculator] = useState(false);
    const onSubmit = () => {
        setSignUpField(!signUpField);
        if(!signUpField) setText(textList[1]);
        else setText(textList[0]);
    } 

    const calculatorToggler = () => {
        setCalculator(!iscalculator);
    }
    
    return (
        <>
            <Container className='container dropdown-menu dropdown-container border border-dark align-center rounded' >
            <div>
             {isAuthenticated ? (<Menu toggler={calculatorToggler}/>) : (signUpField ? <SignUpForm/>: (<SignInForm/>))}
             {!isAuthenticated && <Box textAlign='center'><p className='text-btm align-center'onClick={onSubmit}>{text}</p></Box> }
            </div>
            </Container>
            {iscalculator && <CostCalculator isOpen={iscalculator} closeHandler={calculatorToggler}/>}
        </>
    )
}

export default DropdownMenu;