import React, { useState, useEffect } from 'react';
import Entries from './get-entry.js'; 
import TaskBoard from './Taskboard.js'; 

const App = () => {
  const [tasks, setTasks] = useState({ do: [], inProgress: [], done: [] });
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://for-server-side-2.onrender.com/get/task', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Cannot fetch tasks');
        }

        const data = await response.json();
        const updatedTasks = {
          do: data.filter(task => task.category === 'todo'),
          inProgress: data.filter(task => task.category === 'inProgress'),
          done: data.filter(task => task.category === 'done'),
        };
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
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

  const postTask = async (newTask) => {
    try {
      const response = await fetch('https://for-server-side-2.onrender.com/post/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask, category: 'todo' }),
      });

      if (response.ok) {
        const tasksResponse = await fetch('https://for-server-side-2.onrender.com/get/task');
        const data = await tasksResponse.json();
        const updatedTasks = {
          do: data.filter(task => task.category === 'todo'),
          inProgress: data.filter(task => task.category === 'inProgress'),
          done: data.filter(task => task.category === 'done'),
        };
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        alert("Task added successfully!");
      }
    } catch (error) {
      console.error("Error posting task:", error);
    }
  };

  return (
    <div>
      <Entries 
        tasks={tasks} 
        setTasks={setTasks} 
        postTask={postTask} 
        input={input} 
        setInput={setInput} 
      />
      <TaskBoard tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;


