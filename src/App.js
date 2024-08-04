import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';



function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  function handleEdit(id) {
    setEditingTaskId(id);
  }

  function handleSave(id, newText) {
    setTasks(currentTasks => {
      return currentTasks.map(task => {
        if (task.id === id) {
          return { ...task, text: newText };
        }
        return task;
      });
    });
    setEditingTaskId(null);
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (newTask.length == 0) {
      return;
    }

    setTasks(currentTasks => {
      return [
        ...tasks,
        { id: uuidv4(), text: newTask, completed: false}
      ]
    })
    setNewTask("");
  }

  function toggleTask(id, completed) {
    setTasks(currentTasks => {
      return currentTasks.map(task => {
        if (task.id === id) {
          return {...task, completed}
        }
        return task
      })
    })
  }

  function deletTask(id) {
    setTasks(currentTasks => {
      return currentTasks.filter(task => task.id != id)
    })
  }

  function deleteAll() {
    setTasks(currentTasks => {
      return []
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button>Add Task</button>
      </form>
      <ul>
  {tasks.map((task) => (
    <li key={task.id}>
      <input 
        type='checkbox' 
        checked={task.completed} 
        onChange={e => toggleTask(task.id, e.target.checked)}
      />
      {editingTaskId === task.id ? (
        <input 
          type="text" 
          value={task.text} 
          onChange={(e) => {
            setTasks(currentTasks => 
              currentTasks.map(t => 
                t.id === task.id ? {...t, text: e.target.value} : t
              )
            );
          }} 
        />
      ) : (
        task.text
      )}
      {editingTaskId === task.id ? (
        <button onClick={() => handleSave(task.id, task.text)}>Save</button>
      ) : (
        <button onClick={() => handleEdit(task.id)}>Edit</button>
      )}
      <button onClick={() => deletTask(task.id)}>Delete</button>
    </li>
  ))}
</ul>
      <button onClick={deleteAll}>Delete All</button>
    </div>
  );
}

export default App;
