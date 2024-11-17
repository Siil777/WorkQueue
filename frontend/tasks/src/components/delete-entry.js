import React from "react";
import { useState, useEffect } from "react";

const DeleteEntry = ({taskID, onTaskDeleted}) => {
    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/delete/task', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskID }),
            });
            if (response.status === 204) {
                console.log('Task successfully deleted');
                onTaskDeleted(taskID);
            } else if (response.status === 404) {
                console.log('Task not found');
            }
        } catch (e) {
            console.error(e);
        }
    };
    
    return(
        <div>
            <button onClick={handleDelete} className="btn btn-outline-danger">
                Delete
            </button>
        </div>
    )
}
export default DeleteEntry;