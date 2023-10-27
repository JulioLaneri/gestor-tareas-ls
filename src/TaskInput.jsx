import React, { useState } from 'react';
import './App.css';

const TaskInput = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && assignee && date) {
      onAddTask(description, assignee, date);
      setDescription('');
      setAssignee('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Asignado a"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskInput;
