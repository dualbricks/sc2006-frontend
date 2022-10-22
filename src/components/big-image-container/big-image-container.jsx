import { Paper, styled } from "@mui/material"
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
const Img = styled('img')({
    margin: 'auto',
    display: 'flex',
    minWidth: '500px',
    minHeight: '500px',
    maxWidth: '1000px',
    maxHeight: '1000px',
  });

const BigImageContainer = ({ image, Name, isOpen,closeHander}) => { 
    return (
        <Dialog variant="outlined"
            open={isOpen}
            maxWidth="lg"
            onClose={closeHander}
        >
            <IconButton
                aria-label="close"
                onClick={closeHander}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
                <CloseIcon />
            </IconButton>
            <Img src={image} alt={Name} />
            <p>{Name}</p>
        </Dialog>
    )
}

export default BigImageContainer