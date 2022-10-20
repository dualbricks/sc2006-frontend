import { TrafficContainer } from "../../components";
import { useEffect, useState } from "react";
import { fetchTrafficImage } from "../../utils/db";
const Traffic = () => {
    const [trafficImageList, setTrafficImageList] = useState([]);
    const [updateTime, setUpdateTime] = useState('');

    useEffect(()=>{
        const getTrafficImages = async () => {
            try{
                let trafficImages = await fetchTrafficImage();
                //safeguard against empty array
                if(trafficImages.length === 0) {
                   trafficImages = await fetchTrafficImage(); 
                }
                setTrafficImageList(trafficImages);
            }catch(e) {
                setTrafficImageList([]);
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
    
    return (
        <div>
            <p>{updateTime}</p>
            {trafficImageList.map((image)=>(
                <TrafficContainer className='rounded' trafficImage={image} key={image.CameraID} />
            ))}

        </div>
   
    )
}

export default Traffic;