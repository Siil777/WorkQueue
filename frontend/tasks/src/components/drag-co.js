import React, { useState, useEffect } from "react";

const TaskManager = ({ onTask }) => {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : { do: [], inProgress: [], done: [] };
    });
    const [input, setInput] = useState('');
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    const addTask = (task) => {
        onTask(task); 
        
        setTasks((prevTasks) => ({
            ...prevTasks,
            do: [...prevTasks.do, { id: Date.now(), text: task }]
        }));
    };

    const handleDragStart = (e, task, area) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("taskArea", area);
    };

    const handleDrop = (e, area) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        const taskArea = e.dataTransfer.getData("taskArea");

        if (taskArea !== area) {
            const taskToMove = findTaskById(taskId, taskArea);
            if (taskToMove) {
                moveTask(taskToMove, taskArea, area);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const findTaskById = (taskId, area) => {
        return tasks[area].find((task) => task.id === parseInt(taskId));
    };

    const moveTask = (task, fromArea, toArea) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[fromArea] = updatedTasks[fromArea].filter(
                (t) => t.id !== task.id
            );
            updatedTasks[toArea] = [...updatedTasks[toArea], task];
            return updatedTasks;
        });
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTask(input);
            setInput(''); 
        }
    };

    return (
        <div>
            <div>
                <form className="d-grid justify-content-center" onSubmit={handleAddTask}>
                    <div>
                        <label htmlFor="taskInput">Enter task</label>
                    </div>
                    <div>
                        <input
                            id="taskInput"
                            placeholder="Enter task"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-5">
                        <button type="submit" className="btn btn-outline-primary mt-3">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                {["do", "inProgress", "done"].map((area) => (
                    <div
                        key={area}
                        className={`task-area ${area}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, area)}
                        style={{
                            width: "30%",
                            minHeight: "200px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            padding: "10px",
                            backgroundColor: "#f4f4f4"
                        }}
                    >
                        <h3>{area === "do" ? "Do" : area === "inProgress" ? "In Progress" : "Done"}</h3>
                        {tasks[area].map((task) => (
                            <div
                                key={task.id}
                                className="task"
                                draggable
                                onDragStart={(e) => handleDragStart(e, task, area)}
                                style={{
                                    padding: "10px",
                                    margin: "5px",
                                    background: "#f5f5f5",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    cursor: "grab"
                                }}
                            >
                                {task.text}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;



