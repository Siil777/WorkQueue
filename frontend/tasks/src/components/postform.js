import React from "react";
import { useState, useEffect } from "react";
import Inputs from './inputs.js';
import Button from './buttons.js';


const Tables = ({ onTask }) => {
    const [inputs, setInputs] = useState('');

    const handleAddTask = (e) => {
        if (onTask) {
            e.preventDefault();
            if (onTask) {
                console.log('btn clicked!', inputs);
                onTask(inputs);
            }
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <form className="d-grid justify-content-center mt-5 pt-5 border col-4 pb-5">
                <div className="mt-2">
                    <Inputs id="input" placeholder="enter" value={inputs} onChange={(e) => setInputs(e.target.value)} />
                </div>
                <div className="mt-2">
                    <Button onClick={handleAddTask} />
                </div>
            </form>
        </div>
    )

}
export default Tables;