import ExpenditureRecord from "../expenditure-record/expenditure-record.component"
import './expenditure-list-container.scss'
import { Box } from "@mui/material"
const ExpenditureListContainer = ( {expenditures, handleInput}) => {

    return (
        <div className="expenditure-list-container">
            <Box overflow="auto" maxHeight='500px'>
                {expenditures.map((expenditure)=> <ExpenditureRecord record={expenditure} key={expenditure._id} />)}
            </Box>
            
        </div>
    )

}

export default ExpenditureListContainer