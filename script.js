const apiBaseURL = 'http://localhost:5000/tasks';
const taskList = document.getElementById('taskList');
const addTaskForm = document.getElementById('addTaskForm');

// Fetch and display tasks
function fetchTasks() {
  axios.get(apiBaseURL)
    .then(response => {
      renderTasks(response.data);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
}

// Render tasks in the task list
function renderTasks(tasks) {
  taskList.innerHTML = ''; // Clear the list
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.title} - ${task.description || 'No Description'}
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add a new task
addTaskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  axios.post(apiBaseURL, { title, description })
    .then(response => {
      fetchTasks(); // Refresh task list
      addTaskForm.reset(); // Clear form
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
};

// Delete a task
function deleteTask(taskId) {
  axios.delete(`${apiBaseURL}/${taskId}`)
    .then(() => {
      fetchTasks(); // Refresh task list
    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
}

// Initial fetch on page load
fetchTasks();
