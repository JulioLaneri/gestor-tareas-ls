import React from 'react';

const Task = ({ task, onTaskStatusChange }) => {
  const handleStatusChange = () => {
    onTaskStatusChange(task.id);
  };

  let buttonText = '';
  let buttonColor = ''; 

  if (task.status === 'Pendiente') {
    buttonText = 'Comenzar';
    buttonColor = 'yellow'; 
  } else if (task.status === 'En Progreso') {
    buttonText = 'Terminar';
    buttonColor = 'green'; 
  }

  return (
    <div className="task">
      <p>{task.description}</p>
      <p>Asignado a: {task.assignee}</p>
      <p>Fecha: {task.date}</p>
      {task.status !== 'Hecho' && (
        <button onClick={handleStatusChange} style={{ backgroundColor: buttonColor }}>
          {buttonText}
        </button>
      )}
    </div>
  );
};


export default Task;