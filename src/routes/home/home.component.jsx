import {Outlet} from 'react-router-dom'
import  {ResultContainer, SearchBar}  from '../../components';
import { useEffect, useState, useContext } from 'react';
import { CarParkContext } from '../../contexts';
import { fetchCarParksByPostalCode } from '../../utils/db/fetchCarPark';
const Home = () => {
    const [text, setText] = useState('');
    const {carParkList, updateTime} = useContext(CarParkContext)
    const [filteredCarParkList, setfilterCarParkList] = useState([]);
    const [error, setError] = useState('');
    useEffect(()=>{
        const filtering = async ()=>{
            if(text.length === 0) { 
                setfilterCarParkList(carParkList.slice(0,100))
                return;
            }
            if(carParkList.length === 1){
                setfilterCarParkList(carParkList);
                return;
            };
            if(text.length === 6 && text.match("[0-9]+")) {
                try {
                    const newCarParks = await fetchCarParksByPostalCode(text);
                    console.log(newCarParks);
                    if(newCarParks.length === 1) {
                        if(newCarParks[0].error) {
                            throw new Error("No carpark found");
                        }
                    }
                    setfilterCarParkList(newCarParks);
                    setError('');

                }catch(e) {
                    setError(e.message);
                    setfilterCarParkList([]);
                }
            }else {
                const newCarParks = carParkList.filter((carpark)=>carpark.Development.toLocaleLowerCase().includes(text))
                if(newCarParks.length === 0) {
                    setError('No carpark found');
                }else {
                    setError('');
                }
                if(newCarParks.length > 100) {
                    setfilterCarParkList(newCarParks.slice(0,100));
                }else {         
                    setfilterCarParkList(newCarParks);
                }
            }

        }
        filtering();
    }, [carParkList, text])

    return (
        <div>
            <Outlet/>
            <SearchBar text={text} setText={setText}/>
            <h2>Last Updated at {updateTime}</h2>
            <ResultContainer CarparkList={filteredCarParkList}/>
            <p>{error}</p>
        </div>
    )
}

export default Home;