import React from "react";

const DeleteEntry = ({ taskId, onTaskDeleted }) => {
    const handleDelete = async () => {
        try {
            console.log("Task ID being deleted:", taskId);  

            if (!taskId) {
                console.error("Invalid taskId");
                return;
            }

            const response = await fetch(`https://backend-tau-ecru-85.vercel.app/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Task successfully deleted');
                if (onTaskDeleted) onTaskDeleted(taskId);
            } else if (response.status === 404) {
                console.warn('Task not found');
            } else {
                console.error(`Failed to delete task. Status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-outline-danger">
            Delete
        </button>
    );
};
export default DeleteEntry;


