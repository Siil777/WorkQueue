const express = require('express');
const path = require('path');
const { getTask, insertTask, getAll, deleteTask } = require('./config/db');
const port = 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'config')));
const allowedOrigin = ['http://localhost:3000'];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigin.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    ); 
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); 
    }
    next();
});

app.post('/post/task', async (req, res) => {
    console.log('Request received at /post/task');
    console.log('Request body:', req.body);

    const { task } = req.body;

    try {
        const existTask = await getTask(task);
        if (!existTask) {
            await insertTask(task);
            res.status(201).json({ message: 'Task added successfully!' });
        } else {
            res.status(409).json({ message: 'Task already exists' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/get/task', async (req, res) => {
    const { task } = req.body;
    const outputTask = await getAll(task);
    if (outputTask) {
        res.status(200).json(outputTask)
    } else {
        res.status(404).json({ message: 'tasks not found' })
    }
});
app.delete('/delete/task/:taskId', async (req, res) => {
    const { taskId } = req.params;  // Ensure you are extracting from req.params, not req.body
    console.log("Received taskId:", taskId);  // Log taskId to debug

    // Continue with deletion logic
    try {
        const message = await deleteTask(taskId);
        if (message) {
            res.status(204).send();
        }
    } catch (err) {
        if (err.message === 'Task not found') {
            res.status(404).json({ message: 'Task not found' });
            return;
        } else {
            console.error(err); 
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }
});
;

app.listen(port, async () => {
    console.log(`App is running at port ${port}`)
    try {
        const allTasks = await getAll();
        console.log(allTasks);
    } catch (e) {
        console.error(e)
    }
});
