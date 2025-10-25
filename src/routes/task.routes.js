const express = require("express");
const {
  addTask,
  getTodayTasks,
  getArchiveTasks,
  changeStatus,
  deleteTask,
  getUpcomingTasks,
} = require("../controllers/task.controller");
const { commonError } = require("../middleWares/commonError");

const router = express.Router();

router.post("/add", addTask, commonError);
router.get("/upcoming/:email", getUpcomingTasks, commonError);
router.get("/today/:email", getTodayTasks, commonError);
router.get("/previous/:email", getArchiveTasks, commonError);
router.put("/status/:id", changeStatus, commonError);
router.delete("/del/:id", deleteTask, commonError);

module.exports = router;
