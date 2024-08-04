import React, { useState } from 'react';

function TodoItem({ task, editingTaskId, dispatch, handleEdit, handleSave }) {
  const [editText, setEditText] = useState(task.text);

  function handleChange(e) {
    setEditText(e.target.value);
  }

  return (
    <li>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={() => dispatch({
          type: 'TOGGLE_TODO',
          id: task.id,
          completed: !task.completed,
        })}
      />
      {editingTaskId === task.id ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={handleChange}
          />
          <button onClick={() => handleSave(task.id, editText)}>Save</button>
        </>
      ) : (
        <>
          {task.text}
          <button onClick={() => handleEdit(task.id)}>Edit</button>
        </>
      )}
          <button onClick={() => dispatch({
            type: 'DELETE_TODO',
            id: task.id,
            })}>Delete</button>
    </li>
  );
}

export default TodoItem;
