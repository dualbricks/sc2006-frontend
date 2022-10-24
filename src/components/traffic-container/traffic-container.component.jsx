// container for single traffic image
import { Grid } from "@mui/material";
import { styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import {BigImageContainer} from '../'
const Img = styled('img')({
  margin: 'auto',
  display: 'flex',
  maxWidth: '300px',
  maxHeight: '300px',
});
const TrafficContainer = ({trafficImage}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ImageLink, Name } = trafficImage;
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
  <>
     <Paper
      sx={{
        p: 2,
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode = '#FFE5B4',
      }} onClick={togglePopup}>
      <Grid container spacing={2}>
      <Grid item xs>
        <Img src={ImageLink} alt={Name} />
      </Grid>
      <Grid item xs>
        <p>{Name}</p>
      </Grid>
    </Grid>
    </Paper>
    {isOpen && <BigImageContainer image={ImageLink} Name={Name} closeHander={togglePopup} isOpen={isOpen}/>}
  </>
  );
};

export default TrafficContainer