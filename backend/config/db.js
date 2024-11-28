const { resolve } = require('path');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('worksdbforrender.db', (err) => {
    if (err) {
        throw new Error('Database error: ' + err.message);
    } else {
        console.log('Connected to the SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT
        )`, (createErr) => {
            if (createErr) {
                console.error('Error creating table:', createErr.message);
            } else {
                console.log('Table "tasks" is ready');
            }
        });
    }
});

async function getTask(task) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM tasks WHERE task = ?', [task], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}
async function deleteTask(taskId) {
    console.log("Attempting to delete task with ID:", taskId);
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
            if (err) {
                console.error("Database error:", err);
                return reject(err);
            }
            if (this.changes === 0) {
                return reject(new Error('Task not found'));
            } 
            console.log(`Deleted task with ID: ${taskId}`);
            resolve(`Deleted task with ID: ${taskId}`);
        });
    });
}

async function insertTask(task) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO tasks (task) VALUES (?)', [task], (err) => {
            if (err) return reject(err);
            console.log(`task is: ${task} and task ID: ${this.lastID}`)
            resolve({id: this.lastID, task});
        });
    });
}

async function getAll(task) {
    return new Promise((resolve,reject)=>{
        db.all('SELECT * FROM tasks', (err,rows)=>{
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = { getTask, insertTask, getAll, deleteTask };
