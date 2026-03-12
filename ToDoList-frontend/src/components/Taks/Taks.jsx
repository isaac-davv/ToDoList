import { useState } from 'react';
import './Taks.css';

export default function Task({ task, setTasks }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(task.name);
    const [text, setText] = useState(task.text);
    const [status, setStatus] = useState(task.status);

    const deleteTask = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();

            if (response.ok) {
                setTasks(prev => prev.filter(t => t._id !== task._id));
                alert("Tarea eliminada");
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.log('Error al eliminar la tarea', error);
        }
    }

    const updateTask = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, text, status })
            });
            const updatedTask = await response.json();
            if (response.ok) {
                setTasks(prev => prev.map(t => t._id === task._id ? updatedTask : t));
                setEditing(false);
            } else {
                alert(updatedTask.message);
            }
        } catch (error) {
            console.log('Error al actualizar la tarea', error);
        }
    }

    return (
  <div className="task">
    {editing ? (
      <div className="task-edit">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre..." />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Descripción..." />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>
        <div className="task-edit-actions">
          <button onClick={updateTask} className="save-task">Guardar</button>
          <button onClick={() => setEditing(false)} className="cancel-task">Cancelar</button>
        </div>
      </div>
    ) : (
      <>
        <h4 className="task-name">{task.name}</h4>
        <p className="task-text">{task.text}</p>
        <p className={`task-status ${task.status}`}>{task.status}</p>
        <div className="task-actions">
          <button onClick={() => setEditing(true)} className="edit-task">Editar</button>
          <button onClick={deleteTask} className="delete-task">Eliminar</button>
        </div>
      </>
    )}
  </div>
)
}