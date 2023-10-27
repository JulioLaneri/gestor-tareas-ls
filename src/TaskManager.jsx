import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import Column from './Column';
import './App.css';

const TaskManager = () => {
  const initialTasks = [];

  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || initialTasks;
    setTasks(storedTasks);
  }, []);

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'Pendiente') return 'En Progreso';
    if (currentStatus === 'En Progreso') return 'Hecho';
    return currentStatus;
  };

  const updateAndStoreTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const updateTaskStatusAndStore = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    updateAndStoreTasks(updatedTasks);
  };

  const handleTaskStatusChange = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      const newStatus = getNextStatus(taskToUpdate.status);
      updateTaskStatusAndStore(taskId, newStatus);
    }
  };

  const handleAddTask = (description, assignee, date) => {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      assignee,
      date,
      status: 'Pendiente'
    };

    const updatedTasks = [...tasks, newTask];
    updateAndStoreTasks(updatedTasks);
  };

  return (
    <div className="app">
      <div className="add-task">
        <button onClick={() => setShowModal(true)}>Nueva Tarea</button>
      </div>
      <div className="columns">
        {['Pendiente', 'En Progreso', 'Hecho'].map((columnTitle) => (
          <Column
            key={columnTitle}
            title={columnTitle}
            tasks={tasks.filter((task) => task.status === columnTitle)}
            onTaskStatusChange={handleTaskStatusChange}
          />
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nueva Tarea</h2>
            <TaskInput onAddTask={handleAddTask} />
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
