import { useState, useEffect } from 'react';
import Forms from './drag-co.js';
import GetTasks from './get-entry.js';
const Entries = ({ task }) => {
    const [responseData, setresponseData] = useState(null);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);


    const postTask = async (newTask) => {
        try {
            const response = await fetch('http://localhost:5000/post/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newTask }),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    alert('Task already exists!');
                } else {
                    const errorData = await response.json();
                    throw new Error(`Error: ${errorData.message}`);
                }
            } else if (response.status === 201) {
                const data = await response.json();
                // Use the ID from the backend
                setTasks((prevTasks) => ({
                    ...prevTasks,
                    do: [...prevTasks.do, { id: data.id, text: newTask }],
                }));
                alert('Task has been added successfully');
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (task) {
        postTask();
    }

    return (
        <div>
            <Forms onTask={postTask} />
            <GetTasks />
        </div>
    )
}

export default Entries;