import React, { useState } from 'react';
import './tasklist.css';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { HiOutlinePlusSm } from 'react-icons/hi';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review new job applications', completed: false },
    { id: 2, title: 'Update image gallery', completed: false },
    { id: 3, title: 'Respond to complaints', completed: true },
    { id: 4, title: 'Schedule server maintenance', completed: false },
  ]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add new task
  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsPopupVisible(false); // Close popup after adding
  };

  // Open edit mode with the selected task details
  const openEditPopup = (task) => {
    setIsEditMode(true);
    setTaskToUpdate(task);
    setNewTaskTitle(task.title); // Pre-fill task title
    setIsPopupVisible(true);
  };

  // Update task
  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskToUpdate.id ? { ...task, title: newTaskTitle } : task
    );
    setTasks(updatedTasks);
    setIsPopupVisible(false); // Close popup after updating
    setNewTaskTitle('');
    setIsEditMode(false);
    setTaskToUpdate(null);
  };

  // Delete completed task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="todo">
      <div className="todo-info">
        <h2 className="graph-title">Tasks</h2>
        <div className="icon-plus" onClick={() => setIsPopupVisible(true)}>
          <HiOutlinePlusSm className="icon" />
        </div>
      </div>

      <div className="tasks">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span className="custom-checkbox"></span>
                <span className={task.completed ? 'task-completed' : ''}>
                  {task.title}
                </span>
              </label>

              <div className="icon-container">
                {!task.completed && (
                  <MdOutlineModeEditOutline
                    className="choise-icon"
                    onClick={() => openEditPopup(task)}
                  />
                )}
                {task.completed && (
                  <TiDeleteOutline
                    className="choise-icon-close"
                    onClick={() => deleteTask(task.id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Form for Add/Update */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3 className='pop-heading'>{isEditMode ? 'Update Task' : 'Add New Task'}</h3>
                      <input
                          className='pop-input'
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task Title"
            />
            <div className="popup-buttons">
              {isEditMode ? (
                <button onClick={updateTask} disabled={!newTaskTitle} className='popup-btn'>
                  Update Task
                </button>
              ) : (
                <button onClick={addTask} disabled={!newTaskTitle} className='popup-btn'>
                  Add Task
                </button>
              )}
              <button onClick={() => setIsPopupVisible(false)} className='popup-btn-cancel'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
