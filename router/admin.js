const express = require('express')
const ControllerAdmin = require('../controllers/controllerAdmin.js')
const adminRouter = express.Router()

adminRouter.get(`/admin`, (req, res) => res.send(`admin`))
adminRouter.get(`/admin/addPlan`, ControllerAdmin.addPlan)
adminRouter.post(`/admin/addPlan`, ControllerAdmin.postAddPlan)



module.exports = adminRouter