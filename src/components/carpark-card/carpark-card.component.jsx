import { Paper } from '@mui/material'
import {AvailabilityIcon} from '../index'


const CarparkCard = ({ Development, normal, heavy, motorcyle, onClick }) => {

    return (
        <Paper className="border rounded" onClick={onClick}>
        <h2>Location: {Development}</h2>
        <div className="icon-container container align-right ">
            <AvailabilityIcon availability={normal} lotType="Normal"/>
            <AvailabilityIcon availability={motorcyle} lotType="Motorcycle"/>
            <AvailabilityIcon availability={heavy} lotType="Heavy"/>
        </div>
        </Paper>

    )

}

export default CarparkCard