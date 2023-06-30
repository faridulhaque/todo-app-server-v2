
const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const {commonError } = require("../middleWares/commonError")

const router = express.Router()

router.post("/register", register, commonError)
router.post("/login", login, commonError)

module.exports = router;


