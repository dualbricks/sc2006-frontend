import axios from 'axios'

export const LogOutUser = async (token) => {

    try {
        const options = {
            token: token
        }
        const {data,status} = await fetchHelper('users/logout',options)
        if(status === 400) throw new Error("Invalid Logout");
        return data
    }catch(e) {
        throw new Error("Invalid Logout");
    }
}


export const fetchHelper = async(url, options) => {
    try {
       return await axios.post(url,  options);
        
    }catch(e) {
        console.log(e);
    }
    
}