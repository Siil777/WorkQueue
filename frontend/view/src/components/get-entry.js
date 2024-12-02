import React, { useState, useEffect } from "react";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [draggedTask, setDraggedTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await fetch("https://for-server-side-2.onrender.com/get/task", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Cannot fetch tasks");
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (e) {
            setError(e.message);
            console.error(e);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDragStart = (taskId) => {
        setDraggedTask(taskId);
    };

    const handleDrop = (newCategory) => {
        if (!draggedTask) return;

        const updatedTasks = tasks.map((task) =>
            task.id === draggedTask ? { ...task, category: newCategory } : task
        );
        setTasks(updatedTasks);

        // Update backend
        fetch(`http://localhost:5000/update/task/${draggedTask}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: newCategory }),
        }).catch((e) => console.error("Failed to update task:", e));
        setDraggedTask(null); // Reset
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const renderTasks = (category) =>
        tasks
            .filter((task) => task.category === category)
            .map((task) => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    style={{
                        padding: "8px",
                        margin: "4px 0",
                        backgroundColor: "#f0f0f0",
                        cursor: "grab",
                    }}
                >
                    {task.task}
                </div>
            ));

    return (
        <div style={{ display: "flex", justifyContent: "space-around", padding: "16px" }}>
            {error && <p>Error: {error}</p>}
            <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("todo")}
                style={{ width: "30%", padding: "16px", backgroundColor: "#e0e0e0" }}
            >
                <h3>To Do</h3>
                {renderTasks("todo")}
            </div>
            <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("in-progress")}
                style={{ width: "30%", padding: "16px", backgroundColor: "#d0f0c0" }}
            >
                <h3>In Progress</h3>
                {renderTasks("in-progress")}
            </div>
            <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("done")}
                style={{ width: "30%", padding: "16px", backgroundColor: "#c0d0f0" }}
            >
                <h3>Done</h3>
                {renderTasks("done")}
            </div>
        </div>
    );
};

export default TaskBoard;
