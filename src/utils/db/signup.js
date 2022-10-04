import axios from 'axios'

export const SignUpUserWithEmailAndPassword = async (email, password)=>{

    try {
        const options = {
            email: email,
            password: password
        }
        const {data,status} = await fetchHelper('users',options)
        if(status === 400) throw new Error("Invalid Sign up");
        return data
    }catch(e) {
        throw new Error("Invalid Sign up");
    }
}

 const fetchHelper = async(url, options) => {
    try {
       return await axios.post(url,  options);
        
    }catch(e) {
        console.log(e);
    }
    
}