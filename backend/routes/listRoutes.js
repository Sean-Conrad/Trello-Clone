const express = require('express')
const { getLists, createList, deleteList, deleteTask, updateList, addTask} = require('../controllers/listController')


const router = express.Router()

router.get('/', getLists)

router.post('/', createList)

router.post('/:id/task', addTask)

router.delete('/:id', deleteList)

router.delete('/:id/task', deleteTask)

router.patch('/:id', updateList)

module.exports = router