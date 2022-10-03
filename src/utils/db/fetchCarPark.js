import axios from 'axios'

export const fetchAllCarParks = async ()=>{
    try {
        const data = await fetchHelper('carparks');
        return data

    }catch(e) {
        console.log(e)
    }
    
    
}


export const fetchHelper = async(url, options) => {
    try {
        const {data} = await axios.get(url);
        return data
    }catch(e) {
        console.log(e);
    }
    
}