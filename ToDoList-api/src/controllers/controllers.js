// CRUD
const Task = require('../models/task');

// Crear una nueva tarea
const postTask = async (req, res) => {
    try {
        const { name, text, status } = req.body;
        if (!name || !text || !status) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const newTask = new Task({ name, text, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
    }
};

// Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error: error.message });
    }
};

// Actualizar una tarea por ID
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, text, status } = req.body;
        if (!name || !text || !status) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const updatedTask = await Task.findByIdAndUpdate(id, { name, text, status }, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
    }
};

// Eliminar una tarea por ID
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
    }
};

module.exports = {
    postTask,
    getTasks,
    updateTask,
    deleteTask
};