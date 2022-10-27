import axios from 'axios'

export const fetchTrafficImage = async (options)=>{
    try {
        const data = await fetchHelper(`https://api.dualbricks.tech/trafficimages`, options);
        return data

    }catch(e) {
        console.log(e)
    }
    
    
}

export const fetchTrafficImageByLocation = async (location) => {
    console.log(location);
    const url = `https://api.dualbricks.tech/trafficimages/${location.latitude}-${location.longitude}`;
    try {
        const data = await fetchHelper(url);
        return data;
    }catch(e) {
        throw new Error(e.data);
    }
}

export const fetchTrafficImageByPostalCode = async (postalCode)=>{
    try {
        const data = await fetchHelper(`https://api.dualbricks.tech/trafficimages/p/${postalCode}`);
        return data;
    }catch(e) {
        throw new Error(e.data);
    }
}

const fetchHelper = async(url, options) => {
    try {
        const {data} = await axios.get(url, options);
        return data;
    }catch(e) {
        throw new Error(e.data);
    }
    
}