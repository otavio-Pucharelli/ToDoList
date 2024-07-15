import  express  from 'express';

const app = express();

app.get('/tasks', (req, res) => {

    const tasks = [
        { id: 1, name: 'task1' },
        { id: 2, name: 'task2' },
        { id: 3, name: 'task3' }
    ];

    res.json(tasks).send();
});

app.listen(5000, () => { console.log("Server is running on port 5000") });