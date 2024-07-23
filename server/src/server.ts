import  express  from 'express';
import  cors  from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(bodyParser.json());

const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks).send();
});

app.post('/tasks', (req, res) => {
    if (!req.body.name) {
        res.status(400).send();
        return;
    }
    let newTask = {
        id: tasks.length + 1,
        check: req.body.check,
        name: req.body.name
    }
    tasks.push(newTask);
    res.status(200).send();
    
})

app.put('/tasks/:id', (req, res) => {
    if (req === undefined || req.body === undefined || req.body.name === undefined || req.body.name == "" || req.body.check === undefined) {
        res.status(400).send();
    }
    let id = Number(req.params.id);
    const task = tasks.find(task => task.id === id)
    if (task) {
        task.name = req.body.name;
        task.check = req.body.check;
    }
    res.status(200).send();
})

app.delete('/tasks/:id', (req, res) => {
    if (req === undefined || req.params.id === undefined) {
        res.status(400).send
    }
    let id = Number(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
    res.status(200).send();
})

app.listen(5000, () => { console.log("Server is running on port 5000") });