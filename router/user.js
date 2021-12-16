const express = require('express')
const ControllerUser = require('../controllers/controllerUser')
const userRouter = express.Router()

userRouter.get('/register', ControllerUser.register)

userRouter.post('/register', ControllerUser.registerpost)

userRouter.get(`/user/login`, ControllerUser.login)

userRouter.post(`/user/login`, ControllerUser.loginPost)

userRouter.get('/user/logout', ControllerUser.logout)


// ===============middleware================
userRouter.use(function (req, res, next) {

  if(!req.session.userId) {
    res.redirect('/user/login')
  } else {
    next()
  }
  // console.log('Time:', Date.now())
  // next()
})
// ===============middleware================

userRouter.get(`/user`, ControllerUser.list)






module.exports = userRouter