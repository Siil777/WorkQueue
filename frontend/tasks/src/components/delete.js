import React from "react";
import { useState,useEffect } from "react";

const DeleteTask = ({taskID, onTaskdeleted}) => {
    const [error, setError] = useState(null);
    const handleDelete = async () => {
        try{
            const response = await fetch('http://localhost:5000/delete/task',{
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id: taskID }),
            });
            if(response.status===204){
                console.log('task successfully deleted');
                onTaskdeleted(taskID);
            }else if(response.status===404){
                console.log('task not found')
            }
    
        }catch(e){
            console.error(e)
            setError('an error occurred')
        }
    }
    return(
        <div>
            <button onClick={handleDelete} className="btn btn-outline-danger">
                Delete
            </button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default DeleteTask;