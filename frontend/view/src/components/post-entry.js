import { useState } from 'react';
import GetTasks from './get-entry.js';
import InputWithIcon from './imputs.js';
import Buttons from './buttons.js';

const Entries = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const postTask = async (newTask) => {
        try {
            const response = await fetch('https://for-server-side-2.onrender.com/post/task', {
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
                setTasks((prevTasks) => [...prevTasks, { id: data.id, text: newTask }]);
                alert('Task has been added successfully');
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="d-block">
                    <InputWithIcon
                        onChange={(e) => setInput(e.target.value)} 
                    />
                    <Buttons
                        onClick={() => {
                            console.log('Adding task:', input); 
                            postTask(input);
                        }}
                    >
                        Add
                    </Buttons>
                </div>
            </div>
            <GetTasks />
        </div>
    );
};

export default Entries;
