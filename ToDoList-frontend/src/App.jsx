import './App.css';
import { useState, useEffect } from 'react';
import Task from './components/Taks/Taks';
import TaskForm from './components/TaksForm/TaksForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/tasks`);
        const res = await response.json();
        setTasks(res);
        setLoading(false);
      } catch (error) {
        console.log('Error al obtener las tareas:', error)
      }
    }
    
      fetchTasks()
  }, [])

  return (
  <>
    <div className="app-header">
      <div>
        <h1 className="app-title">Task<span>Board</span></h1>
        <p className="app-subtitle">{tasks.length} tarea{tasks.length !== 1 ? 's' : ''}</p>
      </div>
      <button onClick={() => setShowForm(prev => !prev)} className='create-button'>
        {showForm ? '✕ Cerrar' : '+ Nueva tarea'}
      </button>
    </div>

    {loading ? <p className="loading">Cargando...</p> :
      tasks.length === 0 ? <p className="tasks-empty">No tienes tareas aún</p> :
      <div className="tasks-grid">
        {tasks.map((task, i) => <Task key={i} task={task} setTasks={setTasks} />)}
      </div>
    }

    {showForm && <TaskForm setTasks={setTasks} setShowForm={setShowForm} />}
  </>
)
}

export default App


