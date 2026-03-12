const {postTask, getTasks,  updateTask, deleteTask} = require('../controllers/controllers');
const express = require('express');
const router = express.Router();

router.post('/', postTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;