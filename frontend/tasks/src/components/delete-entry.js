import React from "react";
import { useState, useEffect } from "react";

const DeleteEntry = ({taskID, onTaskDeleted}) => {
    const [response, setResponse] = useState([]);
    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/delete/task/:id', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: taskID }),
            });
            if (response.status === 204) {
                console.log('Task successfully deleted');
                setResponse(taskID);
                return;
            } else if (response.status === 404) {
                console.log('Task not found');
            }
            const data = await response.json();
            setResponse(data);
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