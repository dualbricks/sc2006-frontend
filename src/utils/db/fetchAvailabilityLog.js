import axios from 'axios'

export const fetchAvailabilityByOptions = async (options)=>{
    try {
        console.log(options);
        const data = await fetchHelper('log', options);
        return data

    }catch(e) {
        console.log(e)
    }
    
    
}


const fetchHelper = async(url, options) => {
    try {
        const {data, status} = await axios.post(url, options);
        console.log(status);
        return data;
    }catch(e) {
        return [{error:e.code,_id: 1}];
    }
    
}