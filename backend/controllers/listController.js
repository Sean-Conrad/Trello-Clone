const List = require('../models/listModel')
const mongoose = require('mongoose')

//get all lists
const getLists = async(req,res) => {
    const lists = await List.find({}).sort({createdAt: -1})

    res.status(200).json(lists)
}

//create a list
const createList = async(req, res) => {
    const {title} = req.body

    try {
        const list = await List.create({title})
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a list
const deleteList = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:
             'No such list exists'})
    }

    const list = await List.findOneAndDelete({_id: id})

    if(!list) {
        return res.status(404).json({error: 'No such list exists'})
    }

    res.status(200).json(list)
}

const addTask = async(req, res) => {
    const {id} = req.params
    const {taskName} = req.body
    
    console.log(id)
    console.log(taskName)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list exists'})
    }

    const task = await List.updateOne(
        {_id: id}, {$push: {tasks: { name: taskName }}}, {new: true})

    res.status(200).json(task)
}

//delete a task
const deleteTask = async(req, res) => {
    const {id} = req.params
    const {taskId} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list exists'})
    }

    const task = await List.updateOne(
        {_id: id}, {$pull: {tasks: { _id: taskId}}}, {new: true})

    if(!task) {
        return res.status(404).json({error: 'No such task exists'})
    }

    res.status(200).json(task)
}

//update a list

const updateList = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such list exists'})
    }

    const list = await List.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!list) {
        return res.status(404).json({error: 'No such list exists'})
    }
    
    res.status(200).json(list)
}



module.exports = {
    getLists,
    createList,
    addTask,
    deleteList,
    deleteTask,
    updateList,
}