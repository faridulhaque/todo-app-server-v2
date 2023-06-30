
const express = require('express');
const { addTask, getAllTask, getTodayTasks, getArchiveTasks, changeStatus, deleteTask } = require('../controllers/task.controller');
const { commonError } = require('../middleWares/commonError');

const router = express.Router()

router.post('/add', addTask, commonError)
router.get('/all/:email', getAllTask, commonError)
router.get('/today/:email', getTodayTasks, commonError)
router.get('/archive/:email', getArchiveTasks, commonError)
router.put('/status/:id', changeStatus, commonError)
router.delete('/del/:id', deleteTask, commonError)

module.exports = router;