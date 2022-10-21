import axios from "axios";

export const favouriteHandler = async (token, options, state) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    if(state) {
        try {
            const data = await fetchHelper('/users/me/save', options);
            return data
        }catch(e) {
            alert(e);
        }
    }
    else {
        try {
            const data = await fetchHelper('/users/me/remove', options);
            return data
        }catch(e) {
            alert(e);
        }
    }

}

const fetchHelper = async(url, options) => {
    try {
        const {data} = await axios.post(url, options);
        return data;
    }catch(e) {
        return e.data;
    }
    
}