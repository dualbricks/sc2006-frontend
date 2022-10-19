import axios from 'axios'
import { UserContext } from '../../contexts';

export const LogOutUser = async (token) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    try {
        const {data,status} = await fetchHelper('users/logout')
        if(status === 400) throw new Error("Invalid Logout");
        return data;
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