import axios from 'axios'

export const fetchAllCarParks = async ()=>{
    try {
        const data = await fetchHelper('carparks');
        return data

    }catch(e) {
        console.log(e)
    }
    
    
}

export const fetchCarParksByPostalCode = async (postalCode)=>{
    try {
        const data = await fetchHelper(`carparks/postalcode/${postalCode}`);
        return data
    }catch(e) {
        throw new Error(e);
    }
}


export const fetchHelper = async(url, options) => {
    try {
        const {data, status} = await axios.get(url);
        console.log(status);
        return data;
    }catch(e) {
        return [{error:e.code,_id: 1}];
    }
    
}