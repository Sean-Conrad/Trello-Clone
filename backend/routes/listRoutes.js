const express = require('express')
const { getLists, createList, deleteList, updateList} = require('../controllers/listController')


const router = express.Router()

router.get('/', getLists)

router.post('/', createList)

router.delete('/:id', deleteList)

router.patch('/:id', updateList)

module.exports = router