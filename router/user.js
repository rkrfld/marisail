const express = require('express')
// const Controller = require('../controllers/controller.js')
const userRouter = express.Router()

userRouter.get(`/user`, (req, res) => res.send(`user`))




module.exports = userRouter