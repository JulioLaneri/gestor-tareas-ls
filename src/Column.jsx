import React from 'react';
import Task from './Task';
import './App.css';

const Column = ({ title, tasks, onTaskStatusChange }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onTaskStatusChange={onTaskStatusChange}
        />
      ))}
    </div>
  );
};

export default Column;