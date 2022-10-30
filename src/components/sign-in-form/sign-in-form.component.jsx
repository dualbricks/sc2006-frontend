import { useState, useContext } from "react"
import { SignInUserWithEmailAndPassword } from "../../utils/db";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { UserContext } from "../../contexts";
import { Box, Container, TextField } from "@mui/material";
import './sign-in-form.style.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

//Sign form 
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMessage, setErrorMessage] = useState('');
    const {email, password} = formFields;
    const {setUser, setToken, setIsAuthenticated} = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    // authetication from backend
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setErrorMessage('');
        e.currentTarget.disabled = true;
        try {
            console.log(email, password);
            const data =  await SignInUserWithEmailAndPassword(email, password);
            setUser(data.user);
            setToken(data.token);
            setIsAuthenticated(true);
            resetFormFields();
        }catch(err) {
            console.log(err);
            setErrorMessage(err.toString());
            e.currentTarget.disabled = false;
        }
    }
    // updating value in inputField
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]:value});
    }
    // main display
    return (
        <>
            <Box textAlign="center">
            <div>
            <span>Already have an account?</span>
            <span> Sign in with your email and password</span>
            </div>


            <form id="Signin" onSubmit={handleSubmit}>
                <TextField  label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <TextField  label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <p className="error">{errorMessage}</p>
                <Box textAlign="center">
                    <Button startIcon={<LoginIcon/> } form="Signin" type="submit" variant='contained'>Sign In</Button>
                </Box>
                
            </form>

            </Box>

        </>
       
        
    )
}

export default SignInForm;