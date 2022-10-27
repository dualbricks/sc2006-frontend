import axios from "axios";

export const favouriteHandler = async (token, options, state) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    if(!state) {
        try {
            const data = await fetchHelper(`https://api.dualbricks.tech/users/me/save`, options);
            return data
        }catch(e) {
            console.log(e)
            throw new Error(e);
        }
    }
    else {
        try {
            const data = await fetchHelper(`https://api.dualbricks.tech/users/me/remove`, options);
            return data
        }catch(e) {
            console.log(e)
            throw new Error(e);
        }
    }

}

const fetchHelper = async(url, options) => {
    try {
        const {data} = await axios.post(url, options);
        return data;
    }catch(e) {
        console.log(e)
        throw new Error(e.response.data);
    }
    
}