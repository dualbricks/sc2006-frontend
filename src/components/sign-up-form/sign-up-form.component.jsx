import { useState, useContext } from "react"
import { SignUpUserWithEmailAndPassword } from "../../utils/db";
import {FormInput, Button} from '../index'
import { UserContext } from "../../contexts";

const defaultFormFields = {
    email: '',
    password: '',
    confirmPassword: ''
}

//Sign up form 
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMessage, setErrorMessage] = useState('');
    const {email, password, confirmPassword} = formFields;
    const {setUser, setToken, setIsAuthenticated} = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    // authetication from backend
    const handleSubmit = async (e)=> {
        e.preventDefault();
        setErrorMessage('');
        console.log(password, confirmPassword)
        if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }
        e.currentTarget.disabled = true;
        try {
            console.log(email, password);
            const data =  await SignUpUserWithEmailAndPassword(email, password);
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
        <div className="sign-in-container">
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput  label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput  label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput  label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <p className="error">{errorMessage}</p>
                <Button>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;