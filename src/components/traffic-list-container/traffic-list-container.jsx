import { Container } from 'react-bootstrap'
import {TrafficContainer} from '../'
import { Grid } from "@mui/material";
import './traffic-list-container.style.scss'

const TrafficListContainer = ({ImageList}) => {

    return(
        <div className='border rounded container'>
            <div className='flex'>
                <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}  className="grid-container">
                {ImageList.map((trafficImage) => (<TrafficContainer key={trafficImage.CameraID} trafficImage={trafficImage}/>))}
                </Grid>
            </div>
      </div>
    )

}


export default TrafficListContainer