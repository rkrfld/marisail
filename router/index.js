const express = require('express')
// const Controller = require('../controllers/controller.js')
const router = express.Router()
const adminRouter = require('./admin.js')
const userRouter = require('./user.js')
const ControllerMain = require(`../controllers/controllerMain`)


router.get(`/`, ControllerMain.landing)
router.post(`/loginAdmin`, ControllerMain.loginAdmin)
router.post(`/loginUser`, ControllerMain.loginUser)
router.use(`/`, adminRouter)
router.use(`/`, userRouter)


module.exports = router