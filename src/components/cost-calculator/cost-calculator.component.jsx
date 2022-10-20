import React from 'react';
import { Button } from '..';

const CostCalculator = () => {
    return (
        <div className="costCalculator">
            <form >
                <div className="carparkID">
                    <label>CarPark ID </label>
                    <input type="text" name="carparkID" required />
                </div>
                <div className="startTime">
                    <label>Start Time: </label>
                    <input type="time" name="stime" min="00:00" max="23:59" required />
                </div>
                <div className="endTime">
                    <label>End Time: </label>
                    <input type="time" name="etime" min="00:00" max="23:59" required />
                </div>
                
                <Button>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CostCalculator;