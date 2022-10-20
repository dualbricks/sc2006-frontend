import axios from 'axios'

export const UpdatePassword = async (options, token)=>{
    axios.defaults.headers.patch['Authorization'] = `Bearer ${token}`;
    try {
        const data = await fetchHelper('/users/me/password', options);
        return data

    }catch(e) {
        console.log(e)
    }
    
    
}


const fetchHelper = async(url, options) => {
    try {
        const {data, status} = await axios.patch(url, options);
        if(status === 400) throw new Error('Invalid Password');
        return data;
    }catch(e) {
        return e.data;
    }
    
}