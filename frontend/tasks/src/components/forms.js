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
            <form className="d-grid justify-content-center">
                <div>
                <label htmlFor="input">Enter task</label>
                </div>
                <div>
                <input id="input" placeholder="enter"
                onChange={(e)=>setInputs(e.target.value)}
                value={inputs}
                />
                </div>
                <div>
                <button onClick={handleInput} className="btn btn-outline-primary mt-3">Click</button>
                </div>
            </form>
        </div>
    )
}

export default Forms;