import React, { useState, useEffect } from "react";
import InputWithIcon from './imputs.js';
import ButtonSecondary from './buttons.js';
import DeleteEntry from './delete-entry.js';

const TaskManager = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : { do: [], inProgress: [], done: [] };
    });
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    // Fetch tasks from the database when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/get/task');
                if (!response.ok) {
                    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
                }
                const fetchedTasks = await response.json();
                const combinedTasks = mergeTasks(fetchedTasks, tasks); // Merge with localStorage tasks
                setTasks(combinedTasks);
                localStorage.setItem("tasks", JSON.stringify(combinedTasks)); // Update localStorage
            } catch (e) {
                setError(e.message);
                console.error(e);
            }
        };

        fetchTasks();
    }, []);

    // Sync tasks with localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const mergeTasks = (dbTasks, localTasks) => {
        const merged = { ...localTasks };
        for (const area in dbTasks) {
            if (dbTasks[area]) {
                merged[area] = [...dbTasks[area], ...localTasks[area]];
            }
        }
        return merged;
    };

    const postTask = async (newTask) => {
        try {
            const response = await fetch('http://localhost:5000/post/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newTask }),
            });

            if (response.status === 409) {
                alert('Task already exists!');
            } else if (response.status === 201) {
                const data = await response.json(); // Extract task id
                return data.id;
            } else {
                const errorData = await response.json();
                throw new Error(`Error: ${errorData.message}`);
            }
        } catch (e) {
            setError(e.message);
            console.error(e);
        }
    };

    const getNextId = () => {
        const lastId = parseInt(localStorage.getItem('lastId') || '0', 10);
        const nextId = lastId + 1;
        localStorage.setItem('lastId', nextId);
        return nextId;
    };

    const addTask = (task) => {
        const newId = getNextId();
        postTask(task); // Save to the database
        setTasks((prevTasks) => ({
            ...prevTasks,
            do: [...prevTasks.do, { id: newId, text: task }],
        }));
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

    const handleDeleted = (deletedTaskID) => {
        setTasks((prevTasks) => {
            const updatedTasks = {};
            for (const area in prevTasks) {
                updatedTasks[area] = prevTasks[area].filter((task) => task.id !== deletedTaskID);
            }
            return updatedTasks;
        });
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

    return (
        <div>
            <form className="d-grid justify-content-center mt-5" onSubmit={handleAddTask}>
                <div>
                    <InputWithIcon
                        id="taskInput"
                        placeholder="Enter task"
                        value={input}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-5">
                    <ButtonSecondary type="submit" className="btn btn-outline-primary mt-3">
                        Add Task
                    </ButtonSecondary>
                </div>
            </form>
            <div
                className="col-md-11 ms-md-5 ps-md-5 flex-md-row"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
            >
                {["do", "inProgress", "done"].map((area) => (
                    <div
                        key={area}
                        className={`task-area ${area}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, area)}
                        style={{
                            width: "80%",
                            minHeight: "200px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            padding: "10px",
                            backgroundColor: "#f4f4f4",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h3>{area === "do" ? "Do" : area === "inProgress" ? "In Progress" : "Done"}</h3>
                        {tasks[area].map((task, index) => (
                            <div
                                key={index}
                                className="task"
                                draggable
                                onDragStart={(e) => handleDragStart(e, task, area)}
                                style={{
                                    padding: "10px",
                                    margin: "5px 0",
                                    background: "#f5f5f5",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    cursor: "grab",
                                }}
                            >
                                {task.text}
                                <DeleteEntry taskId={task.id} onTaskDeleted={handleDeleted} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;




