import React, { useState } from "react";
import InputWithIcon from "./imputs";  
import Buttons from "./buttons";  

const Entries = ({ tasks, setTasks, postTask, input, setInput }) => {
  const handleAddTask = () => {
    if (input.trim()) {
      postTask(input.trim());  
      setInput(""); 
    } else {
      alert("Task cannot be empty!");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="d-block">
          <InputWithIcon onChange={(e) => setInput(e.target.value)} value={input} />
          <Buttons onClick={handleAddTask}>
            Add
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default Entries;
