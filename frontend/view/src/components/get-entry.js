import React, { useState, useEffect } from "react";
import InputWithIcon from "./imputs";
import Buttons from "./buttons";

const Entries = ({ tasks, setTasks }) => {
    const [input, setInput] = useState("");

    useEffect(() => {

        const savedTasks = localStorage.getItem("tasks");

        console.log("Saved tasks from localStorage:", savedTasks);

        if (savedTasks) {
            try {

                const parsedTasks = JSON.parse(savedTasks);

                if (
                    parsedTasks &&
                    parsedTasks.do &&
                    parsedTasks.inProgress &&
                    parsedTasks.done
                ) {
                    console.log("Setting tasks from localStorage");
                    setTasks(parsedTasks); 
                } else {
                    console.error("Invalid tasks data structure in localStorage");
                }
            } catch (error) {
                console.error("Error parsing tasks from localStorage:", error);
            }
        } else {
            console.log("No tasks found in localStorage");
            setTasks({ do: [], inProgress: [], done: [] }); 
        }
    }, [setTasks]);

    const postTask = async (newTask) => {
        try {
            const response = await fetch("http://localhost:5000/post/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task: newTask, category: "todo" }),
            });

            if (response.ok) {

                const tasksResponse = await fetch('http://localhost:5000/get/task');
                const data = await tasksResponse.json();

                if (Array.isArray(data)) {
                    const updatedTasks = {
                        do: data.filter(task => task.category === "todo"),
                        inProgress: data.filter(task => task.category === "inProgress"),
                        done: data.filter(task => task.category === "done"),
                    };

                    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

                    setTasks(updatedTasks);

                    alert("Task added successfully!");
                } else {
                    console.error('Error: Response data is not an array');
                }
            }
        } catch (error) {
            console.error("Error posting task:", error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="d-block">
                    <InputWithIcon onChange={(e) => setInput(e.target.value)} />
                    <Buttons
                        onClick={() => {
                            if (input.trim()) {
                                postTask(input.trim());
                            } else {
                                alert("Task cannot be empty!");
                            }
                        }}
                    >
                        Add
                    </Buttons>
                </div>
            </div>
        </div>
    );
};

export default Entries;
