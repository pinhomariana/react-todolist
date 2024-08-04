import React from 'react';

function AddTodo({ newTask, setNewTask, dispatch }) {
    function handleSubmit(e) {
        e.preventDefault();
        if (newTask.length === 0) return;
        dispatch({ 
          type: 'ADD_TODO', 
          newTask 
        });
        setNewTask('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default AddTodo;
