import React, { useState, useEffect } from "react";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/get/task', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Cannot fetch tasks`);
            }
            const data = await response.json();
            setTasks(data);
        } catch (e) {
            setError(e.message);
            console.error(e);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle drag-and-drop
    const handleDragStart = (taskId) => {
        // Store the ID of the task being dragged
        localStorage.setItem('draggedTaskId', taskId);
    };

    const handleDrop = (newCategory) => {
        const taskId = localStorage.getItem('draggedTaskId');
        if (!taskId) return;

        // Update the task's category
        const updatedTasks = tasks.map((task) =>
            task.id === parseInt(taskId) ? { ...task, category: newCategory } : task
        );
        setTasks(updatedTasks);

        // Optionally, update the backend with the new category
        fetch(`http://localhost:5000/update/task/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: newCategory }),
        }).catch((e) => console.error('Failed to update task:', e));
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow dropping
    };

    // Render tasks by category
    const renderTasks = (category) => {
        return tasks
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
    };

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
