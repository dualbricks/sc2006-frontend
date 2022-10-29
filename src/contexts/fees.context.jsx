import { createContext,useState } from "react";
import { useEffect } from "react";
import data from "../assets/parking.json";
export const FeesContext = createContext({
    feesList: [],
    setFeesList: ()=>{}
 
})

export const FeesProvider = ({children})=>{

    
    const [feesList, setFeesList] = useState([]);

    useEffect(()=> {
        
        console.log(data)
        setFeesList(data);
    },[])

    const value = {feesList, setFeesList}
   

    return (
        <FeesContext.Provider value={value}>{children}</FeesContext.Provider>
    )

}

