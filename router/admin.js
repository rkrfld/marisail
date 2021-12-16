const express = require('express')
// const Controller = require('../controllers/controller.js')
const adminRouter = express.Router()

adminRouter.get(`/admin`, (req, res) => res.send(`admin`))



module.exports = adminRouter