//post-entry.js
import React, { useState, useEffect } from 'react';
import Entries from './get-entry.js';
import TaskBoard from './Taskboard.js';

const App = () => {
    const [tasks, setTasks] = useState({ do: [], inProgress: [], done: [] });
    useEffect(() => {
        const fetchTasks = async (newTask) => {
            try {
                const response = await fetch('http://localhost:5000/get/task', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error('Cannot fetch tasks');
                }
                const data = await response.json();
                const updatedTasks = {
                    ...tasks,
                    do: [...(tasks.do || []), { id: data.id, text: newTask }],
                }
                setTasks(data);
            } catch (error) {
                console.error(error);
                const savedTasks = localStorage.getItem('tasks');
                if (savedTasks) {
                    setTasks(JSON.parse(savedTasks));
                }
            }
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <Entries tasks={tasks} setTasks={setTasks} />
            <TaskBoard tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default App;

