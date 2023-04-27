const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true})

const listSchema = new Schema({
    title: {type: String, required: true},
    tasks: [taskSchema]
}, {timestamps: true})

module.exports = mongoose.model('List', listSchema)