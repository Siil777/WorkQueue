import React from "react";
import { useState, useEffect } from "react";
import DeleteTasks from './delete.js';

const GetAlltasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(null);
    const fetchTasks  = async () => {
        try{
            const response = await fetch('http://localhost:5000/get/task',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            if(!response.ok){
                    throw new Error('fetch error')
            }else{
                console.log('tasks')
            }
            if(Array.isArray(data)){
                setTasks(data);
            }
            setLoading(false);
        }catch(e){
            console.error(e);
            setLoading(false);
        }
    } 
    useEffect(()=>{
        fetchTasks();
    },[]);
    const handleDeletedTask = (deletedTaskId) => {
        setTasks((prevTask)=>prevTask.filter(task=>task.id !==deletedTaskId));
    }
    return(
        <div>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task,index)=>(
                        <li key={task.id}>{task.task}
                        <DeleteTasks taskID={task.id} onTaskdeleted={handleDeletedTask} />
                        </li>
                    ))
                ):(
                    <p>Loading...</p>
                )}
            </ul>
        </div>
    )

}
export default GetAlltasks;