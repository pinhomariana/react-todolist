import './App.css';
import { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTodo from './AddTodo';
import TodoList from './TodoList';


function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...tasks,
        {
          id: uuidv4(),
          text: action.newTask,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return tasks.map((task) => {
        if (task.id === action.id) {
          return { ...task, completed: action.completed };
        }
        return task;
      });
    case 'SAVE_TODO':
      return tasks.map((task) => {
        if (task.id === action.id) {
          return { ...task, text: action.newText };
        }
        return task;
      });
    case 'DELETE_TODO':
      return tasks.filter((task) => task.id !== action.id);
    case 'DELETE_ALL':
      return [];
    default:
      return tasks;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);


  function handleEdit(id) {
    setEditingTaskId(id);
  }

  function handleSave(id, newText) {
    dispatch({ 
      type: 'SAVE_TODO', 
      id, 
      newText 
    });
    setEditingTaskId(null);
  }

  function deleteAll() {
    dispatch({ 
      type: 'DELETE_ALL' 
    });
  }

  return (
    <div>
      <AddTodo dispatch={dispatch} newTask={newTask} setNewTask={setNewTask}/>
      <TodoList
        tasks={tasks}
        dispatch={dispatch}
        editingTaskId={editingTaskId}
        handleEdit={handleEdit}
        handleSave={handleSave}
      />
      <button onClick={deleteAll}>Delete All</button>
    </div>
  );
}

export default App;
