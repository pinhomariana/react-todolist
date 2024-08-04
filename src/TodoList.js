import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, editingTaskId, dispatch, handleEdit, handleSave }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          editingTaskId={editingTaskId}
          dispatch={dispatch}
          handleEdit={handleEdit}
          handleSave={handleSave}
        />
      ))}
    </ul>
  );
}

export default TodoList;
