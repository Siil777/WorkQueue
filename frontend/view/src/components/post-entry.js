import React, { useState, useEffect } from 'react';
import Entries from './get-entry.js'; 
import TaskBoard from './Taskboard.js'; 

const App = () => {
  const [tasks, setTasks] = useState({ do: [], inProgress: [], done: [] });
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
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
          do: data.filter(task => task.category === 'todo'),
          inProgress: data.filter(task => task.category === 'inProgress'),
          done: data.filter(task => task.category === 'done'),
        };

        // Save tasks to localStorage and update state
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
      } catch (error) {
        console.error(error);
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks)); // Use saved tasks from localStorage
        }
      }
    };

    fetchTasks();
  }, []);

  // Function to post a new task
  const postTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:5000/post/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask, category: 'todo' }),
      });

      if (response.ok) {
        const tasksResponse = await fetch('http://localhost:5000/get/task');
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


