import ExpenditureRecord from "../expenditure-record/expenditure-record.component"
import './expenditure-list-container.scss'
import { Box } from "@mui/material"
const ExpenditureListContainer = ( {expenditures, handleInput}) => {

    return (
        <Box overflow="auto" maxHeight='500px' alignContent='center' >
            {expenditures.map((expenditure)=> <ExpenditureRecord record={expenditure} key={expenditure._id} />)}
        </Box>
    )

}

export default ExpenditureListContainer