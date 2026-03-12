import { useRef } from 'react';
import './TaksForm.css';

export default function TaskForm({ setTasks, setShowForm }){
    const nameRef = useRef(null)
    const textRef = useRef(null)
    const statusRef = useRef(null)

    const createTask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    text: textRef.current.value,
                    status: statusRef.current.value
                })
            });
            const newTask = await response.json();
            setTasks(prev => [...prev, newTask]);
            setShowForm(false);
        } catch (error) {
            console.log('Error al crear la tarea: ', error)
        }
    }
    
    return (
  <div className="form-overlay">
    <form className='task-form' onSubmit={createTask}>
      <h2 className="form-title">Nueva tarea</h2>

      <div className='task-input'>
        <label htmlFor="name">Nombre</label>
        <input ref={nameRef} type="text" id='name' placeholder='Nombre...' />
      </div>

      <div className='task-input'>
        <label htmlFor="text">Descripción</label>
        <textarea ref={textRef} id="text" placeholder='Descripción...'></textarea>
      </div>

      <div className='task-input'>
        <label htmlFor="status">Estado</label>
        <select defaultValue="Pendiente" ref={statusRef} id="status" className='status-task'>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className='create-task'>Crear tarea</button>
        <button type="button" className="cancel-form" onClick={() => setShowForm(false)}>Cancelar</button>
      </div>
    </form>
  </div>
)
}