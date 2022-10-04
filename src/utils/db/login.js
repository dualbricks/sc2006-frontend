import axios from 'axios'

export const SignInUserWithEmailAndPassword = async (email, password)=>{

    try {
        const options = {
            email: email,
            password: password
        }
        const {data,status} = await fetchHelper('users/login',options)
        if(status === 400) throw new Error("Invalid Login");
        return data
    }catch(e) {
        throw new Error("Invalid Login");
    }
}


export const fetchHelper = async(url, options) => {
    try {
       return await axios.post(url,  options);
        
    }catch(e) {
        console.log(e);
    }
    
}