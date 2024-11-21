import React from "react";
import { useState, useEffect } from "react";
import DeleteMethod from './delete-entry';

const GetTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/get/task', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            if (!response.ok) {
                throw new Error(`can not get task`)
            } else {
                console.log('tasks')
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                throw new Error('unexpected format' + JSON.stringify(data));
            }
            console.log('fetched data', data);

        } catch (e) {
            setError(e.message)
            console.error(e);
        }
    }
    useEffect(() => {
        fetchTasks();
    }, []);

    // const handleDeleted = (deletedTaskID) => {
    //     setTasks(tasks.filter(task => task.id !== deletedTaskID))
    // }

    return (
        <div>
  {/*           {error && <p>Error: {error} </p>}
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task, index) => (
                        <li key={task.id}>{task.task}
                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading tasks...</p>
            )} */}

        </div>
    )
}
export default GetTasks;