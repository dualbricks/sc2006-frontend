import axios from 'axios'

export const fetchTrafficImage = async (options)=>{
    try {
        const data = await fetchHelper('/trafficimages', options);
        return data

    }catch(e) {
        console.log(e)
    }
    
    
}


const fetchHelper = async(url, options) => {
    try {
        const {data} = await axios.get(url, options);
        return data;
    }catch(e) {
        return e;
    }
    
}