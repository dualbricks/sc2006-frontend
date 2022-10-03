import { createContext, useEffect, useState } from "react";
import {getFCP} from 'web-vitals';
import { fetchAllCarParks } from "../utils/db";

export const CarParkContext = createContext({
    carParkList: [],
    updateTime: ''
})



export const CarParkProvider = ({children})=>{
    const [carParkList, setCarParkList] = useState([])
    const [updateTime, setUpdateTime] = useState('')
    useEffect(()=> {

        const getCarParksList = async () => {
            try {
                const carParkMap = await fetchAllCarParks();
                setCarParkList(carParkMap);
                setUpdateTime(Date());
            }catch(e) {
                console.log(e);
            }
    
        }

        const update = setInterval(async ()=>{
                await getCarParksList()
                setUpdateTime(Date());
                console.log("Updated")
            }, 1000*60)


        getCarParksList();
        return () => clearInterval(update);
    }, [])

    const value = {carParkList, updateTime}

    return (
        <CarParkContext.Provider value={value}>{children}</CarParkContext.Provider>
    )

}

