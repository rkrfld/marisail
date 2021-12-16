const express = require('express')
const ControllerAdmin = require('../controllers/controllerAdmin.js')
const adminRouter = express.Router()

adminRouter.get(`/admin`, ControllerAdmin.list)
adminRouter.get(`/admin/addPlan`, ControllerAdmin.addPlan)
adminRouter.post(`/admin/addPlan`, ControllerAdmin.postAddPlan)
adminRouter.get(`/admin/:id/delete`, ControllerAdmin.delete)
adminRouter.get(`/admin/:id/edit`, ControllerAdmin.edit)
adminRouter.post(`/admin/:id/edit`, ControllerAdmin.postEdit)
adminRouter.get('/admin/logout', ControllerAdmin.logout)



module.exports = adminRouter