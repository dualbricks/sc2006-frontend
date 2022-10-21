import axios from "axios";

export const addExpenditure = async (token,expenditure) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    try {
        const {data} = await axios.post('/e', expenditure);
        return data;

    }catch(e) {
        throw new  Error(e.response.data);
    }
}
