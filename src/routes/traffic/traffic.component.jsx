import { LocationButton, SearchBar, TrafficContainer, TrafficListContainer } from "../../components";
import { useEffect, useState } from "react";
import { fetchTrafficImage } from "../../utils/db";
import { fetchTrafficImageByLocation, fetchTrafficImageByPostalCode } from "../../utils/db/fetchTrafficImage";
const Traffic = () => {
    const [trafficImageList, setTrafficImageList] = useState([]);
    const [updateTime, setUpdateTime] = useState(Date());
    const [searchField, setSearchField] = useState('');
    const [filteredTrafficImageList, setFilteredTrafficImageList] = useState([]);
    const [location, setLocation] = useState({});
    useEffect(()=>{
        const getTrafficImages = async () => {
            try{
                let trafficImages = await fetchTrafficImage();
                //safeguard against empty array
                if(trafficImages.length === 0) {
                   trafficImages = await fetchTrafficImage(); 
                }
                setTrafficImageList(trafficImages);
                setFilteredTrafficImageList(trafficImages);
            }catch(e) {
                setTrafficImageList([]);
                setFilteredTrafficImageList([]);
            }
        }
        const update = setInterval(async ()=>{
            await getTrafficImages();
            setUpdateTime(Date());
            console.log("Updated for traffic images")
        }, 1000*60)
        getTrafficImages();
        return () => clearInterval(update);

    },[]);
    useEffect(()=>{
        const filtering  = async () => {
            if(location.latitude && location.longitude) {
                try{
                    const newTrafficImageList = await fetchTrafficImageByLocation(location);
                    setFilteredTrafficImageList(newTrafficImageList);
                    return;
                }catch(e) {
                    alert(e);
                    setFilteredTrafficImageList([]);
                    return
                }
            }
                
            if(searchField.length === 0) {
                setFilteredTrafficImageList(trafficImageList);
                return;
            }

            //filter by postal code
            if(searchField.length === 6 && searchField.match("[0-9]+")) {
                try{
                    const newTrafficImageList = await fetchTrafficImageByPostalCode(searchField);
                    setFilteredTrafficImageList(newTrafficImageList);
                    return;
                }catch(e) {
                    alert("No traffic images found");
                    setFilteredTrafficImageList([]);
                    return;
                }
            }else {
                const filtered = trafficImageList.filter((trafficImage)=>trafficImage.Name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()));
                setFilteredTrafficImageList(filtered);
            }

            
        }
        filtering();
    
    },[searchField, trafficImageList, location])
    
    return (
        <div>
            <div>
                <p>{updateTime}</p>
                 
            </div>
            <div className="container"> 
                <SearchBar text={searchField} setText={setSearchField} setLocation={setLocation}/>
                <LocationButton setlocation={setLocation}/>
            </div>
            <div>
                <TrafficListContainer ImageList={filteredTrafficImageList}/>

            </div>
            
        </div>
   
    )
}

export default Traffic;