import axios from "axios";

export const addExpenditure = async (token,expenditure) => {
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    try {
        const {data} = await axios.post(`https://api.dualbricks.tech/e`, expenditure);
        return data;

    }catch(e) {
        throw new  Error(e.response.data);
    }
}

export const getExpenditures = async (token, limit, skip) => {
    axios.defaults.headers.get['Authorization'] = `Bearer ${token}`;

    let url = `https://api.dualbricks.tech/e?limit=${limit}&skip=${skip}&sort=createdAt:desc`;
    try {
        const {data} = await axios.get(url);
        console.log(data);
        return data;

    }catch(e) {
        throw new  Error(e.response.data);
    }
}

export const getExpendituresByYear = async (token, year) => {
    console.log(year)
    axios.defaults.headers.get['Authorization'] = `Bearer ${token}`;
    let url = `https://api.dualbricks.tech/e?year=${year}`;
    try {
        const {data} = await axios.get(url);
        console.log(data);
        return data;

    }catch(e) {
        throw new  Error(e.response.data);
    }
}

// delete expenditure
export const deleteExpenditure = async (token, id) => {
    axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;
    try {
        const {data} = await axios.delete(`https://api.dualbricks.tech/e/${id}`);
        return data;

    }catch(e) {
        throw new  Error(e.response.data);
    }
}

// update expenditure
export const updateExpenditure = async (token, id, expenditure) => {
    axios.defaults.headers.patch['Authorization'] = `Bearer ${token}`;
    try {
        const {data} = await axios.patch(`https://api.dualbricks.tech/e/${id}`, expenditure);
        return data;

    }catch(e) {
        throw new  Error(e.response.data);
    }
}
