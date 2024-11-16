import React from "react";
import { useState, useEffect } from "react";

const Forms = ({ onTask }) => {
    const [inputs, setInputs] = useState('');

    const handleInput = (e) => {
        e.preventDefault();
        console.log('btn has been clicked!')
        onTask(inputs);
    }
    return (
        <div>
            <form onClick={handleInput}>
                <div>
                <label htmlFor="input">Enter task</label>
                </div>
                <div>
                <input id="input" placeholder="enter"
                onClick={(e)=>setInputs(e.target.value)}
                />
                </div>
                <div>
                <button className="btn btn-outline-primary">Click</button>
                </div>
            </form>
        </div>
    )
}

export default Forms;