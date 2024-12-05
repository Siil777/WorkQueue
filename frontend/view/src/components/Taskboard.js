//Taskboard.js
import './../scss/style.scss';

import React, { useState, useEffect } from "react";
const TaskBoard = ({ tasks, setTasks }) => {
    const [draggedTask, setDraggedTask] = useState(null);
    const [draggedTaskCategory, setDraggedTaskCategory] = useState(null);

    const handleDragStart = (taskId, category) => {
        setDraggedTask(taskId);
        setDraggedTaskCategory(category);
    };

    const handleDrop = (newCategory) => {
        if (!draggedTask || draggedTaskCategory === newCategory) return;

        const updatedTasks = { ...tasks };
        const taskIndex = updatedTasks[draggedTaskCategory].findIndex(
            (task) => task.id === draggedTask
        );
        const taskToUpdate = updatedTasks[draggedTaskCategory].splice(taskIndex, 1)[0];

        taskToUpdate.category = newCategory;
        updatedTasks[newCategory].push(taskToUpdate);

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        setDraggedTask(null);
        setDraggedTaskCategory(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const renderTasks = (category) => {
        return tasks[category]?.map((task) => (
            <div
                key={task.id} className="task-item"
                draggable
                onDragStart={() => handleDragStart(task.id, category)}
                style={{
                    padding: "8px",
                    margin: "4px 0",
                    backgroundColor: "#f0f0f0",
                    cursor: "grab",
                    color: "black"
                }}
            >
                {task.text}
            </div>
        )) || <p>No tasks available</p>;
    };

    return (
        <div className="d-block d-sm-flex justify-content-around text-center">
            <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("do")}
                className="flex-item mx-auto"
                style={{ width: "90%", maxWidth: "300px", padding: "16px", backgroundColor: "#e0e0e0" }}
            >
                <h3>To Do</h3>
                {renderTasks("do")}
            </div>

            <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("inProgress")}
                className="flex-item mx-auto ms-md-1"
                style={{ width: "90%", maxWidth: "300px", padding: "16px", backgroundColor: "#d0f0c0" }}
            >
                <h3>In Progress</h3>
                {renderTasks("inProgress")}
            </div>

            <div
                onDragOver={handleDragOver}
                onDrop={() => handleDrop("done")}
                className="flex-item mx-auto ms-md-1"
                style={{ width: "90%", maxWidth: "300px", padding: "16px", backgroundColor: "#c0d0f0" }}
            >
                <h3>Done</h3>
                {renderTasks("done")}
            </div>
        </div>
    );
};

export default TaskBoard;
