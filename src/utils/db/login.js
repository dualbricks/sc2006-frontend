import axios from 'axios'

export const SignInUserWithEmailAndPassword = async (email, password)=>{
    axios.defaults.headers.post['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

    try {
        const options = {
            email: email,
            password: password
        }
        const {data,status} = await fetchHelper(`https://api.dualbricks.tech/users/login`,options)
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