const TaskModel = require("../models/task.model");
const moment = require('moment');



const addTask = async (req, res, next) => {
    try {
        const newTask = new TaskModel(req.body)
        const data = await newTask.save();
        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}


const getAllTask = async (req, res, next) => {
    try {
        const email = req.params.email;
        const tasks = await TaskModel.find({ email })
            .sort({ date: 1, time: 1 })
            .exec();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
}


const getTodayTasks = async (req, res, next) => {
    try {
        const email = req.params.email;

        const today = moment().format('YYYY-MM-DD');
        const tasks = await TaskModel.find({ email, complete: false});
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

const getArchiveTasks = async (req, res, next) => {
    try {
        const email = req.params.email;
        if (email) {
            const tasks = await TaskModel.find({ email, complete: true }).sort({ date: -1, time: -1 });
            res.status(200).json(tasks);
        }
    } catch (error) {
        next(error);
    }
};

const changeStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await TaskModel.findByIdAndUpdate(id, { complete: req.body.complete });
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};


const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await TaskModel.findByIdAndDelete(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};





module.exports = { addTask, getAllTask, getTodayTasks, getArchiveTasks, changeStatus, deleteTask }