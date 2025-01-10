const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from the "public" folder

// Temporary in-memory storage for tasks
let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: Date.now(), title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(200).json({ message: 'Task deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
