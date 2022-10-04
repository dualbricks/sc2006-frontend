import { useState, useContext } from "react"
import { SignInUserWithEmailAndPassword } from "../../utils/db";
import {FormInput, Button} from '../index'
import { UserContext } from "../../contexts";

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
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput  label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput  label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <p className="error">{errorMessage}</p>
                <Button>Sign In</Button>
            </form>
        </div>
    )
}

export default SignInForm;