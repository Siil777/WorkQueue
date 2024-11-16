import { useState, useEffect } from 'react';
import Forms from './forms.js';
const Entries = ({ task }) => {
    const [responseData, setresponseData] = useState(null);
    const [error, setError] = useState(null);


        const postTask = async (newTask) => {
            try {
                const response = await fetch('http://localhost:5000/post/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: newTask })
                })
                if(response.status===409) {
                    alert('Task already exist!');
                }else if(response.status===201){
                    alert('Task has been addded successfully');
                }else if(!response.ok) {
                    const errorData = await response.json();
                    throw new Error('some error occurred', errorData.message);
                }
                const data = await response.json();
                setresponseData(data);
            } catch (e) {
                setError(e)
                console.error(e);
            }
        }
        if(task){
            postTask();
        }

    return(
        <div>
            <Forms onTask={postTask} />
        </div>
    )
}

export default Entries;