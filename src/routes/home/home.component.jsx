import {Outlet} from 'react-router-dom'
import  {ResultContainer, SearchBar}  from '../../components';
import { useEffect, useState, useContext } from 'react';
import { CarParkContext } from '../../contexts';
const Home = () => {
    const [text, setText] = useState('');
    const {carParkList, updateTime} = useContext(CarParkContext)
    const [filteredCarParkList, setfilterCarParkList] = useState([]);

    useEffect(()=>{
        console.log(carParkList);
        if(carParkList.length === 1){
            setfilterCarParkList(carParkList);
            return;
        };
        const newCarParks = carParkList.filter((carpark)=>carpark.Development.toLocaleLowerCase().includes(text))
        setfilterCarParkList(newCarParks);
    }, [carParkList, text])

    return (
        <div>
            <Outlet/>
            <SearchBar text={text} setText={setText}/>
            <h2>Last Updated at {updateTime}</h2>
            <ResultContainer CarparkList={filteredCarParkList}/>
        </div>
    )
}

export default Home;