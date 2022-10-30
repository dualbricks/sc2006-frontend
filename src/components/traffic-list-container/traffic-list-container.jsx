import { Container } from 'react-bootstrap'
import {TrafficContainer} from '../'
import { Box, Grid } from "@mui/material";
import './traffic-list-container.style.scss'

const TrafficListContainer = ({ImageList}) => {

    return(
            <Box textAlign="center" className='box-container' width="xs">
                <Grid container className="grid-container rounded" xs>
                    {ImageList.map((trafficImage) => (<TrafficContainer key={trafficImage._id} trafficImage={trafficImage}/>))}
                </Grid>
            </Box>

    )

}


export default TrafficListContainer