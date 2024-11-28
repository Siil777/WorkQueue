import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const DeleteEntry = ({ taskId, onTaskDeleted }) => {
    const handleDelete = async () => {
        try {
            console.log("Task ID being deleted:", taskId);

            if (!taskId) {
                console.error("Invalid taskId");
                return;
            }

            const response = await fetch(`https://for-server-side.onrender.com/task/${taskId}`, {
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
        <div className="text-end">
            <button
                onClick={handleDelete}
                className="btn btn-link p-0"
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                aria-label="Delete"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>

    );
};
export default DeleteEntry;


