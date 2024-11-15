const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('tasks.db', (err) => {
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

async function insertTask(task) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO tasks (task) VALUES (?)', [task], (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

module.exports = { getTask, insertTask };
