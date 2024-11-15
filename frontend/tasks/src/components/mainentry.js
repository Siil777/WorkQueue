import { useState, useEffect } from 'react';

const Entries = ({ task }) => {
    const [responseData, setresponseData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const postTask = async () => {
            try {
                const response = fetch('http://localhost:5000/post/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task })
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
    }, [task])

    return(
        <div>
            {error && <div>Error: {error.message}</div>}
            {responseData ? (
                <div>
                    <p>{JSON.stringify(responseData)}</p>
                </div>
                 ):(
                    <p>Loadin..</p>
            )}
        </div>
    )
}

export default Entries;